import Web3 from 'web3';

import { Web3Data, UNITS } from 'utils/web3';
import { BEE_TOKEN_ABI } from 'ABIs/beeToken';
import { BuyNowInput, Currency } from 'networking/bookings';
import { PaymentInfo } from 'networking/listings';
import { SETTINGS } from 'configs/settings';

const { BEETOKEN_ADDRESS } = SETTINGS;

interface PaymentSource {
  stripeLast4: string;
  id: string;
}

export interface PaymentOption {
  key: string;
  label: string;
  amount: number;
  currency: string;
  placeholder?: boolean;
  paymentSourceId?: string;
  guestWalletAddress?: string;
}

export class BuyNowProcessor {
  paymentInfo: PaymentInfo;
  web3: Web3;

  constructor(paymentInfo: PaymentInfo, web3: Web3) {
    this.paymentInfo = paymentInfo;
    this.web3 = web3;
  }

  options(paymentSources: PaymentSource[], web3Data: Web3Data): PaymentOption[] {
    const { prices } = this.paymentInfo;
    const accounts = (web3Data && web3Data.accounts) || [];
    const networkType = (web3Data && web3Data.networkType) || 'None';

    const usdPrice = prices.find(({ currency }) => currency === Currency.USD);
    const beePrice = prices.find(({ currency }) => currency === Currency.BEE);
    const ethPrice = prices.find(({ currency }) => currency === Currency.ETH);

    const usdOptions: PaymentOption[] = !usdPrice
      ? []
      : paymentSources.map(({ stripeLast4, id }) => ({
          key: `USD-${id}`,
          label: `Credit Card XXXX-XXXX-XXXX-${stripeLast4}`,
          amount: usdPrice.amount,
          currency: usdPrice.currency,
          paymentSourceId: id,
        }));

    const beeOptions: PaymentOption[] = !beePrice
      ? []
      : accounts.filter(({ availableBee }) => availableBee > beePrice.amount).map(({ walletAddress }) => ({
          key: `BEE-${walletAddress}`,
          label: `BEE (${walletAddress}) ${networkType}`,
          amount: beePrice.amount,
          currency: beePrice.currency,
          guestWalletAddress: walletAddress,
        }));

    const ethOptions: PaymentOption[] = !ethPrice
      ? []
      : accounts.filter(({ availableEth }) => availableEth > ethPrice.amount).map(({ walletAddress }) => ({
          key: `ETH-${walletAddress}`,
          label: `ETH (${walletAddress}) ${networkType}`,
          amount: ethPrice.amount,
          currency: ethPrice.currency,
          guestWalletAddress: walletAddress,
        }));

    if (usdPrice && usdOptions.length === 0) {
      usdOptions.push({
          key: 'USD',
          label: 'USD Credit Card',
          amount: usdPrice.amount,
          currency: usdPrice.currency,
          placeholder: true
      });
    }

    if (beePrice && beeOptions.length === 0) {
      beeOptions.push({
          key: 'BEE',
          label: `BEE ${networkType}`,
          amount: beePrice.amount,
          currency: beePrice.currency,
          placeholder: true
      });
    }

    if (ethPrice && ethOptions.length === 0) {
      ethOptions.push({
          key: 'ETH',
          label: `ETH ${networkType}`,
          amount: ethPrice.amount,
          currency: ethPrice.currency,
          placeholder: true
      });
    }

    return usdOptions.concat(beeOptions).concat(ethOptions);
  }

  async process(option: PaymentOption): Promise<BuyNowInput> {
    if (option.placeholder) {
      // We expect the form to prevent selection of placeholders
      throw new Error('Cannot process payment with this option.');
    }

    const receipt = await this.processPayment(option);
    const { currency, amount } = option;
    const listingId = this.paymentInfo.listing.id;
    const input: BuyNowInput = {
      listingId,
      currency,
      amount,
      ...receipt,
    };
    return input;
  }

  async processPayment(option: PaymentOption) {
    switch (option.currency) {
      case Currency.BEE:
        return this.processBeePayment(option);
      case Currency.USD:
        return this.processUsdPayment(option);
      case Currency.ETH:
        return this.processEthPayment(option);
      default:
        throw new Error('Unknown currency.');
    }
  }

  async processBeePayment(option: PaymentOption) {
    const { guestWalletAddress, amount } = option;
    const { hostWalletAddress } = this.paymentInfo;

    // This is never expected when options are well-formed
    if (!guestWalletAddress) {
      throw new Error('Cannot process BEE payment without a wallet address.');
    }

    const contract = new this.web3.eth.Contract(BEE_TOKEN_ABI, BEETOKEN_ADDRESS);
    const { transactionHash } = await contract.methods
      .transfer(hostWalletAddress, UNITS.AMOUNT_PER_BEE.times(amount).toFixed(0))
      .send({ from: guestWalletAddress });

    return {
      cryptoPayment: { guestWalletAddress, hostWalletAddress, transactionHash },
    };
  }

  async processEthPayment(option: PaymentOption) {
    const { guestWalletAddress, amount } = option;
    const { hostWalletAddress } = this.paymentInfo;

    // This is never expected when options are well-formed
    if (!guestWalletAddress) {
      throw new Error('Cannot process ETH payment without a wallet address.');
    }

    const { transactionHash } = await this.web3.eth.sendTransaction({
      from: guestWalletAddress,
      to: hostWalletAddress,
      value: UNITS.WEI_PER_ETH.times(amount).toFixed(0),
    });

    return {
      cryptoPayment: { guestWalletAddress, hostWalletAddress, transactionHash },
    };
  }

  processUsdPayment(option: PaymentOption) {
    // This will be processed on the back-end
    const { paymentSourceId } = option;
    return { paymentSourceId };
  }
}
