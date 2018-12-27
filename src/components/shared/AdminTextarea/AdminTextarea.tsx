import * as React from 'react';
import Textarea from 'shared/Textarea';
import { TextareaEvent } from 'shared/Textarea/Textarea';

interface Props {
  admin?: boolean;
  background?: string;
  className?: string;
  html?: boolean;
  label?: string;
  labelColor?: string;
  labelSmall?: boolean;
  name?: string;
  noBoxShadow?: boolean;
  onChange: (event: TextareaEvent) => void;
  placeholder?: string;
  placeholderColor?: string;
  placeholderOpacity?: number;
  textAlign?: string;
  textareaHeight?: string;
  textColor?: string;
  textSize?: string;
  value?: string;
}

const AdminTextarea = (props: Props) => (
  <Textarea {...props} admin />
);

/** @component */
export default AdminTextarea;
