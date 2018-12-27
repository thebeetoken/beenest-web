import { Booking } from 'networking/bookings';

export default function generateUpdatedBookings(allBookings: Booking[], updatedBooking: Booking) {
  const index = allBookings.findIndex(booking => booking.id === updatedBooking.id);
  if (index < 0) {
    alert('Booking Id does not match. Please contact the nearest Beetoken Engineer.');
    return allBookings;
  }
  return [
    ...allBookings.slice(0, index),
    {
      ...allBookings[index],
      ...updatedBooking,
    },
    ...allBookings.slice(index + 1),
  ];
}