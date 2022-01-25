# Solid Debugged

This plugin makes it easy to debug your [SolidJS](https://www.solidjs.com/) applications at runtime. It provides drop-in replacements for `createSignal` and `createStore` that allow you to easily see the current state of your application in the browser console.

It works by storing signal and store values on a window property that can get picked up by a function included in this library or extended by other tools/apps for further functionality. In a production build both functions fall back to their respective functions exported by SolidJS.

## Getting started

```bash
npm install solid-debugged -S
```

```tsx
import {
  createSignalWithDebug as createSignal,
  createStoreWithDebug as createStore,
} from 'solid-debugged';

const store = createStore({ user: { id: 1 } }, { name: 'App' });

const Component = () => {
  const [count, setCount] = createSignal(0, { name: 'count' });

  return (
    <div>
      Count: {count()}
      <button onClick={() => setCount(count() + 1)}>Increment count</button>
    </div>
  );
};
```

Then in the console

```javascript
showSolidState();
=>
  {
    store: {
      App: {
        user: {
          id: 1
        }
      }
    },
    Component: {
      count: 0
    }
  }
```
