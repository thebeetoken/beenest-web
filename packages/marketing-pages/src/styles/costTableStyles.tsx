import styled from 'styled-components';
import { mediaQuery } from './indexStyles';

interface CostsTableProps {
  border: string;
}

export const CostsTable = styled.div<CostsTableProps>`
  ${props => props.border};
`;

export const CostsTableItemized = styled.div`
  padding: 10px 0 0;
  margin: 0 20px;
  border-bottom: 2px solid ${props => props.color};

  ${mediaQuery} {
    margin: 0 3px;
  }
`;

export const CostsTableTotal = CostsTableItemized.extend`
  border: none;
  font-weight: bold;

  span {
    font-weight: inherit;
  }
`;

export const CostsTableRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 10px 0;
  color: ${props => props.color};
`;

export const CostsTableAmount = styled.span`
  font-size: 20px;
  color: inherit;
  font-weight: 100;
  max-width: 90px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  ${mediaQuery} {
    font-size: 14px;
  }
`;
export const CostsTableDescription = CostsTableAmount.extend`
  font-size: 16px;
  max-width: none;
`;

export const CostsTableTotalAmount = CostsTableAmount.extend`
  font-size: 24px;
`;

export const CostsTableTotalDescription = CostsTableDescription.extend`
  color: ${props => props.color};
`;
