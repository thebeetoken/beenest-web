import * as React from 'react';
import { Booking, GET_BOOKING_TRIPS_RECEIPT } from 'networking/bookings';
import { Container, Fade, Row, Col, ListGroupItem, Table, Media } from 'reactstrap';
import { Query } from 'react-apollo';
import { formatAddress, formatGeolocationAddress } from 'utils/formatter';
import Loading from 'components/shared/loading/Loading';
import { VIEWPORT_CENTER_LAYOUT } from 'styled/sharedClasses/layout';
import { formatDateRange, dateToYear } from 'utils/formatDate';
import ListGroup from 'reactstrap/lib/ListGroup';
import GoogleMaps from 'components/shared/GoogleMaps';
import LazyImage from 'components/shared/LazyImage';

const DEFAULT_PROFILE_URL = 'https://static.beenest.com/images/app/misc/profile.png';

function TripsReceipt({ match }: RouterProps) {
  return (
    <Query query={GET_BOOKING_TRIPS_RECEIPT} variables={{ id: match.params.id }}>
      {({ loading, error, data }) => {
        if (loading) {
          return (
            <Container className={VIEWPORT_CENTER_LAYOUT}>
              <Loading height="8rem" width="8rem" />
            </Container>
          );
        }
        if (error || !data) {
          return <h1>{error ? error.message : 'Error / No Data'}</h1>;
        }

        const { booking } = data;
        const {
          guestTxHash,
          guestTotalAmount,
          host,
          listing,
          checkInDate,
          checkOutDate,
          currency,
          numberOfGuests,
          priceQuotes,
        } = booking;
        const { createdAt, firstName, profilePicUrl } = host;
        const { addressLine1, addressLine2, city, country, lat, lng, postalCode, state, title } = listing;
        const priceQuote = (priceQuotes || []).find(quote => quote.currency === currency);

        const { creditAmountApplied, pricePerNight, priceTotalNights, securityDeposit, transactionFee } = priceQuote;

        return (
          <Container className="pt-8 pb-6" tag={Fade}>
            <Row>
              <Col lg="7">
                <h1 className="mb-0">Receipt</h1>
                <hr className="mb-5" />
                <h3>{title}</h3>
                <h6 className="text-primary mb-4">{formatAddress(city, state, country)}</h6>
                <Row className="mb-5">
                  <Col className="d-flex">
                    <img
                      className="u-lg-avatar rounded-circle mr-4"
                      src={host.profilePicUrl || DEFAULT_PROFILE_URL}
                      alt="Guest Profile Picture"
                    />
                    <div className="d-flex flex-column justify-content-center">
                      <h6 className="p mb-1 font-weight-light">Hosted by: {firstName}</h6>
                      <small className="text-muted">Member Since {dateToYear(createdAt)}</small>
                    </div>
                  </Col>
                </Row>
                <hr className="mb-5" />
                <Row className="mb-5">
                  <Col>
                    <i className="far fa-calendar-alt mr-2 text-primary" />
                    <span>Booked on: {formatDateRange(checkInDate, checkOutDate)}</span>
                    <p>Guests: {numberOfGuests}</p>
                  </Col>
                </Row>

                {guestTxHash && (
                  <Row className="mb-5">
                    <Col>
                      <h6>Transaction Confirmation Number</h6>
                      <h6>{guestTxHash}</h6>
                    </Col>
                  </Row>
                )}
                
                <Table>
                  <thead>
                    <tr>
                      <th>Item</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">
                        {pricePerNight} {currency} x {Math.floor(priceTotalNights / pricePerNight)}{' '}
                        {priceTotalNights / pricePerNight > 1 ? 'nights' : 'night'}
                      </th>
                      <td>
                        {currency === 'USD' ? roundToUsdPrice(priceTotalNights) : priceTotalNights} {currency}
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Security Deposit</th>
                      <td>
                        {currency === 'USD' ? roundToUsdPrice(securityDeposit || 0) : securityDeposit || 0} {currency}
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Transaction Fee</th>
                      <td>
                        {transactionFee} {currency}
                      </td>
                    </tr>
                    {!!creditAmountApplied && (
                      <tr>
                        <th scope="row">Credits Applied</th>
                        <td>
                          -{creditAmountApplied} {currency}
                        </td>
                      </tr>
                    )}
                  </tbody>
                  <tfoot>
                    <tr className="h6">
                      <td scope="row">Total</td>
                      <td colSpan={3}>
                        {currency === 'USD' ? roundToUsdPrice(guestTotalAmount) : guestTotalAmount} {currency}
                      </td>
                    </tr>
                  </tfoot>
                </Table>
                <hr className="mb-5" />
                <Row>
                  <Col>
                    <p>
                      <i className="fas fa-map-marker-alt mr-2 text-primary" />
                      {addressLine1
                        ? formatAddress(addressLine1, addressLine2, city, state, country, postalCode)
                        : formatGeolocationAddress({ lat, lng, city, country })}
                    </p>
                    <GoogleMaps lat={lat} lng={lng} showCircle />
                  </Col>
                </Row>
              </Col>
              <Col lg="5" />
            </Row>
          </Container>
        );
      }}
    </Query>
  );
}

const roundToUsdPrice = (price: Number) => price.toFixed(2);

export default TripsReceipt;
