import React from 'react';
import Props from 'prop-types';
import {
  CostsTable,
  CostsTableAmount,
  CostsTableDescription,
  CostsTableTotalAmount,
  CostsTableTotalDescription,
  CostsTableTotal,
  CostsTableRow,
  CostsTableItemized,
} from '../styles/costTableStyles';

interface CostTableProps {
  accentColor?: string;
  amount?: number;
  border?: string;
  cleaningFee: number;
  color: string;
  guestRate: number;
  name: string;
  transactionRate?: number;
}

class CostTable extends React.Component<CostTableProps> {
  static propTypes = {
    accentColor: Props.string,
    amount: Props.number,
    border: Props.string,
    cleaningFee: Props.number,
    color: Props.string,
    guestRate: Props.number,
    name: Props.string,
    transactionRate: Props.number,
  };

  static defaultProps = {
    transactionRate: 0,
    amount: 0,
    accentColor: undefined,
    border: undefined,
  };

  public calculateProfit = (): number => {
    const { amount, cleaningFee, guestRate, transactionRate } = this.props;
    return Math.round((amount + cleaningFee) * (1 + guestRate + transactionRate));
  };

  public render() {
    return (
      <CostsTable border={this.props.border}>
        <CostsTableItemized color={this.props.color}>
          <CostsTableRow>
            <CostsTableAmount>${this.props.amount}</CostsTableAmount>
            <CostsTableDescription>Price Per Night</CostsTableDescription>
          </CostsTableRow>
          <CostsTableRow>
            <CostsTableAmount>${this.props.cleaningFee}</CostsTableAmount>
            <CostsTableDescription>Cleaning Fee</CostsTableDescription>
          </CostsTableRow>
          <CostsTableRow color={this.props.accentColor || this.props.color}>
            <CostsTableAmount>{this.props.guestRate * 100}%</CostsTableAmount>
            <CostsTableDescription>*Guest Fee</CostsTableDescription>
          </CostsTableRow>
          <CostsTableRow color={this.props.accentColor || this.props.color}>
            <CostsTableAmount>{this.props.transactionRate * 100}%</CostsTableAmount>
            <CostsTableDescription>Transaction Fee</CostsTableDescription>
          </CostsTableRow>
        </CostsTableItemized>
        <CostsTableTotal>
          <CostsTableRow>
            <CostsTableTotalAmount>${this.calculateProfit()}</CostsTableTotalAmount>
            <CostsTableTotalDescription color={this.props.color}>
              Host Profit
            </CostsTableTotalDescription>
          </CostsTableRow>
        </CostsTableTotal>
      </CostsTable>
    );
  }
}

export default CostTable;
