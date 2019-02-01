import styled from 'styled-components';

interface Props {
  count?: number;
}

const ImageGridContainerMobile = styled.div`
  height: 100%;
  position: relative;
  width: 100%;
  img {
    display: none;
    height: 100%;
    position: absolute;
  }
  img:nth-of-type(1) {
    display: block;
    left: 0;
    width: 100%;
  }
`;

const ImageGridContainerTablet = styled(ImageGridContainerMobile)`
  @media (min-width: 768px) {
    img:nth-of-type(1) {
      left: 0;
      width: ${({ count }: Props) => (!count || count < 2) ? '100%' : '50%'};;
    }
    img:nth-of-type(2) {
      display: block;
      height: ${({ count }: Props) => (!count || count < 3) ? '100%' : '50%'};
      left: 50%;
      top: 0;
      width: 50%;
    }
    img:nth-of-type(3) {
      display: block;
      height: 50%;
      left: 50%;
      top: 50%;
      width: 50%;
    }
  }
`;

const ImageGridContainer = styled(ImageGridContainerTablet)`
  @media (min-width: 1025px) {
    ${({ count }: Props) => (!count || count < 4) ? '' : `
      img:nth-of-type(2) {
        width: 25%;
      }
    `}
    ${({ count }: Props) => (!count || count < 5) ? '' : `
      img:nth-of-type(3) {
        width: 25%;
      }
    `}
    img:nth-of-type(4) {
      display: block;
      height: 50%;
      left: 75%;
      top: 0;
      width: 25%;
    }
    img:nth-of-type(5) {
      display: block;
      height: 50%;
      left: 75%;
      top: 50%;
      width: 25%;
    }
`;

/** @component */
export default ImageGridContainer;
