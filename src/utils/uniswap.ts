import Web3 from 'web3'; // We're only importing the types
import UNISWAP_FACTORY_ABI from 'ABIs/uniswapFactory.json';
import UNISWAP_EXCHANGE_ABI from 'ABIs/uniswapExchange.json';

export default class Uniswap {
  constructor(eth: Web3.eth, factoryAddress: string) {
    this.eth = eth;
    this.factory = new eth.Contract(UNISWAP_FACTORY_ABI, factoryAddress);
  }

  price(inputTokenAddress: string, outputTokenAddress: string, outputAmount: string) {
  }

  async getExchange(tokenAddress: string) {
    const exchangeAddress = await this.factory.getExchange(tokenAddress);
    return (parseInt(exchangeAddress) === 0) ? undefined :
      new this.eth.Contract(UNISWAP_EXCHANGE_ABI, exchangeAddress);
  }
}

