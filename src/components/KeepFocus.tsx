import * as React from 'react';

export class KeepFocus extends React.Component<{}, {}> {
  public render() {
    return (
      <div tabIndex={0} ref={this.setElement}>
        {this.props.children}
      </div>
    );
  }
  public componentDidUpdate() {
    if (!this.element.contains(document.activeElement)) {
      this.element.focus();
    }
  }
  private element: HTMLDivElement;
  private setElement = (element: HTMLDivElement) => (this.element = element);
}
