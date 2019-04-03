import styled from 'styled-components';
import { color, typography } from 'styled/utils';

const AdminBookingStatusContainer = styled.div`
  width: 140px;

  .admin-booking-status-options-container {
    align-items: center;
    display: flex;
    height: 100%;
    justify-content: space-between;
    padding: 0 18px;
    width: 100%;
  }

  .admin-booking-status--approved-by,
  .admin-booking-status--rejected-by,
  .admin-booking-status--cancelled-by {
    text-align: center;
    h4 {
      ${typography('light', 7)}
      text-transform: capitalize;
    }
    span {
      ${typography('welter', 6)}
      color: ${color('body')};
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      width: 140px;
    }
  }
  .admin-booking-status--rejected-by {
    h4 {
      color: ${color('error')};
    }
  }
  .admin-booking-status--cancelled-by {
    h4 {
      color: ${color('top')};
    }
  }
  .admin-booking-status--approved-by {
    h4 {
      color: ${color('secondary')};
    }
  }
  .admin-booking-status--rejected-by,
  .admin-booking-status--cancelled-by {
    align-items: center;
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: center;
    width: 100%;
  }
  .admin-booking-status--approved-by {
    align-items: center;
    display: flex;
    height: 100%;
    justify-content: space-between;
    width: 100%;
    .admin-booking-status--meta {
      align-items: center;
      display: flex;
      flex-direction: column;
      flex-shrink: 0;
      height: 40px;
      justify-content: center;
      width: 100px;
    }
  }
`;

export default AdminBookingStatusContainer;
