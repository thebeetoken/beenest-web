import styled from 'styled-components';

const TabNavBarContainerMobile = styled.nav`
  height: 64px;
  width: 100%;
  display: flex;
`;

const TabNavBarTablet = styled(TabNavBarContainerMobile)`
  @media (min-width: 768px) {
    height: 48px;
    width: auto;
    display: block;
  }
`;

export default TabNavBarTablet;
