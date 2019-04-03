import React from 'react'
import Input from 'components/Input';

interface Props {
  admin?: boolean;
  background?: string;
  box?: boolean;
  end?: string;
  error?: boolean;
  onValidity?: (value: string | number) => onValidityOutput; // returns an object that gives access to error/success
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

interface onValidityOutput {
  error: boolean;
  success: boolean;
}

const AdminInput = (props: Props) => (
  <Input {...props} admin />
);

export default AdminInput;
