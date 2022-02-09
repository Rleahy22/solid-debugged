import { StoreNode } from 'solid-js/store';

type State = {
  $$Store?: StoreNode;
};

let store: State = {};

export const initStore = async () => {
  // @ts-ignore
  return chrome.devtools.inspectedWindow.eval('window.SOLID_DEBUG', (solidDebug: State) => {
    console.log('APP:', solidDebug);
    store = { ...store, ...solidDebug };
  });
};

export default store;
