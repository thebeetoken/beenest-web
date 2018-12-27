import styled from 'styled-components';

const GoogleAutoCompleteContainer = styled.div`
  animation: fade-in 0.2s ease-in-out forwards;
  @keyframes fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

export default GoogleAutoCompleteContainer;
