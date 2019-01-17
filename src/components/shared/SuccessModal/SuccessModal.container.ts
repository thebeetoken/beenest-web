import styled from "styled-components";
import { color } from "styled/color";
import { typography } from "styled/utils";

const SuccessModalContainerMobile = styled.div`
  .bee-modal {
    display: flex;
    flex-direction: column;
    padding: 32px 32px 30px 24px;
    height: 100%;
    width: 100%;
    .success-modal--header {
      display: flex;
      flex-direction: row;
      margin-bottom: 8px;
      height: 24px;
      width: 100%;
      .bee-svg {
        color: ${color('secondary')};
        height: 24px;
        width: 24px;
      }
      span {
        ${typography('title', 5)}
        color: ${color('core')};
        margin-left: 8px;
      }
    }
    .success-modal--content {
      margin-left: 32px;
      p {
        ${typography('read', 1)}
        color: ${color('body')};
      }
    }
    .bee-button {
      margin-top: 40px;
    }
  }
`;

const SuccessModalContainerTablet = styled(SuccessModalContainerMobile)`
  @media (min-width: 768px) {
    width: 620px;
    .bee-button {
      align-self: flex-end;
      width: 154px;
    }
  }
`;

/** @component */
export default SuccessModalContainerTablet;
