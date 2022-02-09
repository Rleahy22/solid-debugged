import { Resource } from 'solid-js';
import ReduceResources from './Resources';

const RenderArray = (props: { index: number; array: unknown[] }) => {
  const value = props.array[props.index];

  if (typeof value === 'object') {
    if (!Array.isArray(value) && value !== null) {
      return (
        <>
          {'{'}
          {Object.keys(value).map((key) => (
            <div style={{ 'padding-left': '1rem' }}>
              <span>{key}: </span>
              <RenderProp property={key} obj={value as Record<string, unknown>} />
            </div>
          ))}
          {'}'},
        </>
      );
    } else if (value !== null) {
      return (
        <>
          [
          {value.map((_, index) => (
            <div style={{ 'padding-left': '1rem' }}>
              <RenderArray index={index} array={value} />
            </div>
          ))}
          ],
        </>
      );
    }
  }

  return (
    <>
      <span>{typeof value === 'function' ? value() : value || 'undefined'},</span>
    </>
  );
};

const RenderProp = (props: {
  property: string;
  obj: Record<string, Resource<unknown> | unknown>;
}) => {
  const value = props.obj[props.property];

  if (props.property === '$$Resource') {
    <ReduceResources obj={props.obj as Record<string, Resource<unknown>>} />;
  }

  if (typeof value === 'object') {
    if (!Array.isArray(value) && value !== null) {
      return (
        <>
          {'{'}
          {Object.keys(value).map((key) => (
            <div style={{ 'padding-left': '1rem' }}>
              <span>{key}: </span>

              <RenderProp property={key} obj={value as Record<string, unknown>} />
            </div>
          ))}
          {'}'},
        </>
      );
    } else if (value !== null) {
      return (
        <>
          [
          {value.map((_, index) => (
            <div style={{ 'padding-left': '1rem' }}>
              <RenderArray index={index} array={value} />
            </div>
          ))}
          ],
        </>
      );
    }
  }

  return (
    <>
      <span>{typeof value === 'function' ? value() : value || 'undefined'},</span>
    </>
  );
};

export default RenderProp;
