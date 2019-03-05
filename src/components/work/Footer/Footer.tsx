import * as React from 'react';
import {
  Button,
  Col,
  Container,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  ListGroup,
  ListGroupItem,
  ListGroupItemHeading,
  Row,
  UncontrolledDropdown,
} from 'reactstrap';
import { Route, Switch } from 'react-router-dom';

import { SETTINGS } from 'configs/settings';
import { BeenestSVGPrimary } from 'shared/svgComponents/SvgComponents';

const { BEENEST_HOST } = SETTINGS;

const contentData = [
  {
    header: 'Top Cities',
    links: [
      ['San Francisco', `${BEENEST_HOST}/markets/san-francisco`],
      ['New York', `${BEENEST_HOST}/markets/new-york`],
      ['Los Angeles', `${BEENEST_HOST}/markets/los-angeles`],
      ['Denver', `${BEENEST_HOST}/markets/denver`],
      ['Chicago', `${BEENEST_HOST}/markets/chicago`]],
  },
  {
    header: 'Company',
    links: [
      ['About', `${BEENEST_HOST}/about`],
      ['Blog', 'https://medium.com/thebeetoken', '_blank'],
    ],
  },
  {
    header: 'Community',
    links: [
      ['Telegram', 'https://t.me/beetoken', '_blank'],
      ['Twitter', 'https://twitter.com/thebeetoken', '_blank'],
      ['Facebook', 'https://www.facebook.com/thebeetoken/', '_blank'],
    ],
  },
];

const socialData = [
  {
    btnClass: 'btn-facebook',
    iconClass: 'fa-facebook-f',
    link: 'https://www.facebook.com/thebeetoken/',
  },
  {
    btnClass: 'btn-twitter',
    iconClass: 'fa-twitter',
    link: 'https://twitter.com/thebeetoken',
  },
  {
    btnClass: 'btn-github',
    iconClass: 'fa-github',
    link: 'https://github.com/thebeetoken/beenest-web',
  },
  {
    btnClass: 'btn-linkedin',
    iconClass: 'fa-linkedin',
    link: 'https://www.linkedin.com/company/beenestofficial/',
  },
];

const Footer = () => (
  <Switch>
    <Route path="/account" component={DetailedFooter} />
    <Route exact path="/" component={DetailedFooter} />
    <Route exact path="/about" component={DetailedFooter} />
    <Route exact path="/login" component={NoopComponent} />
    <Route exact path="/signup" component={NoopComponent} />
    <Route component={DetailedFooter} />
  </Switch>
)

const DetailedFooter = () => (
  <footer className="pt-md-10">
    <Container className="space-lg-2 border-bottom">
      <Row className="justify-content-md-between">
        <Col lg="3" className="d-none d-lg-flex mb-4 mb-lg-0">
          <BeenestSVGPrimary />
        </Col>

        <div className="d-md-none space-1">
          {contentData.map(item => (
            <UncontrolledDropdown key={item.header}>
              <DropdownToggle className="u-header__nav-link" nav>
                {item.header}{' '}<i className="fas fa-caret-down" />
              </DropdownToggle>
              <DropdownMenu>
                {item.links.map(link => (
                  <DropdownItem tag="a" href={link[1]} target={link[2] || '_self'} key={link[0]}>
                    {link[0]}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </UncontrolledDropdown>
          ))}
        </div>

        {contentData.map(item => (
          <Col sm="3" lg="2" className="d-none d-md-flex mb-4 mb-lg-0" key={item.header}>
            <ListGroup className="list-group-borderless" flush>
              <ListGroupItemHeading className="h6 font-weight-semi-bold">{item.header}</ListGroupItemHeading>
              {item.links.map(link => (
                <ListGroupItem action tag="a" href={link[1]} target={link[2] || '_self'} key={link[0]}>
                  {link[0]}
                </ListGroupItem>
              ))}
            </ListGroup>
          </Col>
        ))}

        <Col sm="3" lg="3" className="mb-4 mb-lg-0">
          <ListGroup className="list-group-borderless" flush>
            <ListGroupItemHeading className="h6 font-weight-semi-bold">Contact</ListGroupItemHeading>
            <ListGroupItem tag="a" href="https://support.beenest.com/" target="_blank">
              Support
            </ListGroupItem>
            <ListGroupItem className="text-secondary">
              717 Market St.
              <br />
              San Francisco, CA 94103
            </ListGroupItem>
          </ListGroup>
        </Col>
      </Row>
    </Container>

    <Container className="space-1 d-flex flex-column flex-md-row justify-content-sm-between align-items-center align-items-md-end">
      <div className="d-flex d-md-none mb-3">
        <BeenestSVGPrimary />
      </div>
      <h4 className="small text-secondary my-3 my-md-0 text-center">
        &copy;Beenest Inc 2017-2019. <br className="d-flex d-md-none" />
        All Rights Reserved.
      </h4>
      <div className="d-flex mt-sm-5">
        {socialData.map(social => (
          <a target="_blank" href={social.link} key={social.btnClass}>
            <Button
              type="button"
              className={`btn btn-icon transition-3d-hover mx-1 ${social.btnClass}`}
            >
              <span className={`fab btn-icon__inner ${social.iconClass}`} />
            </Button>
          </a>
        ))}
      </div>
    </Container>
  </footer>
);

const NoopComponent = () => null;

export default Footer;
