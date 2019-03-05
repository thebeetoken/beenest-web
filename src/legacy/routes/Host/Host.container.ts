import styled from 'styled-components';
import { typography } from 'styled/utils';

const HostContainer = styled.div`
  header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 16px;
    width: 100%;
    h1 {
      ${typography('title', 3)}
      padding-left: 8px;
    }
  }

  
  .bee-divider {
    margin-bottom: 16px;
  }

  nav {
    margin-bottom: 56px;
    width: 480px;
  }


  .bee-general-wrapper {
    margin: 40px auto 0;
    padding-bottom: 124px;
  }
`

export default HostContainer;
