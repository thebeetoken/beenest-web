import styled from "styled-components";
import { color } from "styled/color";
import { typography } from "styled/utils";

type CardContainerProps = Partial<{
  srcColor: string;
}>;

const AlertCardContainerMobile = styled.div`
  animation: fade-in 0.5s ease-in-out forwards;
  

  .bee-card {
    align-items: center;
    display: flex;
    justify-content: center;
    .alert-card--content {
      align-items: flex-start;
      display: flex;
      flex-direction: column;
      .alert-card--title {
        display: flex;
        flex-direction: row;
        margin-bottom: 8px;
        height: 24px;
        width: 100%;
        .bee-svg {
          color: ${({ srcColor }: CardContainerProps) => color(srcColor || 'upper')};
          height: 24px;
          width: 24px;
        }
        h1 {
          ${typography('title', 5)}
          color: ${color('core')};
          margin-left: 8px;
        }
      }
      p {
        ${typography('read', 1)}
        color: ${color('body')};
        margin-left: 32px;
      }
      .bee-button {
        align-self: flex-end;
        margin-top: 40px;
        width: 100%;
      }
    }
  }


  @keyframes fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const AlertCardContainerTablet = styled(AlertCardContainerMobile)`
  @media (min-width: 768px) {
    .bee-card {
      height: 208px;
      padding: 32px 32px 30px 24px;
      width: 620px;
      .alert-card--content {
        width: 100%;
        .bee-button {
          align-self: flex-end;
          width: 154px;
        }
      }
    }
  }
`;

/** @component */
export default AlertCardContainerTablet;
