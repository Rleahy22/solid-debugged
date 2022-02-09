import { Resource } from 'solid-js';

const ReduceResources = (props: { obj: Record<string, Resource<unknown>> }) => {
  return Object.keys(props.obj).map((key) => {
    const resource = props.obj[key];

    return (
      <div>
        <details>
          <summary>{key}</summary>
          <pre>
            <code>
              {{ loading: resource.loading, error: resource.error, [key]: resource() }.toString()}
            </code>
          </pre>
        </details>
      </div>
    );
  }, {});
};

export default ReduceResources;
