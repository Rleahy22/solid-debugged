import { render } from 'solid-js/web';

import App from './App';
import { initStore } from './store';

const root = document.getElementById('app');

if (root) {
  initStore().then(() => {
    render(() => <App />, root);
  });
}
