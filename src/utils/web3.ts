/**
 * Web3 utility functions
 * Various Web3 helper functions
 *
 * If function is not exported, then it is a private utility function
 *
 * @author andy
 *
 */

import Web3 from 'web3'; // We're only importing the types
import once from 'lodash.once';
import Big from 'big.js'; // Deprecate in later PR
import moment from 'moment';
import { Booking, Currency, CryptoParams } from 'networking/bookings';
import { APP_ENV, SETTINGS, AppEnv } from 'configs/settings';
import { BEE_TOKEN_ABI } from 'ABIs/beeToken';
import { BEE_PAYMENT_ABI } from 'ABIs/beePayment';
import { ETH_PAYMENT_ABI } from 'ABIs/ethPayment';
import UNIPAY_ABI from 'ABIs/unipay.json';

const {
  BEETOKEN_ADDRESS,
  BEETOKEN_PAYMENT_ADDRESS,
  ETH_PAYMENT_ADDRESS,
  TOKEN_ADDRESSES,
  UNIPAY_ADDRESS
} = SETTINGS;
const { utils } = Web3;

const SEVEN_DAYS_IN_SEC = 7 * 24 * 60 * 60;
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

export const loadWeb3: () => Web3 = once(() => new Web3(window.ethereum || Web3.givenProvider));

export async function getUsersWeb3Data(ethProvider: Web3['eth']): Promise<Web3Data> {
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

async function getAccounts(ethProvider: Web3['eth']): Promise<string[] | undefined> {
  if (window.ethereum) {
    await window.ethereum.enable();
  }
  return ethProvider.getAccounts();
}

async function getBeeBalance(ethProvider: Web3['eth'], walletAddress: string): Promise<number> {
  const contract = new ethProvider.Contract(BEE_TOKEN_ABI, BEETOKEN_ADDRESS);
  const beeBalance: string = await contract.methods.balanceOf(walletAddress).call();
  // fromWei conversion defaults to Ether which is 10^18
  // BEE/Wei conversion is similar to ETH/Wei, both using 18 decimals
  return parseFloat(utils.fromWei(beeBalance));
}

async function getEthBalance(ethProvider: Web3['eth'], walletAddress: string): Promise<number> {
  const ethBalance: Web3['utils']['BN'] = await ethProvider.getBalance(walletAddress);
  // fromWei conversion defaults to Ether which is 10^18
  return parseFloat(utils.fromWei(ethBalance.toString()));
}

async function getAccountBalance(ethProvider: Web3['eth'], walletAddress: string): Promise<Account> {
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

export async function payWithBee(ethProvider: Web3['eth'], paymentOptions: PaymentOptions): Promise<CryptoParams> {
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

export async function payWithEth(
  ethProvider: Web3['eth'],
  paymentOptions: PaymentOptions,
  booking: Booking
): Promise<CryptoParams> {
  const {
    amount,
    guestWalletAddress,
    hostWalletAddress,
    priceTotalNights,
    securityDeposit,
    transactionFee,
  } = paymentOptions;
  const { checkInDate, checkOutDate, id } = booking;

  // Note on date conversions here:
  // - checkInDate/checkOutDate are ISO date-strings
  // - JS Dates are in milliseconds since 1970
  // - EVM timestamps are in seconds since 1970
  const cancelDeadline = Math.max(
    Math.floor(new Date(checkInDate).valueOf() / 1000) - SEVEN_DAYS_IN_SEC,
    Date.now() / 1000 + THIRTY_SIX_HOURS_IN_SEC
  );
  const dispatchDeadline = Math.floor(new Date(checkOutDate).valueOf() / 1000);
  const amountWei = UNITS.WEI_PER_ETH.times(amount).toFixed(0);
  const costWei = UNITS.WEI_PER_ETH.times(priceTotalNights).toFixed(0);
  const cancelFeeWei = UNITS.WEI_PER_ETH.times(priceTotalNights * 0.1).toFixed(0);
  const depositWei = UNITS.WEI_PER_ETH.times(securityDeposit).toFixed(0);
  const transactionFeeWei = UNITS.WEI_PER_ETH.times(transactionFee).toFixed(0);
  const paymentId = `0x${id.padStart(64, '0')}`;

  try {
    const { methods } = new ethProvider.Contract(ETH_PAYMENT_ABI, ETH_PAYMENT_ADDRESS);
    const { transactionHash } = await methods
      .initAndPayEthPayment(
        paymentId, // bytes32 paymentId,
        guestWalletAddress, // address demandEntityAddress,
        hostWalletAddress, // address supplyEntityAddress,
        costWei, // uint256 cost,
        depositWei, // uint256 securityDeposit,
        cancelFeeWei, // uint256 demandCancellationFee,
        0, // uint256 supplyCancellationFee,
        cancelDeadline, // uint64 cancelDeadlineInS,
        dispatchDeadline, // uint64 paymentDispatchTimeInS,
        transactionFeeWei // uint256 transactionFee
      )
      .send({ from: guestWalletAddress, value: amountWei });
    return {
      guestWalletAddress,
      transactionHash,
      paymentProtocolAddress: ETH_PAYMENT_ADDRESS,
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function priceWithToken(
  ethProvider: Web3['eth'],
  currency: Currency,
  beePrice: number
): Promise<number> {
  const tokenAddress = TOKEN_ADDRESSES[currency];
  if (!tokenAddress) {
    throw new Error(`Unknown ERC-20 token ${currency}.`);
  }
  const beeDust = UNITS.AMOUNT_PER_BEE.times(beePrice).toFixed(0);
  try {
    const { methods } = new ethProvider.Contract(UNIPAY_ABI, UNIPAY_ADDRESS);
    const [ tokenDust ] = await methods.price(tokenAddress, beeDust).call();
    console.log(tokenDust);
    return 0;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function invoice(
  ethProvider: Web3['eth'],
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
  ethProvider: Web3['eth'],
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
  ethProvider: Web3['eth'],
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
  ethProvider: Web3['eth'],
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
