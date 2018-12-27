import * as React from 'react';
import { Mutation } from 'react-apollo';

import { Booking, Currency, GET_BOOKING, GUEST_SELECT_PAYMENT } from 'networking/bookings';
import Button from 'shared/Button';

interface Props {
  booking: Booking;
  className?: string;
  currency: Currency;
  disabled?: boolean;
  onSuccess: () => void;
  paymentSourceId?: string | null;
}

const SelectPaymentButton = ({ booking, className, currency, disabled, onSuccess, paymentSourceId }: Props) => (
  <Mutation
    mutation={GUEST_SELECT_PAYMENT}
    update={(store: any, { data: { guestSelectPayment } }) => {
      const { id } = guestSelectPayment;
      store.writeQuery({
        query: GET_BOOKING,
        variables: { id },
        data: {
          booking: {
            ...booking,
            ...guestSelectPayment,
          },
        },
      });
      return onSuccess();
    }}
  >
    {(guestSelectPaymentFunc, { loading }) => (
      <Button
        className={className}
        disabled={disabled || loading}
        onClick={async () => {
          try {
            await guestSelectPaymentFunc({
              variables: {
                input: {
                  currency,
                  id: booking.id,
                  ...(paymentSourceId && { paymentSourceId }),
                },
              },
            });
          } catch (error) {
            alert('There was an issue. Please contact us at support@beetoken.com!');
            console.error('this is the error', error);
          }
        }}
      >
        Continue
      </Button>
    )}
  </Mutation>
);

export default SelectPaymentButton;
