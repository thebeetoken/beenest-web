import styled from 'styled-components';
import { color, typography } from 'styled/utils';

const typographyMap: ValueMap = {
  'tiniest': typography('read', 4),
  'tiniest-e': typography('emp', 8),
  'tiny': typography('read', 3),
  'tiny-e': typography('emp', 7),
  'small': typography('read', 2),
  'small-e': typography('emp', 6),
  'medium': typography('read', 1),
  'medium-e': typography('emp', 5),
  'default': typography('read', 1),
};

const textPaddingMap: ValueMap = {
  'tiniest': '4px',
  'tiny': '8px',
  'small': '16px',
  'medium': '24px',
  'medium-large': '28px',
  'large': '32px',
  'default': '0',
};

const svgWidthMap: ValueMap = {
  tiny: '32px',
  small: '48px',
  medium: '64px',
  default: '24px',
};

const textAlignMap: ValueMap = {
  left: 'flex-start',
  center: 'center',
  right: 'flex-end',
  default: 'flex-start',
};

const textTransformMap: ValueMap = {
  capitalize: 'capitalize',
  lowercase: 'lowercase',
  uppercase: 'uppercase',
  default: 'none',
};

interface ValueMap {
  [key: string]: string;
}

interface Props {
  background?: string;
  end?: string;
  font?: string;
  hover?: string;
  noFlex?: boolean;
  noHover?: boolean;
  hoverOpacity?: number;
  prefixColor?: string;
  prefixSize?: string;
  start?: string;
  suffixColor?: string;
  suffixSize?: string;
  textAlign?: string;
  textColor?: string;
  textTransform?: string;
  transparent?: boolean;
}

const ListItemContainer = styled.div`
  align-items: center;
  background-color: ${({ background }: Props) => (background ? color(background) : 'transparent')};
  display: flex;
  min-width: 132px;
  transition: all 0.15s ease-in-out;
  width: 100%;
  &:hover {
    ${({ hover = 'light', hoverOpacity = 1, noHover = false, transparent = false }: Props) => {
      if (transparent) {
        return `
          background-color: transparent;
          cursor: pointer;
          opacity: 0.52;
        `;
      }
      if (noHover) {
        return `background-color: transparent;`;
      }

      return `
        background-color: ${color(hover, hoverOpacity)};
        cursor: pointer;
      `;
    }};
  }
  &:active {
    opacity: ${({ noHover }: Props) => noHover ? 1 : 0.8};
  }


  .bee-svg {
    align-items: center;
    display: flex;
    justify-content: center;
    width: 24px;
    svg {
      height: 24px;
      width: 24px;
    }
    &.prefix {
      color: ${({ prefixColor = 'body' }: Props) => color(prefixColor)};
      width: ${({ prefixSize = 'default' }: Props) => svgWidthMap[prefixSize]};
    }
    &.suffix {
      color: ${({ suffixColor = 'body' }: Props) => color(suffixColor)};
      width: ${({ suffixSize = 'default'}: Props) => svgWidthMap[suffixSize]};
    }
  }

  span {
    ${({ font }: Props) => typographyMap[font || 'default']};
    align-items: center;
    color: ${({ textColor = 'body' }: Props) => color(textColor)};
    display: flex;
    flex: ${({ noFlex }: Props) => noFlex ? '0 1 auto' : '1 0 auto'};
    justify-content: ${({ textAlign = 'default' }: Props) => textAlignMap[textAlign]};
    padding-left: ${({ start = 'default' }: Props) => textPaddingMap[start]};
    padding-right: ${({ end = 'default' }: Props) => textPaddingMap[end]};
    text-transform: ${({ textTransform = 'default' }: Props) => textTransformMap[textTransform]};
  }
`;

/** @component */
export default ListItemContainer;

