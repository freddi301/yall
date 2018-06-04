import * as React from 'react';
import styled from 'styled-components';

export const BlankInput = styled.input`
  -webkit-appearance: none;
  -moz-appearance: none;
  font: inherit;
  border: initial;
  padding: initial;
`;

export class Input extends React.Component<{ value: string; onChange?: (value: string) => void }, { text: string }> {
  public state = { text: this.props.value };
  private onChange = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => this.setState({ text: value });
  private onKeyPress = (e: React.KeyboardEvent<{}>) => {
    if (e.key === 'Enter' && this.props.onChange) {
      this.props.onChange(this.state.text);
      // this.input.blur(); // TODO: fix
    }
  };
  private input: HTMLInputElement;
  public componentDidMount() {
    // this.input.focus(); // TODO: fix
  }
  private setInputReference = (input: HTMLInputElement) => (this.input = input);
  public render() {
    const { text } = this.state;
    return (
      <BlankInput
        type="text"
        value={text}
        onChange={this.onChange}
        onKeyPress={this.onKeyPress}
        style={{ width: `${text.length}ch` }}
        innerRef={this.setInputReference}
      />
    );
  }
}
