import {
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  type DependencyList,
  type HTMLAttributes,
  type MutableRefObject,
} from "react";
import {
  reactGlass,
  type ReactGlassInstance,
  type ReactGlassOptions,
} from "./reactGlass";

function destroyInstance(instance: any) {
  if (!instance) return;
  if (Array.isArray(instance)) {
    instance.forEach((item) => destroyInstance(item));
    return;
  }
  if (typeof instance.destroy === "function") {
    instance.destroy();
  }
}

export function useReactGlass(
  options: Partial<ReactGlassOptions> = {},
  deps: DependencyList = []
) {
  const targetRef = useRef<HTMLElement | null>(null);
  const effectDeps = deps.length ? deps : [options];

  useEffect(() => {
    const el = targetRef.current;
    if (!el) return;

    const instance = reactGlass({
      ...options,
      target: el,
    }) as ReactGlassInstance;

    return () => {
      destroyInstance(instance);
    };
  }, effectDeps);

  return targetRef;
}

export interface ReactGlassProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "ref"> {
  options?: Partial<ReactGlassOptions>;
  deps?: DependencyList;
}

export const ReactGlass = forwardRef<HTMLDivElement, ReactGlassProps>(
  ({ options = {}, deps = [], children, ...rest }, forwardedRef) => {
    const innerRef = useReactGlass(options, deps);

    const composedRef = useCallback(
      (node: HTMLDivElement | null) => {
        innerRef.current = node;
        if (typeof forwardedRef === "function") {
          forwardedRef(node);
        } else if (forwardedRef) {
          (forwardedRef as MutableRefObject<HTMLDivElement | null>).current =
            node;
        }
      },
      [forwardedRef, innerRef]
    );

    return (
      <div ref={composedRef} {...rest}>
        {children}
      </div>
    );
  }
);

ReactGlass.displayName = "ReactGlass";
