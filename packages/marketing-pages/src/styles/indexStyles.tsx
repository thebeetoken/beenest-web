import styled from 'styled-components';
import { injectGlobal } from 'styled-components';
import heroImage from '../assets/images/hero-image.jpg';
import jumpImage from '../assets/images/female-photographer.png';

const beenestYellow = '#ffc107';
const black = '#263238';
const blackTransparent = 'rgba(0, 0, 0, 0.1)';
const gray = '#494c4d';
export const testimonialBlue = '#00969e';

const responsiveWidth = '768px';
export const mediaQuery = `@media (max-width: ${responsiveWidth})`;

injectGlobal`
  * {
    @import url('https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700');
    color: ${black};
    font-family: Poppins, Helvetica, Arial, sans-serif;
  }  
  
  body {
    margin: 0;
  }
`;

export const Container = styled.div`
  position: relative;
  max-width: 1440px;
  margin: 0 auto;
`;

export const HeroImage = styled.div`
  position: absolute;
  top: 0;
  background-image: url(${heroImage});
  background-repeat: no-repeat;
  background-position-x: center;
  width: 100%;
  height: 100%;
  z-index: -1;

  ${mediaQuery} {
    background-image: none;
  }
`;

export const JumpImage = HeroImage.extend`
  background-image: url(${jumpImage});
  z-index: 100;
  height: 680px;
`;

export const InnerContainer = styled.div`
  width: 1140px;
  margin: 0 auto;

  ${mediaQuery} {
    width: 100%;
    max-width: none;
  }
`;

export const ShadowContainer = styled.div`
  box-shadow: 0 -18px 20px 0 rgba(0, 0, 0, 0.2);
  padding-bottom: 50px;

  ${mediaQuery} {
    box-shadow: none;
    padding: 0 10px;
`;

export const CopyText = styled.p`
  color: inherit;
  opacity: 0.9;
`;

export const HeadingTitle = styled.h1`
  position: relative;
  margin: 0;
  font-size: 30px;
  color: ${gray};

  ${mediaQuery} {
    text-align: center;
    margin: 0;
    font-size: 24px;
    width: 100%;
  }
`;

export const OrangeTitle = HeadingTitle.extend`
  &:before {
    content: '';
    position: absolute;
    display: block;
    left: -24px;
    height: 100%;
    width: 4px;
    background-color: ${beenestYellow};
  }
`;

export const OrangeButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 56px;
  font-size: 16px;
  min-width: 240px;
  padding: 0 20px;
  color: ${black};
  background-color: ${beenestYellow};
  border-radius: 500px;
  border: none;

  ${mediaQuery} {
    margin: 10px auto;
    display: inline-block;
    padding-top: 10px;
    padding-bottom: 10px;
    height: unset;
    min-width: 90%;
  }
`;

export const Header = styled.div`
  position: relative;
  height: 600px;
  color: #fff;

  ${mediaQuery} {
    height: unset;
  }
`;

export const HeaderContent = styled.div`
  padding: 40px 0 0 56px;

  ${mediaQuery} {
    padding: 0;
    text-align: center;
  }
`;

export const HeaderLogo = styled.div`
  img {
    height: 40px;
    z-index: 1;
  }

  ${mediaQuery} {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    height: 200px;
    width: 100%;

    &:before {
      height: 100%;
      width: 100%;
      position: absolute;
      top: 0;
      content: '';
      opacity: 0.75;
      background-image: url(${heroImage});
      background-size: cover;
      background-repeat: no-repeat;
    }
  }
`;

export const HeaderSlogan = styled.div`
  width: 580px;
  margin-top: 130px;
  margin-bottom: 30px;
  box-sizing: border-box;

  h1 {
    color: #fff;
    font-size: 40px;
    text-shadow: 0 0 5px rgba(0, 0, 0, 0.25);
    font-weight: 300;
  }

  ${mediaQuery} {
    width: 100%;
    margin: 10px 0;
    padding: 10px;
    background-color: ${gray};

    h1 {
      font-size: 24px;
    }
  }
`;

export const Calculator = styled.div`
  background-color: #fff;
  padding: 56px 68px 0;
  border-top: 4px solid ${beenestYellow};

  ${mediaQuery} {
    padding: 15px 0;
    border-top: none;
  }
`;

export const CalculatorBody = styled.div`
  display: flex;
  padding: 24px 0;

  ${mediaQuery} {
    flex-wrap: wrap;
  }
`;

export const CalculatorForm = styled.div`
  width: 48%;
  font-size: 16px;

  ${mediaQuery} {
    width: unset;
  }
`;

export const CalculatorInput = styled.div`
  position: relative;
  input {
    background-color: #ffffff;
    border-radius: 8px;
    border: 1px solid ${testimonialBlue};
    box-shadow: inset 0 -1px 8px 0 ${blackTransparent}, 0 4px 20px 0 ${blackTransparent};
    box-sizing: border-box;
    color: #494c4d;
    display: block;
    font-family: Poppins, Helvetica, Arial, sans-serif;
    font-size: 24px;
    font-weight: 500;
    height: 64px;
    line-height: 29px;
    max-width: 320px;
    outline: none;
    padding: 5px 10px 5px 30px;
    margin: 25px 0;
    width: 100%;
    &::-webkit-inner-spin-button,
    &::-webkit-outer-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }
  &::before {
    content: '$';
    position: absolute;
    font-size: 24px;
    left: 12px;
    top: 18px;
  }
`;

export const CalculatorContent = styled.div`
  width: 424px;
  font-size: 16px;
  line-height: 28px;
  color: ${black};

  ${mediaQuery} {
    width: 100%;
  }
`;

export const CalculatorTableSection = styled.div`
  flex: 1;
  color: ${testimonialBlue};
  font-weight: 300;

  p {
    line-height: 28px;
  }
`;

export const CalculatorTables = styled.div`
  display: flex;
  justify-content: space-between;

  ${mediaQuery} {
    display: unset;
  }
`;

export const CalculatorBeenest = styled.div`
  color: ${testimonialBlue};
  flex: 1;

  h1 {
    font-size: 26px;
    font-weight: 300;
    color: inherit;
    text-align: center;
    padding-bottom: 15px;
    border-bottom: 1px solid #eceff1;
  }
  ${mediaQuery} {
    h1 {
      font-size: 18px;
    }
  }
`;
export const CalculatorCompetition = CalculatorBeenest.extend`
  color: #be3d5a;
`;

export const Crypto = Calculator.extend`
  border: none;
  padding-top: 30px;
  padding-bottom: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  ${mediaQuery} {
    flex-wrap: wrap;
    height: auto;
  }
`;

export const CryptoTitle = HeadingTitle.extend`
  width: 400px;
  margin-right: 40px;
`;

export const CryptoIcons = styled.div`
  position: relative;
  height: 246px;
  width: 100%;

  ${mediaQuery} {
    height: 150px;
  }
`;

export const CryptoIconImages = styled.div`
  position: absolute;
  height: 100%;
  width: 810px;
  border-radius: 2px;
  background-color: #fafafa;
  box-shadow: 0 0 25px 0 ${blackTransparent};
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-top: 4px solid ${beenestYellow};

  ${mediaQuery} {
    position: relative;
    width: 100%;
    box-shadow: unset;
    background-color: unset;
    border-top: none;
  }
`;

export const CryptoIconImage = styled.img`
  max-height: 168px;

  ${mediaQuery} {
    max-height: 100%;
    max-width: 33%;
  }
`;

export const Testimonies = Calculator.extend`
  border: none;
  padding-top: 30px;
  padding-bottom: 30px;

  ${mediaQuery} {
    height: unset;
    flex-wrap: wrap;
  }
`;

export const ValueHosts = Calculator.extend`
  border: none;
  padding-top: 30px;
  padding-bottom: 30px;
`;
