import styled from 'styled-components';

type Props = Partial<{
  align: string;
  direction: string;
  justify: string;
  width: number | string;
}>

const LAYOUT_OPTIONS: ValueMap = {
  'flex-start': 'flex-start',
  'center': 'center',
  'flex-end': 'flex-end',
  'default': 'center',
}

const DIRECTION_OPTIONS: ValueMap = {
  'column': 'column',
  'column-reverse': 'column-reverse',
  'row': 'row',
  'row-reverse': 'row-reverse',
  'default': 'row',
}

interface ValueMap {
  [key: string]: string;
}

const GeneralWrapperContainer = styled.div`
  ${({ width }: Props) => {
    if (typeof width === 'string' && width.includes('%')) {
      return `
        width: ${width};
        min-width: ${width};
      `;
    }

    return `
      width: ${width || 976}px;
      min-width: ${width || 976}px;
    `;
  }};
  align-items: ${({ align = 'default' }: Props) => LAYOUT_OPTIONS[align]};
  display: flex;
  flex-direction: ${({ direction = 'default' }: Props) => DIRECTION_OPTIONS[direction]};
  justify-content: ${({ justify = 'default' }: Props) => LAYOUT_OPTIONS[justify]};
`;

export default GeneralWrapperContainer;