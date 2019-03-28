import styled from "styled-components";

const PortalContainer = styled.div`
  align-items: center;
  animation: fade-in 0.5s ease-in-out forwards;
  display: flex;
  height: 100%;
  justify-content: center;
  left: 0;
  opacity: 0;
  position: fixed;
  top: 0;
  z-index: 101;
  width: 100%;


  .bee-portal--children {
    z-index: 100;
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

/** @component */
export default PortalContainer;