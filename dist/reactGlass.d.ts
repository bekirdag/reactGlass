export type ReactGlassTarget = string | Element | Element[] | NodeListOf<Element>;
export type ReactGlassRevealMode = "none" | "fade";
export interface ReactGlassCallbacks {
    init?: (instance: ReactGlassLens) => void;
}
export interface ReactGlassOptions {
    target: ReactGlassTarget;
    snapshot: string;
    resolution: number;
    refraction: number;
    bevelDepth: number;
    bevelWidth: number;
    frost: number;
    shadow: boolean;
    specular: boolean;
    reveal: ReactGlassRevealMode;
    tilt: boolean;
    tiltFactor: number;
    magnify: number;
    on?: ReactGlassCallbacks;
}
export interface ReactGlassSyncConfig {
    lenis?: any;
    locomotiveScroll?: any;
    gsap?: boolean;
}
export type ReactGlassInstance = ReactGlassLens | ReactGlassLens[] | Element | Element[] | undefined;
export declare class ReactGlassRenderer {
    constructor(snapshotSelector: any, snapshotResolution?: number);
    _initGL(): void;
    _resizeCanvas(): void;
    captureSnapshot(): Promise<boolean>;
    _uploadTexture(srcCanvas: any): void;
    addLens(element: any, options: any): ReactGlassLens;
    removeLens(lens: any): void;
    render(): void;
    _renderLens(lens: any): void;
    _createRoundedRectPath(ctx: any, w: any, h: any, radii: any): void;
    _updateDynamicVideos(): void;
    _updateDynamicNodes(): void;
    _parseTransform(transform: any): any;
    _getMaxLensZ(): number;
    addDynamicElement(el: any): void;
    _isIgnored(el: any): boolean;
}
export declare class ReactGlassLens {
    constructor(renderer: any, element: any, options: any);
    updateMetrics(): void;
    _handleOverscrollCompensation(): void;
    setTilt(enabled: any): void;
    setShadow(enabled: any): void;
    _reveal(): void;
    _bindTiltHandlers(): void;
    _unbindTiltHandlers(): void;
    _createMirrorCanvas(): void;
    _destroyMirrorCanvas(): void;
    dispose(): void;
    destroy(): void;
    _TriggerInit(): void;
}
export declare function reactGlass(userOptions?: Partial<ReactGlassOptions>): Element | Element[] | ReactGlassLens | ReactGlassLens[];
export declare function registerDynamic(elements: any): void;
export declare function syncWith(config?: ReactGlassSyncConfig): {
    lenis: any;
    locomotiveScroll: any;
};
