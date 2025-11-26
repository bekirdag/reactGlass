import { jsx as _jsx } from "react/jsx-runtime";
import { forwardRef, useCallback, useEffect, useRef, } from "react";
import { reactGlass, } from "./reactGlass.js";
function destroyInstance(instance) {
    if (!instance)
        return;
    if (Array.isArray(instance)) {
        instance.forEach((item) => destroyInstance(item));
        return;
    }
    if (typeof instance.destroy === "function") {
        instance.destroy();
    }
}
export function useReactGlass(options = {}, deps = []) {
    const targetRef = useRef(null);
    const effectDeps = deps.length ? deps : [options];
    useEffect(() => {
        const el = targetRef.current;
        if (!el)
            return;
        const instance = reactGlass({
            ...options,
            target: el,
        });
        return () => {
            destroyInstance(instance);
        };
    }, effectDeps);
    return targetRef;
}
export const ReactGlass = forwardRef(({ options = {}, deps = [], children, ...rest }, forwardedRef) => {
    const innerRef = useReactGlass(options, deps);
    const composedRef = useCallback((node) => {
        innerRef.current = node;
        if (typeof forwardedRef === "function") {
            forwardedRef(node);
        }
        else if (forwardedRef) {
            forwardedRef.current =
                node;
        }
    }, [forwardedRef, innerRef]);
    return (_jsx("div", { ref: composedRef, ...rest, children: children }));
});
ReactGlass.displayName = "ReactGlass";
//# sourceMappingURL=react.js.map