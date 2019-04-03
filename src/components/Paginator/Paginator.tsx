import * as React from 'react';

const LIMIT = 6;

export interface PaginatorRef {
  offset: number;
  next: (totalCount: number) => void;
  previous: (totalCount: number) => void;
}

interface PaginatorProps {
  children: ({ previous, next }: PaginatorRef) => React.ReactNode;
  limit?: number;
  offset?: number;
}

interface PaginatorState {
  offset: number;
  totalCount: number;
}

export class Paginator extends React.Component<PaginatorProps, PaginatorState> {
  public state: PaginatorState = {
    offset: 0,
    totalCount: 0,
  };

  render() {
    return React.Children.only(
      this.props.children({
        offset: this.state.offset,
        next: this.handleNext,
        previous: this.handlePrevious,
      })
    );
  }

  private handlePrevious = (totalCount: number) => {
    this.setState({
      offset: this.state.offset - (this.props.limit || LIMIT),
      totalCount,
    });
  }

  private handleNext = (totalCount: number) => {
    this.setState({
      offset: this.state.offset + (this.props.limit || LIMIT),
      totalCount,
    });
  }
}
