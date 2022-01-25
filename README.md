# Solid Debugged

This plugin makes it easy to debug your [SolidJS](https://www.solidjs.com/) applications at runtime. It provides drop-in replacements for `createSignal` and `createStore` that allow you to easily see the current state of your application in the browser console.

It works by

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
showSolidState()
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
