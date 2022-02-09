# Solid Debugged

This plugin makes it easy to debug your [SolidJS](https://www.solidjs.com/) applications at runtime. It provides drop-in replacements for `createMemo`, `createResource`, `createSignal`, and `createStore` that allow you to easily see the current state of your application in the browser console.

It works by storing resource, signal, and store values on a window property that can get picked up by a function included in this library or extended by other tools/apps for further functionality. In a production build both functions fall back to their respective functions exported by SolidJS.

## Getting started

```bash
npm install solid-debugged -S
```

```tsx
import {
  createMemoWithDebug as createMemo,
  createResourceWithDebug as createResource,
  createSignalWithDebug as createSignal,
  createStoreWithDebug as createStore,
} from 'solid-debugged';
import { getUserById } from './api';

const store = createStore({ user: { id: 1 } }, { name: 'App' });

const Component = () => {
  const [count, setCount] = createSignal(0, { name: 'count' });
  const [user] = createResourceWithDebug('1', getUserById, {
    name: 'user',
  });

  const countXTen = createMemo(() => count * 10, undefined, { name: 'countXTen' });

  // call showSolidState to do inline debugging
  window.showSolidState?.();

  return (
    <div>
      Count: {count()}
      Count x 10: {countXTen()}
      <button onClick={() => setCount(count() + 1)}>Increment count</button>
      {user.loading ? 'Loading...' : `Username: ${user.username}`}
    </div>
  );
};
```

Then in the console

```javascript
showSolidState();
=>
  {
    $$Store: {
      App: {
        user: {
          id: 1,
        }
      }
    },
    Component: {
      count: 0,
      countXTen: 0,
      $$Resources: {
        user: {
          username: 'SolidUser',
        }
      }
    },
  }
```
