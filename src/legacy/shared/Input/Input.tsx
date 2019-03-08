import * as React from 'react';
import omit from 'lodash.omit';

import Svg from 'legacy/shared/Svg';
import InputContainer from './Input.container';

/**
 * The Input component is a input
 * field component that also uses
 * the Svg component
 *
 * @author kevin
 **/
interface Props {
  admin?: boolean;
  background?: string;
  box?: boolean;
  end?: string;
  error?: boolean;
  onValidity?: (value: string | number) => OnValidityOutput; // returns an object that gives access to error/success
  id: string;
  label?: string;
  labelColor?: string;
  labelSmall?: boolean;
  noBoxShadow?: boolean;
  placeholder?: string;
  placeholderColor?: string;
  placeholderOpacity?: number;
  prefix?: string;
  prefixColor?: string;
  prefixSize?: string;
  size?: string;
  start?: string;
  success?: boolean;
  suffix?: string;
  suffixColor?: string;
  suffixSize?: string;
  textAlign?: string;
  textColor?: string;
  textSize?: string;
  type: string;
  value?: string | number;
}

interface OnValidityOutput {
  error: boolean;
  success: boolean;
}

interface InputState {
  hasError: boolean | undefined;
  isFocused: boolean;
  isPristine: boolean;
  isSuccessful: boolean | undefined;
  value: string | number;
}

class Input extends React.Component<Props, InputState> {
  readonly state = {
    hasError: false,
    isFocused: false,
    isPristine: true,
    isSuccessful: false,
    value: this.props.value || '',
  };

  render() {
    const { id, label, placeholder, prefix, suffix, type } = this.props;
    const containerProps = omit({ ...this.props }, 'onValidity'); // prevents Unknown event handler property error
    return (
      <InputContainer className="bee-input" {...containerProps} {...this.state}>
        <div className="bee-input--wrapper">
          {!!prefix &&
            <div className="bee-input--svg-wrapper-prefix">
              <Svg className="bee-input--svg-prefix" src={prefix} />
            </div>
          }
          <div className="bee-input--content">
            <label className="bee-input--label" htmlFor={`bee-${id}`}>
            {!!label &&
              <span>
                {label}
              </span>
            }
            </label>
            <div className="bee-input--text">
              <input
                id={`bee-${id}`}
                placeholder={placeholder}
                type={type}
                onChange={this.handleInputOnChange}
                onFocus={this.handleInputFocus}
                onBlur={this.handleInputBlur}
                value={this.props.value || this.state.value} />
            </div>
          </div>
          {!!suffix &&
            <div className="bee-input--svg-wrapper-suffix">
              <Svg className="bee-input--svg-suffix" src={suffix} />
            </div>
          }
        </div>
      </InputContainer>
    );
  }

  handleInputFocus = (): void => this.setState({ isFocused: !this.state.isFocused });
  handleInputBlur = (): void => {
    this.setState({ isFocused: !this.state.isFocused, isPristine: false });
  }

  handleInputOnChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = event.currentTarget;
    const { onValidity } = this.props;
    if (onValidity) {
      const { error, success } = onValidity(value);
      this.setState({ value, isSuccessful: success, hasError: error, isPristine: false });
    }
  }
}

/** @component */
export default Input;
