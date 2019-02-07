import * as React from 'react';

import TextareaContainer from './Textarea.container';
import { Editor, EditorState, convertFromHTML, ContentState } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';

/**
 * The Textarea component is a Textarea
 * field component
 *
 * @author kevin
 **/
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
  onBlur?: () => void;
  onChange: (event: TextareaEvent) => void;
  onFocus?: () => void;
  placeholder?: string;
  placeholderColor?: string;
  placeholderOpacity?: number;
  textAlign?: string;
  textareaHeight?: string;
  textColor?: string;
  textSize?: string;
  value?: string;
}

export interface TextareaEvent {
  target: {
    name: string;
    value: string;
  }
}

interface TextareaState {
  editorState: EditorState;
  isFocused: boolean;
  isPristine: boolean;
  value: string | number;
}

function createEditorState(string: string): EditorState {
  if (/<[a-z][\s\S]*>/i.test(string)) { // tests if there is html: https://stackoverflow.com/questions/15458876/check-if-a-string-is-html-or-not
    const blocksFromHTML = convertFromHTML(string);
    if (!blocksFromHTML.contentBlocks) {
      const contentState = ContentState.createFromText('');
      return EditorState.createWithContent(contentState);
    }
    const contentState = ContentState.createFromBlockArray(
      blocksFromHTML.contentBlocks,
      blocksFromHTML.entityMap
    );
    return EditorState.createWithContent(contentState);
  }

  const contentState = ContentState.createFromText(string);
  return EditorState.createWithContent(contentState);
}

class Textarea extends React.Component<Props, TextareaState> {
  readonly state = {
    editorState: createEditorState(this.props.value || ''),
    isFocused: false,
    isPristine: true,
    value: this.props.value || '',
  };

  render() {
    const { label, placeholder }: Props = this.props;
    const containerProps = {
        ...this.props,
        onChange: undefined // prevents TextareaContainer typescript error
    };
    return (
      <TextareaContainer className="bee-textarea" {...containerProps} {...this.state}>
        <div className="bee-textarea--wrapper">
          <div className="bee-textarea--content">
            <label className="bee-textarea--label">
              {!!label && <span>{label}</span>}
            </label>
            <div className="bee-textarea--text">
              <Editor
                editorState={this.state.editorState}
                placeholder={placeholder}
                onChange={this.handleTextareaOnChange}
                onFocus={this.handleTextareaFocus}
                onBlur={this.handleTextareaBlur} />
            </div>
          </div>
        </div>
      </TextareaContainer>
    );
  }

  handleTextareaBlur = (): void => {
    this.props.onBlur && this.props.onBlur();
    this.setState({ isFocused: !this.state.isFocused });
  }

  handleTextareaFocus = (): void => {
    this.setState({ isFocused: !this.state.isFocused });
  };

  handleTextareaOnChange = (editorState: EditorState): void => {
    const { onChange, name, html } = this.props;
    const contentState = editorState.getCurrentContent();
    const plainText = contentState.getPlainText();
    const outputString = html && contentState.hasText() ? stateToHTML(contentState) : plainText; // hasText() prevents initial <p><br></p>
    if (!this.state.isPristine || plainText) {
      onChange({
        target: {
          value: outputString,
          name: name || ''
        }
      });
      this.setState({ editorState, value: outputString, isPristine: false });
    }
    else this.setState({ editorState });
  }
}

/** @component */
export default Textarea;
