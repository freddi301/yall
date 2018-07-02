import * as _ from 'lodash';
import * as React from 'react';
import { IdeContext } from '../../Ide/Ide';

const download = ({ text, name, type }: { text: string; name: string; type: string }) => {
  const a = document.createElement('a');
  const file = new Blob([text], { type });
  a.href = URL.createObjectURL(file);
  a.download = name;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};

export const Export = () => (
  <IdeContext.Consumer>
    {({ state: { selected, ast } }) => {
      const selectedAst = _.get(ast, selected, ast);
      const serialized = JSON.stringify(selectedAst, null, 2);
      return <button onClick={() => download({ text: serialized, name: 'snippet.yall.json', type: 'text/json' })}>export</button>;
    }}
  </IdeContext.Consumer>
);
