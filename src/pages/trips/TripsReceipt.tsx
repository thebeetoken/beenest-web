import * as React from 'react';
import { Booking, GET_BOOKING_TRIPS_RECEIPT } from 'networking/bookings';
import { Container, Fade, Row, Col, ListGroupItem, Table } from 'reactstrap';
import { Query } from 'react-apollo';
import { formatAddress, formatGeolocationAddress } from 'utils/formatter';
import Loading from 'components/shared/loading/Loading';
import { VIEWPORT_CENTER_LAYOUT } from 'styled/sharedClasses/layout';
import { formatDateRange } from 'utils/formatDate';
import ListGroup from 'reactstrap/lib/ListGroup';
import GoogleMaps from 'components/shared/GoogleMaps';

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
        const { guestTxHash, guestTotalAmount, host, listing, checkInDate, checkOutDate, currency, numberOfGuests, priceQuotes } = booking;
        const { createdAt, firstName, profilePicUrl } = host;
        const { addressLine1, addressLine2, city, country, lat, lng, postalCode, state, title } = listing;
        const priceQuote = (priceQuotes || []).find((quote) => quote.currency === currency);

        const { creditAmountApplied, pricePerNight, priceTotalNights, securityDeposit, transactionFee } = priceQuote;
  
        return (
          <Container className="pt-8 pb-6" tag={Fade}>
            <Row>
              <Col lg="7">
                <h1>Receipt</h1>
                <hr />
                <h3>{title}</h3>
                <h4>{formatAddress(city, state, country)}</h4>
                <div>Photos and stuff member since</div>
                <hr />
                <Row>
                  <Col>
                    <i className="far fa-calendar-alt mr-2 text-primary" />
                    <span>Booked on: {formatDateRange(checkInDate, checkOutDate)}</span>

                    <p>Guests: {numberOfGuests}</p>
                  </Col>
                </Row>
                <Table>
                  <thead>
                    <tr>
                      <th>Item</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">{pricePerNight} {currency} x {Math.floor((priceTotalNights / pricePerNight))} {(priceTotalNights / pricePerNight) > 1 ? 'nights' : 'night'}</th>
                      <td>{currency === 'USD' ? roundToUsdPrice(priceTotalNights) : priceTotalNights} {currency}</td>
                    </tr>
                    <tr>
                      <th scope="row">Security Deposit</th>
                      <td>{currency === 'USD' ? roundToUsdPrice(securityDeposit || 0) : (securityDeposit || 0)} {currency}</td>
                    </tr>
                    <tr>
                      <th scope="row">Transaction Fee</th>
                      <td>{transactionFee} {currency}</td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr className="h6">
                      <td scope="row">Total</td>
                      <td colSpan={3}>{currency === 'USD' ? roundToUsdPrice(guestTotalAmount) : guestTotalAmount} {currency}</td>
                    </tr>
                  </tfoot>
                </Table>
                <hr />
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
              <Col lg="5"></Col>
            </Row>
          </Container>
        );
      }}
    </Query>
  );
}

const roundToUsdPrice = (price: Number) => price.toFixed(2);

export default TripsReceipt;