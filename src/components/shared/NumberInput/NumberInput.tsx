import * as React from 'react';

import NumberInputContainer from './NumberInput.container';
import Fab from 'components/shared/Fab';

interface Props {
  value: number;
  max: number;
  min: number;
  onChange: (value: number) => void;
  step: number;
}

interface State {
  value: number;
}

class NumberInput extends React.Component<Props, State> {
  static defaultProps: Props = {
    value: 0,
    max: Number.MAX_SAFE_INTEGER,
    min: 0,
    onChange: () => 0,
    step: 1,
  };

  readonly state = {
    value: this.props.value
  };

  render() {
    const { value } = this.state;
    const { max, min } = this.props;
    return (
      <NumberInputContainer className="bee-number-input">
        <Fab
          clear
          color="upper"
          disabled={value === min}
          height="24px"
          icon="utils/minus-circle-outline"
          iconColor="secondary"
          noPadding
          onClick={this.handleMinus}
          type="button"
          width="24px"
        />
        <span>{this.state.value}</span>
        <Fab
          clear
          color="upper"
          disabled={value === max}
          height="24px"
          icon="utils/add-circle-outline"
          iconColor="secondary"
          noPadding
          onClick={this.handlePlus}
          type="button"
          width="24px"
        />
      </NumberInputContainer>
    );
  }

  handlePlus = () => {
    const { max, step } = this.props;
    const { value } = this.state;
    const nextValue = value + step;
    if (max || max === 0 && nextValue <= max) {
      this.setState({
        value: nextValue
      }, this.handleChange);
    }
  };

  handleMinus = () => {
    const { min, step } = this.props;
    const { value } = this.state;
    const nextValue = value - step;
    if (min || min === 0 && nextValue >= min) {
      this.setState({
        value: nextValue
      }, this.handleChange);
    }
  }

  handleChange = () => {
    const { onChange } = this.props;
    onChange(this.state.value);
  }
}

/** @component */
export default NumberInput;
