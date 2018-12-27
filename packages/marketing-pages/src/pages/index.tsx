import React from 'react';

import logo from '../assets/images/logo.png';
import beenestCryptoIcon from '../assets/images/beenest-crypto-icon.png';
import ethereumCryptoIcon from '../assets/images/ethereum-crypto-icon.png';
import usdCryptoIcon from '../assets/images/usd-icon.png';
import bradTestimonyImage from '../assets/images/Brad_testimony.jpg';

import CostTable from '../components/CostTable';
import Testimonial from '../components/Testimonial';

import {
  Calculator,
  CalculatorBody,
  CalculatorContent,
  HeroImage,
  JumpImage,
  CalculatorForm,
  CalculatorInput,
  CalculatorTables,
  CalculatorTableSection,
  CalculatorBeenest,
  CalculatorCompetition,
  Container,
  CopyText,
  Crypto,
  CryptoIconImage,
  CryptoIconImages,
  CryptoIcons,
  CryptoTitle,
  Header,
  HeaderContent,
  HeaderLogo,
  HeaderSlogan,
  HeadingTitle,
  InnerContainer,
  OrangeButton,
  OrangeTitle,
  ShadowContainer,
  Testimonies,
  ValueHosts,
} from '../styles/indexStyles';

const BEENEST_CLEANING_FEE = 50;
const BEENEST_TRANSACTION_RATE = 0.03;
const BEENEST_GUEST_RATE = 0.2;

const COMPETITOR_CLEANING_FEE = 50;
const COMPETITOR_TRANSACTION_RATE = -0.03;
const COMPETITOR_GUEST_RATE = -0.2;

const testimonies = [
  {
    img: bradTestimonyImage,
    title: 'Brad Greiner | Beenest Host',
    copy: `Beenest offers the best home-sharing platform for hosts, hands down. As a Beenest host, I've been earning 20% more every time someone books one of my properties. They have my business as both a host and guest.
    
    The short-term rental industry has been built on the backs of countless hardworking hosts around the world. It's great to home-share on a platform that really values its hosts`,
  },
];

class IndexPage extends React.Component<{}> {
  public state = {
    amountPerNight: 0,
  };

  public calculateAmount = (e: React.FormEvent<HTMLInputElement>) => {
    const value = parseInt(e.currentTarget.value, 10) || 0;
    this.setState({ amountPerNight: value });
  };

  public render() {
    return (
      <Container>
        <HeroImage />
        <JumpImage />
        <InnerContainer>
          <Header>
            <HeaderContent>
              <HeaderLogo>
                <img src={logo} alt="logo" />
              </HeaderLogo>
              <HeaderSlogan>
                <HeadingTitle>Make more when you list your home on Beenest.</HeadingTitle>
              </HeaderSlogan>
              <OrangeButton>Get Started!</OrangeButton>
            </HeaderContent>
          </Header>

          <ShadowContainer>
            <Calculator>
              <CalculatorBody>
                <CalculatorForm>
                  <OrangeTitle>No Service Fees</OrangeTitle>
                  <CalculatorInput>
                    <input
                      onChange={this.calculateAmount}
                      type="number"
                      name="amountPerNight"
                      placeholder="Per Night"
                      min="0"
                    />
                  </CalculatorInput>
                  <CalculatorContent>
                    <CopyText>
                      Unlike other homesharing sites, we don’t take a cut of host profits. Our hosts
                      get 100% of what guests pay to rent their place.
                    </CopyText>
                    <CopyText>
                      Traditional homesharing platforms are run by big corporations that claim a
                      percentage of every transaction. Powered by blockchain technology, Beenest
                      works a little differently. We don’t need to take a cut so hosts can make
                      more.
                    </CopyText>
                  </CalculatorContent>
                </CalculatorForm>

                <CalculatorTableSection>
                  <CalculatorTables>
                    <CalculatorBeenest>
                      <HeadingTitle>Beenest</HeadingTitle>
                      <CostTable
                        name={'Beenest'}
                        border={'border-right: 1px solid #eceff1'}
                        guestRate={BEENEST_GUEST_RATE}
                        cleaningFee={BEENEST_CLEANING_FEE}
                        amount={this.state.amountPerNight}
                        transactionRate={BEENEST_TRANSACTION_RATE}
                        color={'#00969e'}
                      />
                    </CalculatorBeenest>
                    <CalculatorCompetition>
                      <HeadingTitle>Competition</HeadingTitle>
                      <CostTable
                        name={'Competition'}
                        guestRate={COMPETITOR_GUEST_RATE}
                        cleaningFee={COMPETITOR_CLEANING_FEE}
                        amount={this.state.amountPerNight}
                        transactionRate={COMPETITOR_TRANSACTION_RATE}
                        color={'#BE3D5A'}
                        accentColor={'#E7643A'}
                      />
                    </CalculatorCompetition>
                  </CalculatorTables>
                  <CopyText>
                    *Guest and transaction fee on Beenest are opportunities for all hosts to make
                    extra on their listings.
                  </CopyText>
                </CalculatorTableSection>
              </CalculatorBody>
            </Calculator>

            <Crypto>
              <CryptoTitle>Get Paid in Crypto</CryptoTitle>
              <CryptoIcons>
                <CryptoIconImages>
                  <CryptoIconImage src={beenestCryptoIcon} />
                  <CryptoIconImage src={ethereumCryptoIcon} />
                  <CryptoIconImage src={usdCryptoIcon} />
                </CryptoIconImages>
              </CryptoIcons>
            </Crypto>

            <Testimonies>
              {testimonies.map((testimony, idx) => {
                return <Testimonial key={idx} {...testimony} />;
              })}
            </Testimonies>

            <ValueHosts>
              <HeadingTitle>We Value our Hosts</HeadingTitle>
              <CopyText>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt.
              </CopyText>
              <OrangeButton>List Your Home on Beenest!</OrangeButton>
            </ValueHosts>
          </ShadowContainer>
        </InnerContainer>
      </Container>
    );
  }
}
export default IndexPage;
