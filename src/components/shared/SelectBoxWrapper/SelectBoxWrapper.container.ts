import styled from 'styled-components';
import { base, color, typography } from 'styled/utils';

type Props = Partial<{
  background: string;
  box: boolean;
  end: string;
  font: string;
  mobile: boolean;
  noFlex: boolean;
  placeholderColor: string;
  prefixColor: string;
  prefixSize: string;
  start: string;
  suffixColor: string;
  suffixSize: string;
  textAlign: string;
  textColor: string;
  textTransform: string;
}>;

interface ValueMap {
  [key: string]: string;
}

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

const textAlignMap: ValueMap = {
  left: 'flex-start',
  center: 'center',
  right: 'flex-end',
  default: 'flex-start',
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

const textTransformMap: ValueMap = {
  capitalize: 'capitalize',
  lowercase: 'lowercase',
  uppercase: 'uppercase',
  default: 'none',
};

const svgWidthMap: ValueMap = {
  tiny: '32px',
  small: '48px',
  medium: '64px',
  default: '24px',
};

const SelectBoxWrapperContainer = styled.div`
  align-items: center;
  background-color: ${({ background }: Props) => (background ? color(background) : 'transparent')};
  display: flex;
  height: ${({ mobile }: Props) => mobile ? '48px' : '40px'};
  position: relative;


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
      width: ${({ box, prefixSize = 'default' }: Props) => box ? svgWidthMap['tiny'] : svgWidthMap[prefixSize]};
    }
    &.suffix {
      color: ${({ suffixColor = 'body' }: Props) => color(suffixColor)};
      position: absolute;
      right: 0%;
      top: 50%;
      transform: translate3d(0, -50%, 0);
      width: ${({ box, suffixSize = 'default'}: Props) => box ? svgWidthMap['tiny'] : svgWidthMap[suffixSize]};
    }
  }


  select {
    ${({ font }: Props) => typographyMap[font || 'default']};
    align-items: center;
    background-color: transparent;
    border: 0;
    border-radius: 0;
    ${({ box }: Props) => {
      const type = box ? 'border' : 'border-bottom';
      return `${type}: 2px solid ${color('style')};`; 
    }};
    color: ${({ textColor }: Props) => color(textColor || 'body')};
    display: flex;
    flex: ${({ noFlex }: Props) => noFlex ? '0 1 auto' : '1 0 auto'};
    font-family: ${base['font-family']};
    justify-content: ${({ textAlign = 'default' }: Props) => textAlignMap[textAlign]};
    height: 100%;
    outline: none;
    padding: 0;
    padding-left: ${({ box, start = 'default' }: Props) => box ? textPaddingMap['small'] : textPaddingMap[start]};
    padding-right: ${({ box, end = 'default' }: Props) => box ? textPaddingMap['small'] : textPaddingMap[end]};
    text-transform: ${({ textTransform = 'default' }: Props) => textTransformMap[textTransform]};
    transition: all 0.2s ease-in-out;
    z-index: 1;
    -webkit-appearance: none;
    -moz-appearance: none;
    -ms-appearance: none;
    &:disabled {
      opacity: 0.5;
    }
    &:focus {
      ${({ box }: Props) => {
        const type = box ? 'border' : 'border-bottom';
        return `${type}: 2px solid ${color('secondary')};`; 
      }};
    }
    &:-moz-focusring { /** Remove dotted border/outline onClick from firefox */
      color: transparent;
      text-shadow: 0 0 0 #000;
    }
  }
`;

export default SelectBoxWrapperContainer;
