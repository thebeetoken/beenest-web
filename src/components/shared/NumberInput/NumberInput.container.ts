import styled from 'styled-components';
import { color, typography } from 'styled/utils';

interface ValueMap {
  [key: string]: string;
}

interface Props {
  font?: string;
  textColor?: string;
  end?: string;
  start?: string;
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

const textPaddingMap: ValueMap = {
  'tiniest': '4px',
  'tiny': '8px',
  'small': '16px',
  'medium': '24px',
  'medium-large': '28px',
  'large': '32px',
  'default': '0',
};

const NumberInputContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 32px;
  min-width: 120px;
  width: 120px;

  span {
    ${({ font }: Props) => typographyMap[font || 'default']};
    align-items: center;
    color: ${({ textColor = 'body' }: Props) => color(textColor)};
    display: flex;
    padding-left: ${({ start = 'default' }: Props) => textPaddingMap[start]};
    padding-right: ${({ end = 'default' }: Props) => textPaddingMap[end]};
  }
`

export default NumberInputContainer;