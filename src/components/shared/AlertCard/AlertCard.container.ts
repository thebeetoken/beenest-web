import styled from "styled-components";
import { color } from "styled/color";
import { typography } from "styled/utils";

type CardContainerProps = Partial<{
  srcColor: string;
}>;

const AlertCardContainerMobile = styled.div`
  display: flex;
  flex-direction: column;


  .alert-card--header {
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
  button {
    align-self: flex-end;
    margin-top: 40px;
    width: auto;
  }
`;

const AlertCardContainerTablet = styled(AlertCardContainerMobile)`
  @media (min-width: 768px) {
    width: 620px;
    .bee-button {
      align-self: flex-end;
      width: 154px;
    }
  }
`;

/** @component */
export default AlertCardContainerTablet;
