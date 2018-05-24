import * as React from 'react';

export type ObservableView<T> = (props: { value: T; update: (value: T) => Promise<void> }) => React.ReactNode;

export class Observable<T> extends React.Component<{ view: ObservableView<T>; initial: T }, { value: T }, {}> {
  public state = { value: this.props.initial };
  public render() {
    const { view } = this.props;
    const { value } = this.state;
    const update = this.update;
    return view({ update, value });
  }
  private update = (value: T): Promise<void> => new Promise(resolve => this.setState({ value }, resolve));
}
