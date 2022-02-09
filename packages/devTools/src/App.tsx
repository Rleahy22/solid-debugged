import { createMemo, createSignal, onCleanup } from 'solid-js';
import { StoreNode } from 'solid-js/store';

import RenderProperty from './RenderProperty';

type State = {
  $$Store?: StoreNode;
};

const App = () => {
  const [state, setState] = createSignal({});
  const keys = createMemo(() => Object.keys(state()));

  const interval = setInterval(() => {
    // @ts-ignore
    chrome.devtools.inspectedWindow.eval('window.showSolidState()', (solidDebug: State) => {
      setState({ ...state, ...solidDebug });
    });
  }, 500);

  onCleanup(() => {
    clearInterval(interval);
  });

  return (
    <main>
      {keys().map((key) => (
        <div>
          {key}: <RenderProperty property={key} obj={state()} />
        </div>
      ))}
    </main>
  );
};

export default App;
