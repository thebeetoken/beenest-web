import styled from 'styled-components';
import { color, cover, typography } from 'styled/utils';

const BACKGROUND_COLORS = ['light', 'mid', 'dark'];
const LAYOUT_OPTIONS = ['top', 'bottom'];

type Props = Partial<{
  autoHideDuration: number;
  layout: string;
  textColor: string;
  variant: string;
}>;

const SnackbarContainerMobile = styled.div`
  ${({ layout }: Props) => `${LAYOUT_OPTIONS.includes(layout || '') ? layout : 'bottom'}: 10.14vh`};
  align-items: center;
  animation: ${({ autoHideDuration }: Props) => {
    return `slide-in 0.8s ease-in-out forwards, slide-out 0.5s ease-in-out ${(autoHideDuration || 3000) - 1000}ms forwards;`
  }};
  background-color: ${({ variant }: Props) => color(`${BACKGROUND_COLORS.includes(variant || '') ? variant : 'light'}`)};
  box-shadow: 0 4px 15px ${color('black', 0.2)};
  display: flex;
  left: 50%;
  min-height: 80px;
  padding: 16px 32px;
  position: fixed;
  transform: ${({ layout }: Props) => {
    return layout === 'bottom' 
      ? 'translate3d(-50%, calc(10.14vh + 200%), 0)'
      : 'translate3d(-50%, calc(-10.14vh - 200%), 0)';
  }};
  transition: all 0.35s ease-in-out;
  width: calc(100% - 48px);
  z-index: 100;
  &:before {
    ${cover(true)}
    border: ${({ variant }: Props) => {
      return variant ? 'none' : `1px solid ${color('secondary')}`;
    }};
  }


  p {
    ${typography('read', 3)}
    align-items: center;
    color: ${({ textColor }: Props) => color(textColor || 'secondary')};
    display: flex;
    height: 100%;
    justify-content: center;
    width: 100%;
  }


  .bee-snackbar-svg {
    align-items: center;
    display: flex;
    height: 40px;
    justify-content: center;
    position: absolute;
    right: 0;
    top: 0;
    transition: opacity 0.15s ease-in-out;
    width: 40px;
    &:active {
      opacity: ${({ variant }: Props) => {
        return variant === 'dark' ? '0.5' : '0.9';
      }};
    }
    .bee-svg {
      color: ${color('up')};
      height: 24px;
      width: 24px;
    }
  }


  @keyframes slide-in {
    from {
      transform: ${({ layout }: Props) => {
        return layout === 'top' 
          ? 'translate3d(-50%, calc(-10.14vh - 200%), 0)'
          : 'translate3d(-50%, calc(10.14vh + 200%), 0)';
      }};
    }
    to {
      transform: translate3d(-50%, 0, 0);
    }
  }

  @keyframes slide-out {
    from {
      transform: translate3d(-50%, 0, 0);
    }
    to {
      transform: ${({ layout }: Props) => {
        return layout === 'top' 
          ? 'translate3d(-50%, calc(-10.14vh - 200%), 0)'
          : 'translate3d(-50%, calc(10.14vh + 200%), 0)';
      }};
    }
  }

`;

const SnackbarContainerTablet = styled(SnackbarContainerMobile)`
  @media (min-width: 768px) {
    width: 400px;


    p {
      ${typography('read', 2)}
    }
  }
`;

const SnackbarContainer = styled(SnackbarContainerTablet)`
  @media (min-width: 1025px) {
    .bee-snackbar-svg {
      &:hover {
        cursor: pointer;
        opacity: ${({ variant }: Props) => {
          return variant === 'dark' ? '0.9' : '0.5';
        }};
      }
    }
  }
`;

export default SnackbarContainer;
