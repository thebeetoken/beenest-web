import { BookingStatus, Currency } from 'networking/bookings';

/**
 * Function that returns a
 * pleasing-to-read booking
 * status
 *
 * @author kevin
 **/

enum AdminBookingDisplayStatus {
  STARTED = 'Started',
  EXPIRED_BEFORE_GUEST_CONFIRMED = 'Expired Before Guest Confirmed',
  GUEST_CONFIRMED = 'Guest Confirmed',
  GUEST_CANCELLED = 'Guest Cancelled',
  GUEST_REJECTED_PAYMENT = 'Guest Rejected Payment',
  HOST_REJECTED = 'Host Rejected',
  HOST_APPROVED = 'Host Approved',
  HOST_CANCELLED = 'Host Cancelled',
  EXPIRED_BEFORE_HOST_APPROVED = 'Expired Before Host Approved',
  INIT_PAY_SUBMITTED = 'Init Pay Submitted',
  PAYMENT_FAILED = 'Payment Failed',
  GUEST_PAID = 'Guest Paid',
  HOST_PAID = 'Host Paid',
  REFUNDED = 'Refunded',
  COMPLETED = 'Completed',
  ERROR = 'Error'
}

export function getAdminBookingDisplayStatus(status: string): AdminBookingDisplayStatus {
  switch (status) {
    case 'started':
      return AdminBookingDisplayStatus.STARTED;
    case 'expired_before_guest_confirmed':
      return AdminBookingDisplayStatus.EXPIRED_BEFORE_GUEST_CONFIRMED;
    case 'guest_confirmed':
      return AdminBookingDisplayStatus.GUEST_CONFIRMED;
    case 'guest_cancelled':
      return AdminBookingDisplayStatus.GUEST_CANCELLED;
    case 'guest_rejected_payment':
      return AdminBookingDisplayStatus.GUEST_REJECTED_PAYMENT;
    case 'host_rejected':
      return AdminBookingDisplayStatus.HOST_REJECTED;
    case 'host_approved':
      return AdminBookingDisplayStatus.HOST_APPROVED;
    case 'host_cancelled':
      return AdminBookingDisplayStatus.HOST_CANCELLED;
    case 'expired_before_host_approved':
      return AdminBookingDisplayStatus.EXPIRED_BEFORE_HOST_APPROVED;
    case 'init_pay_submitted':
      return AdminBookingDisplayStatus.INIT_PAY_SUBMITTED;
    case 'payment_failed':
      return AdminBookingDisplayStatus.PAYMENT_FAILED;
    case 'guest_paid':
      return AdminBookingDisplayStatus.GUEST_PAID;
    case 'host_paid':
      return AdminBookingDisplayStatus.HOST_PAID;
    case 'refunded':
      return AdminBookingDisplayStatus.REFUNDED;
    case 'completed':
      return AdminBookingDisplayStatus.COMPLETED;
    default:
      return AdminBookingDisplayStatus.ERROR;
  }
}

enum UserBookingDisplayStatus {
  STARTED = 'Started',
  EXPIRED_BEFORE_GUEST_CONFIRMED = 'Expired Before Guest Confirmed',
  GUEST_CONFIRMED = 'Waiting for Host Approval',
  GUEST_CANCELLED = 'Guest Cancelled',
  GUEST_CANCEL_INITIATED = 'Guest Cancel Initiated',
  GUEST_REJECTED = 'Guest Rejected Before Host Confirmed',
  GUEST_REJECTED_PAYMENT = 'Guest Rejected Payment',
  HOST_REJECTED = 'Host Rejected',
  HOST_APPROVED = 'Host Approved',
  HOST_CANCELLED = 'Host Cancelled',
  EXPIRED_BEFORE_HOST_APPROVED = 'Expired Before Host Approved',
  INIT_PAY_SUBMITTED = 'Init Pay Submitted',
  PAYMENT_FAILED = 'Payment Failed',
  GUEST_PAID = 'Guest Paid',
  HOST_PAID = 'Host Paid',
  REFUNDED = 'Refunded',
  REFUND_INITIATED= 'Refund Initiated',
  COMPLETED = 'Completed',
  ERROR = 'Error',
}

interface BookingDisplayStatus {
  [key: string]: UserBookingDisplayStatus;
}

const bookingStatus: BookingDisplayStatus = {
  'started': UserBookingDisplayStatus.STARTED,
  'expired_before_guest_confirmed': UserBookingDisplayStatus.EXPIRED_BEFORE_GUEST_CONFIRMED,
  'guest_confirmed': UserBookingDisplayStatus.GUEST_CONFIRMED,
  'guest_cancelled': UserBookingDisplayStatus.GUEST_CANCELLED,
  'guest_cancel_initiated': UserBookingDisplayStatus.GUEST_CANCEL_INITIATED,
  'guest_rejected': UserBookingDisplayStatus.GUEST_REJECTED,
  'guest_rejected_payment': UserBookingDisplayStatus.GUEST_REJECTED_PAYMENT,
  'host_rejected': UserBookingDisplayStatus.HOST_REJECTED,
  'host_approved': UserBookingDisplayStatus.HOST_APPROVED,
  'host_cancelled': UserBookingDisplayStatus.HOST_CANCELLED,
  'expired_before_host_approved': UserBookingDisplayStatus.EXPIRED_BEFORE_HOST_APPROVED,
  'init_pay_submitted': UserBookingDisplayStatus.INIT_PAY_SUBMITTED,
  'payment_failed': UserBookingDisplayStatus.PAYMENT_FAILED,
  'guest_paid': UserBookingDisplayStatus.GUEST_PAID,
  'host_paid': UserBookingDisplayStatus.HOST_PAID,
  'refunded': UserBookingDisplayStatus.REFUNDED,
  'refund_initiated': UserBookingDisplayStatus.REFUND_INITIATED,
  'completed': UserBookingDisplayStatus.COMPLETED,
}

export const cancelledDisplayMap: { [key: string]: string } = {
  host_cancelled: 'Trip cancelled by host',
  host_rejected: 'Trip rejected by host',
  guest_cancelled: 'Trip cancelled by you',
  guest_cancel_initiated: 'Cancel initiated by you',
  guest_rejected: 'Trip rejected by you',
  guest_rejected_payment: 'Payment rejected by you',
  expired_before_host_approved: 'Expired before host approved',
  payment_failed: 'Payment failed',
  refunded: 'Refunded',
};

export function getHostBookingDisplayStatusEnum(status: string): BookingStatus {
  switch (status) {
    case 'guest_confirmed':
      return BookingStatus.GUEST_CONFIRMED;
    case 'host_approved':
      return BookingStatus.HOST_APPROVED;
    case 'guest_paid':
      return BookingStatus.GUEST_PAID;
    case 'payment_failed':
      return BookingStatus.PAYMENT_FAILED;
    case 'guest_rejected':
      return BookingStatus.GUEST_REJECTED;
    case 'host_rejected':
      return BookingStatus.HOST_REJECTED;
    case 'guest_cancel_initiated':
      return BookingStatus.GUEST_CANCEL_INITIATED;
    case 'guest_cancelled':
      return BookingStatus.GUEST_CANCELLED;
    case 'refund_initiated':
      return BookingStatus.REFUNDED;
    case 'refunded':
      return BookingStatus.REFUNDED;
    case 'host_cancelled':
      return BookingStatus.HOST_CANCELLED;
    case 'host_paid':
      return BookingStatus.HOST_PAID;
    case 'completed':
      return BookingStatus.COMPLETED;
    default:
      return BookingStatus.ERROR;
  }
}

export const DisplayHostBookingStatusFiat = {
  [BookingStatus.GUEST_CONFIRMED]: 'Awaiting your approval.',
  [BookingStatus.HOST_APPROVED]: '?? host_approved',
  [BookingStatus.GUEST_PAID]: 'Approved.',
  [BookingStatus.PAYMENT_FAILED]: 'Payment Failed.',
  [BookingStatus.HOST_REJECTED]: 'Rejected By You.',
  [BookingStatus.GUEST_REJECTED]: 'Rejected By Guest Before Approval.',
  [BookingStatus.GUEST_CANCEL_INITIATED]: 'Pending.',
  [BookingStatus.GUEST_CANCELLED]: 'Guest has cancelled their booking.',
  [BookingStatus.REFUND_INITIATED]: 'Cancellation Pending.',
  [BookingStatus.REFUNDED]: 'Booking has been cancelled and refunded.',
  [BookingStatus.HOST_CANCELLED]: 'Booking has been cancelled and refunded.',
  [BookingStatus.HOST_PAID]: '?? host_paid',
  [BookingStatus.COMPLETED]: 'Payment Completed',
  [BookingStatus.ERROR]: 'An error has occured, please contact support.',
}

export const DisplayHostBookingStatusCrypto = {
  [BookingStatus.GUEST_CONFIRMED]: 'Awaiting your approval.',
  [BookingStatus.HOST_APPROVED]: 'Pending transaction confirmation.',
  [BookingStatus.GUEST_PAID]: 'Approved.',
  [BookingStatus.PAYMENT_FAILED]: '?? payment_failed',
  [BookingStatus.HOST_REJECTED]: 'Rejected By You.',
  [BookingStatus.GUEST_REJECTED]: 'Rejected By Guest Before Approval.',
  [BookingStatus.GUEST_CANCEL_INITIATED]: 'Pending.',
  [BookingStatus.GUEST_CANCELLED]: 'Guest has cancelled their booking.',
  [BookingStatus.REFUND_INITIATED]: 'Cancellation Pending.',
  [BookingStatus.REFUNDED]: 'Booking has been cancelled and refunded.',
  [BookingStatus.HOST_CANCELLED]: 'Booking has been cancelled and refunded.',
  [BookingStatus.HOST_PAID]: 'Payment Pending.',
  [BookingStatus.COMPLETED]: 'Payment Completed',
  [BookingStatus.ERROR]: 'An error has occured, please contact support.',
}

export function getDisplayHostBookingStatus(hostBookingStatus: BookingStatus, currency: Currency | null): string {
  if (currency && currency === Currency.USD) {
    return hostBookingStatus ? DisplayHostBookingStatusFiat[hostBookingStatus] : DisplayHostBookingStatusFiat[BookingStatus.ERROR];
  }
  return hostBookingStatus ? DisplayHostBookingStatusCrypto[hostBookingStatus] : DisplayHostBookingStatusCrypto[BookingStatus.ERROR];
}

export function getUserBookingDisplayStatus(status: BookingStatus | string): UserBookingDisplayStatus {
  return bookingStatus[status] || 'error';
}

