import * as React from 'react';
import { Booking, GET_BOOKING_TRIPS_RECEIPT } from 'networking/bookings';
import { Container, Fade, Row, Col } from 'reactstrap';
import { Query } from 'react-apollo';
import { formatAddress } from 'utils/formatter';
import Loading from 'components/shared/loading/Loading';
import { VIEWPORT_CENTER_LAYOUT } from 'styled/sharedClasses/layout';
import { formatDateRange } from 'utils/formatDate';

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
        const { guestTxHash, guestTotalAmount, host, listing, checkInDate, checkOutDate, currency, numberOfGuests } = booking;
        const { createdAt, firstName, profilePicUrl } = host;
        const { city, country, state, title } = listing;
        return (
          <Container className="pt-8 pb-6" tag={Fade}>
            <Row>
              <Col md="7">
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
                <Row>
                  <Col>
                    <i className="fas fa-money-check" />
                    <p>Total Paid: {currency === 'USD' ? roundToUsdPrice(guestTotalAmount) : guestTotalAmount} {currency}</p>
                  </Col>
                </Row>
                <hr />
                <Row>
                  <Col>
                  
                  </Col>
                </Row>
                <hr />
                <Row>
                  <Col>
                  
                  </Col>
                </Row>
              </Col>
              <Col md="5"></Col>
            </Row>
          </Container>
        );
      }}
    </Query>
  );
}

export default TripsReceipt;