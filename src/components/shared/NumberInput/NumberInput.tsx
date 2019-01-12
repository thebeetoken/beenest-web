import * as React from 'react';

import NumberInputContainer from './NumberInput.container';
import Fab from 'components/shared/Fab';

/**
 * This component is a
 * Number Input.
 *
 * @author jeremy
 *
 * Created: January 11, 2019
 **/

interface Props {
  value: number;
  max: number;
  min: number;
  onChange: (value: number) => void;
  step: number;

  end?: string;
  font?: string;
  prefixColor?: string;
  start?: string;
  suffixColor?: string;
  textColor?: string;
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
    const { max, min, prefixColor, suffixColor } = this.props;
    const containerProps = {
      ...this.props,
      onChange: undefined // prevents Container typescript error
    };
    return (
      <NumberInputContainer className="bee-number-input" {...containerProps}>
        <Fab
          clear
          disabled={value === min}
          height="24px"
          icon="utils/minus-circle-outline"
          iconColor={prefixColor || 'secondary'}
          noPadding
          onClick={this.handleMinus}
          type="button"
          width="24px"
        />
        <span>{this.state.value}</span>
        <Fab
          clear
          disabled={value === max}
          height="24px"
          icon="utils/add-circle-outline"
          iconColor={suffixColor || 'secondary'}
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
