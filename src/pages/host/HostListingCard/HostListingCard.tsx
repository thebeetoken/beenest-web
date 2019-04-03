import * as React from 'react';
import format from 'date-fns/format';
import { compose, graphql } from 'react-apollo';
import Switch from 'react-switch';

import { FirebaseConsumer, FirebaseUserProps } from 'HOCs/FirebaseProvider';
import {
  ACTIVATE_LISTING,
  DEACTIVATE_LISTING,
  DELETE_LISTING,
  DUPLICATE_LISTING,
  GET_HOST_LISTINGS,
  HostListingShort,
  Listing
} from 'networking/listings';
import { formatAddress } from 'utils/formatter';
import { hexColor } from 'styled/utils';
import { Card, Row, Col, CardBody, Button, Label, UncontrolledTooltip, Badge } from 'reactstrap';
import { Link } from 'react-router-dom';

interface Props extends HostListingShort {
  activateListing: (id: string) => Promise<Listing>;
  deactivateListing: (id: string) => Promise<Listing>;
  deleteListing: (id: string) => Promise<any>;
  duplicateListing: (ud: string) => Promise<Listing>;
}

const INCOMPLETE_LISTING = "This listing is incomplete. Click Edit to complete all required fields to publish.";
const VERIFICATION_REQUIRED = "You must verify your email and phone to publish.";

const LISTING_IMG_STYLES = {
  backgroundPosition: 'center center',
  backgroundRepeat: 'no-repeat',
  backgroundColor: 'white',
  overflow: 'hidden',
}

const LONG_CARD_HEIGHT = '248px';

const HostListingCard = (props: Props): JSX.Element => {
  const {
    activateListing,
    canPublish,
    city,
    country,
    deactivateListing,
    deleteListing,
    duplicateListing,
    id,
    idSlug,
    isActive,
    listingPicUrl,
    state,
    title,
    updatedAt
  } = props;
  const toggleListing = isActive ? deactivateListing : activateListing;
  return (
    <Card style={{ minHeight: LONG_CARD_HEIGHT }} className="mb-5 shadow flex-fill border-0">
      <Row className="d-flex flex-column-reverse flex-md-row h-100">
        <Col md="7" className="h-100 pr-lg-5">
          <CardBody style={{ minHeight: LONG_CARD_HEIGHT }} className="d-flex flex-column">
            <h4>{title}</h4>
            <h5>{(city || state || country) ? formatAddress(city, state, country) : ''}</h5>
            <h6 className="font-weight-lighter font-italic">Last edited: {format(updatedAt, 'MM/DD/YY [at] hh:mmA')}</h6>
            <div className="bee-flex-div" />
            <Row className="mb-3 d-flex align-items-center">
              <Col md="6" className="d-flex">
              <Link to={`/host/listings/${id}/calendar`} className="p text-link mb-2 mb-md-0">
                View Calendar
                <span className="ml-2">
                  <i className="fas fa-caret-right" />
                </span>
              </Link>
              </Col>
              <Col md="6">
              <FirebaseConsumer>
                {({ completedVerification }: FirebaseUserProps) => {
                  return (
                    <div className="d-flex align-items-center justify-content-md-end mb-0">
                      <Label
                        className="d-flex align-items-center mb-0"
                        htmlFor={`publish-${id}`}
                        title={canPublish ? '' : INCOMPLETE_LISTING}>
                        <span className={`mr-2${canPublish ? ' text-dark' : ' text-secondary'}`}>Publish</span>
                        {(!completedVerification || !canPublish) &&
                        <>
                          <Badge className="mr-2" color="secondary" id={`UncontrolledTooltipExample` + id} pill>?</Badge>
                          <UncontrolledTooltip placement="bottom" target={`UncontrolledTooltipExample` + id}>
                            <small className="mb-0 text-white">{!completedVerification ? VERIFICATION_REQUIRED : INCOMPLETE_LISTING}</small>
                          </UncontrolledTooltip>
                        </>}
                        <Switch
                          checked={isActive}
                          disabled={!canPublish || !completedVerification}
                          onColor={hexColor('correct')}
                          onChange={() => toggleListing(id).catch((error) => alert(error))}
                          id={`publish-${id}`} />
                      </Label>
                    </div>
                  );
                }}
              </FirebaseConsumer>
              </Col>
            </Row>
            <Row>
              <Col md="6" lg="3" className="mb-2 mb-lg-0">
                <Link
                  to={`/host/listings/${id}/edit`}
                  className="w-100 rounded-lg btn btn-sm btn-secondary">
                  Edit
                </Link>
              </Col>
              <Col md="6" lg="3" className="mb-2 mb-lg-0">
                <Button
                  outline
                  tag={Link}
                  target="_blank"
                  to={`/listings/${idSlug}`}
                  color="secondary"
                  size="sm"
                  className="w-100 rounded-lg">
                  Preview
                </Button>
              </Col>
              <Col md="6" lg="3" className="mb-2 mb-lg-0">
                <Button outline color="secondary" size="sm" className="w-100 rounded-lg" onClick={() => duplicateListing(id)}>
                  Duplicate
                </Button>
              </Col>
              <Col md="6" lg="3" className="mb-2 mb-lg-0">
                <Button outline color="secondary" size="sm" className="w-100 rounded-lg" onClick={() => deleteListing(id)}>
                  Delete
                </Button>
              </Col>
            </Row>
          </CardBody>
        </Col>
        <Col md="5">
          <div className="bg-img-hero d-flex align-items-center justify-content-center u-lg-avatar h-100 w-100"
            style={{ ...LISTING_IMG_STYLES, backgroundImage: `url(${listingPicUrl})`, minHeight: LONG_CARD_HEIGHT }} />
        </Col>
      </Row>
    </Card>
  );
}

export default compose(
  graphql(ACTIVATE_LISTING, {
    props: ({ mutate }: any) => ({
      activateListing: (id: string) => {
        return mutate({
          variables: { id },
          refetchQueries: [{ query: GET_HOST_LISTINGS }],
          update: (store: any, { data }: any) => {
            if (!store.data.data.ROOT_QUERY || !store.data.data.ROOT_QUERY.hostListings) {
              return;
            }

            const { activateListing } = data;
            const { hostListings } = store.readQuery({ query: GET_HOST_LISTINGS });
            const index = hostListings.findIndex((listing: Listing) => listing.id === id);
            store.writeQuery({
              query: GET_HOST_LISTINGS,
              data: {
                hostListings: [
                  ...hostListings.slice(0, index),
                  {
                    ...hostListings[index],
                    ...activateListing,
                  },
                  ...hostListings.slice(index + 1),
                ],
              },
            });
          },
        });
      },
    }),
  }),
  graphql(DEACTIVATE_LISTING, {
    props: ({ mutate }: any) => ({
      deactivateListing: (id: string) => {
        return mutate({
          variables: { id },
          refetchQueries: [{ query: GET_HOST_LISTINGS }],
          update: (store: any, { data }: any) => {
            if (!store.data.data.ROOT_QUERY || !store.data.data.ROOT_QUERY.hostListings) {
              return;
            }

            const { deactivateListing } = data;
            const { hostListings } = store.readQuery({ query: GET_HOST_LISTINGS });
            const index = hostListings.findIndex((listing: Listing) => listing.id === id);
            store.writeQuery({
              query: GET_HOST_LISTINGS,
              data: {
                hostListings: [
                  ...hostListings.slice(0, index),
                  {
                    ...hostListings[index],
                    ...deactivateListing,
                  },
                  ...hostListings.slice(index + 1),
                ],
              },
            });
          },
        });
      },
    }),
  }),
  graphql(DELETE_LISTING, {
    props: ({ mutate }: any) => ({
      deleteListing: (id: string) => {
        if (!window.confirm("Are you sure you want to delete this listing?")) {
          return;
        }
        return mutate({
          variables: { id },
          refetchQueries: [{ query: GET_HOST_LISTINGS }],
          update: (store: any) => {
            if (!store.data.data.ROOT_QUERY || !store.data.data.ROOT_QUERY.hostListings) {
              return;
            }

            const { hostListings } = store.readQuery({ query: GET_HOST_LISTINGS });
            store.writeQuery({
              query: GET_HOST_LISTINGS,
              data: {
                hostListings: hostListings.filter((listing: Listing) => listing.id === id)
              },
            });
          },
        });
      },
    }),
  }),
  graphql(DUPLICATE_LISTING, {
    props: ({ mutate }: any) => ({
      duplicateListing: (id: string) => mutate({
        variables: { id },
        refetchQueries: [{ query: GET_HOST_LISTINGS }],
        update: (store: any, { data }: any) => {
          if (!store.data.data.ROOT_QUERY || !store.data.data.ROOT_QUERY.hostListings) {
            return;
          }

          const { duplicateListing } = data;
          const { hostListings } = store.readQuery({ query: GET_HOST_LISTINGS });
          store.writeQuery({
            query: GET_HOST_LISTINGS,
            data: { hostListings: [ duplicateListing, ...hostListings ] }
          });
        },
      })
    })
  })
)(HostListingCard);
