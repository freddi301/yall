import * as React from 'react';

export type ObservableView<T> = React.ComponentType<{ value: T; update: (value: T) => Promise<void> }>;

export class Observable<T> extends React.Component<{ view: ObservableView<T>; initial: T }, { value: T }, {}> {
  public state = { value: this.props.initial };
  public render() {
    const { view: View } = this.props;
    const { value } = this.state;
    const update = this.update;
    return <View update={update} value={value} />;
  }
  private update = (value: T): Promise<void> => new Promise(resolve => this.setState({ value }, resolve));
}
