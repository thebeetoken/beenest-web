/**
 * Web3 utility functions
 * Various Web3 helper functions
 *
 * If function is not exported, then it is a private utility function
 *
 * @author andy
 *
 */

import once from 'lodash.once';
import Big from 'big.js'; // Deprecate in later PR
import moment from 'moment';
import { Booking, Currency, CryptoParams } from 'networking/bookings';
import { APP_ENV, SETTINGS, AppEnv } from 'configs/settings';
import { BEE_TOKEN_ABI } from 'ABIs/beeToken';
import { BEE_PAYMENT_ABI } from 'ABIs/beePayment';
import UNIPAY_ABI from 'ABIs/unipay.json';

const {
  BEETOKEN_ADDRESS,
  BEETOKEN_PAYMENT_ADDRESS,
  ERC20_ADDRESSES,
  UNIPAY_ADDRESS
} = SETTINGS;

const THIRTY_SIX_HOURS_IN_SEC = 36 * 60 * 60;

export const UNITS = {
  WEI_PER_ETH: Big(Math.pow(10, 18)),
  AMOUNT_PER_BEE: Big(Math.pow(10, 18)),
};

export interface Web3Data {
  networkType: NetworkType;
  accounts: Account[] | undefined; // undefined (does not have metamask), empty array (has metamask, not logged in);
  connecting: boolean;
  [key: string]: NetworkType | Account[] | boolean | undefined;
}

export enum NetworkType {
  MAIN = 'MAIN',
  ROPSTEN = 'ROPSTEN',
  RINKEBY = 'RINKEBY',
  KOVAN = 'KOVAN',
  UNKNOWN = 'UNKNOWN_NETWORK',
  NOTCONNECTED = 'NOT_CONNECTED',
}

interface Account {
  walletAddress: string;
  availableEth: number;
  availableBee: number;
  [key: string]: string | number;
}

export interface PaymentOptions {
  amount: number;
  guestWalletAddress: string;
  hostWalletAddress: string | null;
  priceTotalNights: number;
  securityDeposit: number;
  transactionFee: number;
}

export const loadWeb3: () => import('web3') = once(() => {
  const W3 = require('web3');
  return new W3(window.ethereum || W3.givenProvider);
});

export const loadUtils = () => loadWeb3().utils;

export async function getUsersWeb3Data(ethProvider: import('web3')['eth']): Promise<Web3Data> {
  const [accounts, networkId] = await Promise.all([getAccounts(ethProvider), ethProvider.net.getId()]);
  const networkType = getNetworkType(networkId);
  if (!accounts) {
    return {
      connecting: false,
      accounts,
      networkType,
    };
  }
  if (!isNetworkValid(networkType)) {
    return {
      connecting: false,
      accounts: [],
      networkType
    };
  }
  const accountBalances: Account[] = await Promise.all(
    accounts.map((walletAddress: string): Promise<Account> => getAccountBalance(ethProvider, walletAddress))
  );
  return {
    connecting: false,
    accounts: accountBalances,
    networkType,
  };
}

export function isNetworkValid(networkType: NetworkType): boolean {
  switch (networkType) {
    case NetworkType.MAIN:
      return APP_ENV === AppEnv.PRODUCTION || APP_ENV === AppEnv.STAGING;
    case NetworkType.ROPSTEN:
      return APP_ENV === AppEnv.DEVELOPMENT || APP_ENV === AppEnv.TESTNET;
    default:
      return false;
  }
}

export function getValidNetworkName(): string {
  return APP_ENV === AppEnv.PRODUCTION || APP_ENV === AppEnv.STAGING ? 'Main' : 'Ropsten';
}

async function getAccounts(ethProvider: import('web3')['eth']): Promise<string[] | undefined> {
  if (window.ethereum) {
    await window.ethereum.enable();
  }
  return ethProvider.getAccounts();
}

async function getBeeBalance(ethProvider: import('web3')['eth'], walletAddress: string): Promise<number> {
  const contract = new ethProvider.Contract(BEE_TOKEN_ABI, BEETOKEN_ADDRESS);
  const beeBalance: string = await contract.methods.balanceOf(walletAddress).call();
  // fromWei conversion defaults to Ether which is 10^18
  // BEE/Wei conversion is similar to ETH/Wei, both using 18 decimals
  return parseFloat(loadUtils().fromWei(beeBalance));
}

async function getEthBalance(ethProvider: import('web3')['eth'], walletAddress: string): Promise<number> {
  const ethBalance: import('web3')['utils']['BN'] = await ethProvider.getBalance(walletAddress);
  // fromWei conversion defaults to Ether which is 10^18
  return parseFloat(loadUtils().fromWei(ethBalance.toString()));
}

async function getAccountBalance(ethProvider: import('web3')['eth'], walletAddress: string): Promise<Account> {
  const [availableBee, availableEth] = await Promise.all([
    getBeeBalance(ethProvider, walletAddress),
    getEthBalance(ethProvider, walletAddress),
  ]);
  return {
    availableBee,
    availableEth,
    walletAddress,
  };
}

export async function payWithBee(ethProvider: import('web3')['eth'], paymentOptions: PaymentOptions): Promise<CryptoParams> {
  const { amount, guestWalletAddress } = paymentOptions;
  try {
    const { methods } = new ethProvider.Contract(BEE_TOKEN_ABI, BEETOKEN_ADDRESS);

    const totalAmountToApprove = UNITS.AMOUNT_PER_BEE.times(amount).toFixed(0);
    const transactionHash: string = await new Promise<string>(
      (resolve, reject) => methods
        .approve(BEETOKEN_PAYMENT_ADDRESS, totalAmountToApprove)
        .send({ from: guestWalletAddress })
        .once('transactionHash', resolve)
        .on('error', reject)
    );

    return {
      guestWalletAddress,
      transactionHash,
      paymentProtocolAddress: BEETOKEN_PAYMENT_ADDRESS,
      tokenContractAddress: BEETOKEN_ADDRESS,
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function payWithEther(
  ethProvider: import('web3')['eth'],
  paymentOptions: PaymentOptions,
  ethPrice: number
): Promise<CryptoParams> {
  const { amount, guestWalletAddress } = paymentOptions;
  const beeDust = UNITS.AMOUNT_PER_BEE.times(amount).toFixed(0);
  const wei = UNITS.WEI_PER_ETH.times(ethPrice).toFixed(0);
  try {
    const unipay = new ethProvider.Contract(UNIPAY_ABI, UNIPAY_ADDRESS);
    const deadline = (Date.now() / 1000 + 5 * 60).toFixed(0); // Five minutes from now.
    const transactionHash: string = await new Promise<string>(
      (resolve, reject) => unipay.methods.pay(beeDust, deadline)
        .send({ from: guestWalletAddress, value: wei })
        .once('transactionHash', resolve)
        .on('error', reject)
    );
    return {
      guestWalletAddress: UNIPAY_ADDRESS, // This will be the address to invoice
      transactionHash,
      paymentProtocolAddress: BEETOKEN_PAYMENT_ADDRESS,
      tokenContractAddress: BEETOKEN_ADDRESS,
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function payWithToken(
  ethProvider: import('web3')['eth'],
  paymentOptions: PaymentOptions,
  currency: Currency | string,
  fromBee: (value: number) => number
): Promise<any> {
  const { amount, guestWalletAddress } = paymentOptions;
  const tokenAddress = ERC20_ADDRESSES[currency];
  if (!tokenAddress) {
    throw new Error(`Unknown ERC-20 token ${currency}.`);
  }
  const ercDust = UNITS.AMOUNT_PER_BEE.times(fromBee(amount)).toFixed(0);
  const beeDust = UNITS.AMOUNT_PER_BEE.times(amount).toFixed(0);
  try {
    const token = new ethProvider.Contract(BEE_TOKEN_ABI, tokenAddress);
    await token.methods.approve(UNIPAY_ADDRESS, ercDust)
      .send({ from: guestWalletAddress });
    const unipay = new ethProvider.Contract(UNIPAY_ABI, UNIPAY_ADDRESS);
    const deadline = (Date.now() / 1000 + 5 * 60).toFixed(0); // Five minutes from now.
    const transactionHash: string = await new Promise<string>(
      (resolve, reject) => unipay.methods.collect(
          guestWalletAddress,
          tokenAddress,
          beeDust,
          deadline
        ).send({ from: guestWalletAddress })
        .once('transactionHash', resolve)
        .on('error', reject)
    );
    return {
      guestWalletAddress: UNIPAY_ADDRESS, // This will be the address to invoice
      transactionHash,
      paymentProtocolAddress: BEETOKEN_PAYMENT_ADDRESS,
      tokenContractAddress: tokenAddress,
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function priceWithEther(
  ethProvider: import('web3')['eth'],
  beePrice: number
): Promise<number> {
  const beeDust = UNITS.AMOUNT_PER_BEE.times(beePrice).toFixed(0);
  try {
    const { methods } = new ethProvider.Contract(UNIPAY_ABI, UNIPAY_ADDRESS);
    const [ wei ] = await methods.price(beeDust).call();
    const ethPrice = Big(wei).div(UNITS.WEI_PER_ETH);
    return parseFloat(ethPrice.valueOf());
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function priceWithToken(
  ethProvider: import('web3')['eth'],
  currency: Currency | string,
  beePrice: number
): Promise<number> {
  const tokenAddress = ERC20_ADDRESSES[currency];
  if (!tokenAddress) {
    throw new Error(`Unknown ERC-20 token ${currency}.`);
  }
  const beeDust = UNITS.AMOUNT_PER_BEE.times(beePrice).toFixed(0);
  try {
    const { methods } = new ethProvider.Contract(UNIPAY_ABI, UNIPAY_ADDRESS);
    const [ tokenDust ] = await methods.price(tokenAddress, beeDust).call();
    const tokenPrice = Big(tokenDust).div(UNITS.WEI_PER_ETH); // TODO: Not all tokens have 18 digits...
    return parseFloat(tokenPrice.valueOf());
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function balanceOf(
  ethProvider: import('web3')['eth'],
  currency: Currency,
  address: string
): Promise<number> {
  const tokenAddress = ERC20_ADDRESSES[currency];
  if (!tokenAddress) {
    throw new Error(`Unknown ERC-20 token ${currency}.`);
  }
  try {
    const { methods } = new ethProvider.Contract(BEE_TOKEN_ABI, tokenAddress);
    const tokenDust = await methods.balanceOf(address).call();
    const balance = Big(tokenDust).div(UNITS.WEI_PER_ETH); // TODO: Not all tokens have 18 digits...
    return parseFloat(balance.valueOf());
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function invoice(
  ethProvider: import('web3')['eth'],
  booking: Booking
): Promise<CryptoParams> {
  const {
    checkInDate,
    checkOutDate,
    guestDepositAmount,
    guestTotalAmount,
    guestWalletAddress,
    hostWalletAddress,
    id
  } = booking;

  if (!guestWalletAddress) {
    throw new Error(`No guest wallet address to invoice for booking ${id}`);
  }

  if (!hostWalletAddress) {
    throw new Error(`No host wallet address to invoice for booking ${id}`);
  }

  const accounts = await getAccounts(ethProvider);

  if (!accounts || !accounts.length) {
    throw new Error(`Must log in to MetaMask to invoice`);
  }

  const price = guestTotalAmount - guestDepositAmount;

  const paymentId = `0x${id.padStart(64, '0')}`;
  const cancelDeadline = Math.floor(moment.utc(checkInDate).valueOf() / 1000);
  const disputeDeadline = Math.floor(moment.utc(checkOutDate).valueOf() / 1000) +
    THIRTY_SIX_HOURS_IN_SEC;
  const costDust = UNITS.AMOUNT_PER_BEE.times(price).toFixed(0);
  const depositDust = UNITS.AMOUNT_PER_BEE.times(guestDepositAmount).toFixed(0);
  const cancelFeeDust = UNITS.AMOUNT_PER_BEE.times(price * 0.1).toFixed(0);

  try {
    const { methods } = new ethProvider.Contract(BEE_PAYMENT_ABI, BEETOKEN_PAYMENT_ADDRESS);
    const { transactionHash } = await methods
      .invoice(
        paymentId,          // bytes32 paymentId,
        hostWalletAddress,  // address supplier,
        guestWalletAddress, // address buyer,
        costDust,           // uint256 price,
        depositDust,        // uint256 deposit,
        cancelFeeDust,      // uint256 cancellationFee,
        cancelDeadline,     // uint64  cancelDeadline,
        disputeDeadline     // uint64  disputeDeadline
      )
      .send({ from: accounts[0] });
    return {
      guestWalletAddress,
      transactionHash,
      paymentProtocolAddress: BEETOKEN_PAYMENT_ADDRESS
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function cancel(
  ethProvider: import('web3')['eth'],
  id: string
): Promise<CryptoParams> {
  const accounts = await getAccounts(ethProvider);

  if (!accounts || !accounts.length) {
    throw new Error(`Must log in to MetaMask to invoice`);
  }

  const paymentId = `0x${id.padStart(64, '0')}`;

  try {
    const { methods } = new ethProvider.Contract(
      BEE_PAYMENT_ABI,
      BEETOKEN_PAYMENT_ADDRESS
    );
    const { transactionHash } = await methods
      .cancel(paymentId)
      .send({ from: accounts[0] });
    return {
      guestWalletAddress: accounts[0],
      transactionHash,
      paymentProtocolAddress: BEETOKEN_PAYMENT_ADDRESS
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function payout(
  ethProvider: import('web3')['eth'],
  id: string
): Promise<string> {
  const accounts = await getAccounts(ethProvider);

  if (!accounts || !accounts.length) {
    throw new Error(`Must log in to MetaMask to invoice`);
  }

  const paymentId = `0x${id.padStart(64, '0')}`;

  try {
    const { methods } = new ethProvider.Contract(
      BEE_PAYMENT_ABI,
      BEETOKEN_PAYMENT_ADDRESS
    );
    const { transactionHash } = await methods
      .payout(paymentId)
      .send({ from: accounts[0] });
    return transactionHash;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function refund(
  ethProvider: import('web3')['eth'],
  id: string
): Promise<string> {
  const accounts = await getAccounts(ethProvider);

  if (!accounts || !accounts.length) {
    throw new Error(`Must log in to MetaMask to invoice`);
  }

  const paymentId = `0x${id.padStart(64, '0')}`;

  try {
    const { methods } = new ethProvider.Contract(
      BEE_PAYMENT_ABI,
      BEETOKEN_PAYMENT_ADDRESS
    );
    const { transactionHash } = await methods
      .refund(paymentId)
      .send({ from: accounts[0] });
    return transactionHash;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

function getNetworkType(networkType: number = 0): NetworkType {
  switch (networkType) {
    case 0:
      return NetworkType.NOTCONNECTED;
    case 1:
      return NetworkType.MAIN;
    case 3:
      return NetworkType.ROPSTEN;
    case 4:
      return NetworkType.RINKEBY;
    case 42:
      return NetworkType.KOVAN;
    default:
      return NetworkType.UNKNOWN;
  }
}
