import styled from 'styled-components';
import { color, typography } from 'styled/utils';

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

type Props = Partial<{
  small: boolean;
  textColor: string;
  font: string;
}>;

const InputLabelContainer = styled.label`
  ${({ small }: Props) => small ? typography('emp', 8) : typography('emp', 7)};
  align-items: center;
  color: ${({ textColor }: Props) => color(textColor || 'core')};
  display: flex;
  height: 16px;
  ${({ font }: Props) => typographyMap[font || 'default']};
  span {
    ${typography('light', 7)}
    color: ${color('top')};
    margin-left: 8px;
  }
`;

/** @component */
export default InputLabelContainer;
