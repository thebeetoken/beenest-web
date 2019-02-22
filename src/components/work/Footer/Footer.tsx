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
import { Link } from 'react-router-dom';

import { BeenestSVGPrimary } from 'shared/svgComponents/SvgComponents';

const contentData = [
  {
    header: 'Account',
    links: [['Profile', '/work'], ['User Contacts', '/work'], ['Projects', '/work'], ['Settings', '/work']],
  },
  {
    header: 'Company',
    links: [['About', '/work'], ['Services', '/work'], ['Careers', '/work'], ['Blog', '/work']],
  },
  {
    header: 'Resources',
    links: [['Invoice', '/work'], ['Help', '/work'], ['Terms', '/work'], ['Privacy', '/work']],
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
  <footer>
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
                  <DropdownItem tag={Link} to={link[1]} key={link[0]}>
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
                <ListGroupItem action tag={Link} to={link[1]} key={link[0]}>
                  {link[0]}
                </ListGroupItem>
              ))}
            </ListGroup>
          </Col>
        ))}

        <Col sm="3" lg="3" className="mb-4 mb-lg-0">
          <ListGroup className="list-group-borderless" flush>
            <ListGroupItemHeading className="h6 font-weight-semi-bold">Contact</ListGroupItemHeading>
            <ListGroupItem className="text-secondary">+1 (408) 123-4567</ListGroupItem>
            <ListGroupItem tag={Link} to="/work">
              support@beenest.com
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

export default Footer;
