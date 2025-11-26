import { type DependencyList, type HTMLAttributes, type MutableRefObject } from "react";
import { type ReactGlassOptions } from "./reactGlass.js";
export declare function useReactGlass(options?: Partial<ReactGlassOptions>, deps?: DependencyList): MutableRefObject<HTMLElement>;
export interface ReactGlassProps extends Omit<HTMLAttributes<HTMLDivElement>, "ref"> {
    options?: Partial<ReactGlassOptions>;
    deps?: DependencyList;
}
export declare const ReactGlass: import("react").ForwardRefExoticComponent<ReactGlassProps & import("react").RefAttributes<HTMLDivElement>>;
