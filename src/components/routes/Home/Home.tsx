import * as React from 'react';

import HomeContainer from './Home.container';

import { AppConsumer, AppConsumerProps, ScreenType } from 'components/App.context';
import BeeLink from 'shared/BeeLink';
import Button from 'shared/Button';
import Divider from 'shared/Divider';
import GeneralWrapper from 'shared/GeneralWrapper';
import LazyImage from 'shared/LazyImage';
import Overlay from 'shared/Overlay';
import SearchBar from 'shared/SearchBar';
import Svg from 'shared/Svg';

class Home extends React.Component {
  render() {
    return (
      <HomeContainer className="bee-home">
        <div className="home-hero">
          <Overlay color="white" opacity={0.2}>
            <LazyImage src="https://static.beenest.com/images/app/misc/painted-ladies2.jpg" transition />
          </Overlay>
          <div className="text-container">
            <h1>Book a home: Connect with the Crypto Community</h1>
            <p>Commission-free. Secure. Decentralized.</p>
          </div>
          <SearchBar />
        </div>
        <AppConsumer>
          {({ screenType }: AppConsumerProps) => {
            if (screenType < ScreenType.DESKTOP) {
              return (
                <div className="home-content">
                  <HomeContent />
                </div>
              );
            }

            return (
              <GeneralWrapper className="home-content">
                <HomeContent />
              </GeneralWrapper>
            );
          }}
        </AppConsumer>
      </HomeContainer>
    );
  }
};

export default Home;

const HomeContent = () => (
  <>
    <AppConsumer>
      {({ screenType }: AppConsumerProps) => {
        if (screenType > ScreenType.MOBILE) {
          return <NoopComponent />;
        }

        return <Divider color="middle" />;
      }}
    </AppConsumer>
    <HostCta />
    <PopularCities />
    <PressLinks />
  </>
);

const HostCta = () => (
  <section className="host-cta">
    <div className="host-cta-image-container">
      <Overlay color="white" opacity={0.2}>
        <LazyImage src="https://static.beenest.com/images/app/misc/host-cta-image.jpg" transition />
      </Overlay>
    </div>
    <div className="host-cta-content">
      <h2>Find out how much you can earn hosting your place on Beenest</h2>
      <p>Turn your extra space into extra income.</p>
      <BeeLink to="/hosts/signup?utm_source=below_fold_host_signup_cta">
        <Button size="short">
          Start Earning Now
        </Button>
      </BeeLink>
    </div>
  </section>
);


const PopularCities = () => {
  const imageSize = '400x400';
  const cities = [
      {name: 'San Francisco', nameDashCase: 'san-francisco'},
      {name: 'Los Angeles', nameDashCase: 'los-angeles'},
      {name: 'New York', nameDashCase: 'new-york'},
      {name: 'Las Vegas', nameDashCase: 'las-vegas'},
      {name: 'Miami', nameDashCase: 'miami'},
      {name: 'Hawaii', nameDashCase: 'hawaii'},
      {name: 'Denver', nameDashCase: 'denver'},
      {name: 'Boston', nameDashCase: 'boston'},
      {name: 'Seattle', nameDashCase: 'seattle'},
      {name: 'Austin', nameDashCase: 'austin'},
      {name: 'New Orleans', nameDashCase: 'new-orleans'},
      {name: 'Houston', nameDashCase: 'houston'},
      {name: 'Orlando', nameDashCase: 'orlando'},
  ];

  return <section className="popular-cities">
    <h1>Pay for your next trip with credit/debit or crypto. Explore these amazing locations and many more!</h1>
    <div className="popular-cities-container">
      {cities.map(city => (
          <PopularCityCard
            backgroundImg={`https://d9lhrxmc0upxv.cloudfront.net/fit-in/${imageSize}/images/featured-cities/${city.nameDashCase}.jpg`}
            city={city.name}
            link={`/markets/${city.nameDashCase}`}
          />
        )
      )}
    </div>
  </section>
};

interface PopularCityCardProps {
  backgroundImg: string;
  city: string;
  link: string;
}

//Uncoment once BD team has a conference to promote
//In the future we want to support this toggle in a CMS
//const FeaturedConference = () => (
//  <Query query={GET_FEATURED_CONFERENCE}>
//    {({ loading, error, data }) => {
//      if (loading) {
//        return (
//          <section className="featured-conference">
//            <HomeFeaturedConferencePlaceholder />
//          </section>
//        );
//      }
//      if (error || !data || !data.featuredConference) {
//        return <NoopComponent />;
//      }
//
//      return (
//        <section className="featured-conference">
//          <HomeFeaturedConference {...data.featuredConference} />
//        </section>
//      );
//    }}
//  </Query>
//);

const PopularCityCard = ({ backgroundImg, city, link }: PopularCityCardProps) => (
  <BeeLink
    to={link}
  >
    <div className="popular-city-card">
      <Overlay color="white" opacity={0.3}>
        <LazyImage src={backgroundImg} transition />
      </Overlay>
      <div className="popular-city-card--light-box">
        <div className="popular-city-card--text">
          <h4>{city}</h4>
        </div>
      </div>
    </div>
  </BeeLink>
);

const NoopComponent = () => null;

const PressLinks = () => (
  <section className="social-banner">
    <div className="social-wrapper">
      <BeeLink
        href="https://www.forbes.com/sites/lorihil/2018/02/15/a-more-secure-way-to-home-share-blockchain-technology/#3891384c5e8b"
        rel="external"
        target="_blank"
      >
        <Svg src="logo/logo-forbes" />
      </BeeLink>
      <BeeLink
        href="https://www.huffingtonpost.com/entry/brain-drain-uber-google-facebook-engineers-create_us_5a4d4965e4b0df0de8b06f18"
        rel="external"
        target="_blank"
      >
        <Svg src="logo/logo-huffpost" />
      </BeeLink>
      <BeeLink
        href="https://www.fastcompany.com/40524021/on-this-blockchain-based-version-of-airbnb-theres-no-middleman"
        rel="external"
        target="_blank"
      >
        <Svg src="logo/logo-fastcompany" />
      </BeeLink>
      <BeeLink
        href="https://www.inc.com/darren-heitner/how-this-entrepreneur-is-fixing-250-billion-sharing-economy-with-blockchain-technology.html"
        rel="external"
        target="_blank"
      >
        <Svg src="logo/logo-inc" />
      </BeeLink>
      <BeeLink
        href="https://www.sfchronicle.com/business/article/Bitcoin-ethereum-can-pay-for-home-rentals-12526206.php"
        rel="external"
        target="_blank"
      >
        <Svg src="logo/logo-sfchronicle" />
      </BeeLink>
    </div>
  </section>
);
