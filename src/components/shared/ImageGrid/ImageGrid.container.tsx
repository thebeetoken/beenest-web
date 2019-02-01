import styled from 'styled-components';

const ImageGridContainer = styled.div`
  height: 100%;
  position: relative;
  width: 100%;
  img {
    height: 100%;
    position: absolute;
  }
  img:nth-of-type(1) {
    left: 0
    width: 50%;
  }
  img:nth-of-type(2) {
    height: 50%;
    left: 50%;
    top: 0;
    width: 25%;
  }
  img:nth-of-type(3) {
    height: 50%;
    left: 75%;
    top: 0;
    width: 25%;
  }
  img:nth-of-type(4) {
    height: 50%;    
    left: 50%;
    top: 50%;
    width: 25%;
  }
  img:nth-of-type(5) {
    height: 50%;
    left: 75%;
    top: 50%;
    width: 25%;
  }  
`;

/** @component */
export default ImageGridContainer;
