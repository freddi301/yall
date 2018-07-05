import * as React from "react";

export class ModuleItem extends React.Component<{ name: React.ReactNode }, { showDescription: boolean }> {
  public state = { showDescription: false };
  public render() {
    return (
      <div>
        <div>
          {this.props.name}
          &nbsp;
          <span style={{ cursor: "help" }} onClick={this.toggleDescription}>
            {this.state.showDescription ? "-" : "+"}
          </span>
        </div>
        {this.state.showDescription ? <div>{this.props.children}</div> : null}
      </div>
    );
  }
  private toggleDescription = () => this.setState(({ showDescription }) => ({ showDescription: !showDescription }));
  public static Error = ({ error }: { error: Error }) => <div style={{ color: "red" }}>{error.message}</div>;
}
