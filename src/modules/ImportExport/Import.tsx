import * as _ from 'lodash';
import * as React from 'react';
import { IdeContext } from '../../Ide/Ide';

const fileInput = (): Promise<string> => {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'application/json';
  const done: Promise<string> = new Promise(resolve =>
    input.addEventListener('change', event => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.readAsText(_.get(event, 'target.files')[0]);
    })
  );
  document.body.appendChild(input);
  input.click();
  return done;
};

export const Import = () => (
  <IdeContext.Consumer>
    {({ state: { selected }, dispatch, actions: { replace } }) => {
      const onClick = async () => {
        const ast = JSON.parse(await fileInput());
        dispatch([replace({ path: selected, ast })]);
      };
      return <button onClick={onClick}>import</button>;
    }}
  </IdeContext.Consumer>
);
