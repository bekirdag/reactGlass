# reactGlass (TypeScript + React)

A React-friendly TypeScript glass WebGL shader. It exposes the same options with typed helpers plus a small React component and hook.

## Building

```bash
npm install
npm run build
```

Build output is emitted to `dist/` with ESM and type declarations.

## Demos

After building, open either of the static demo pages in `demos/` with a simple file server:

- `demos/component-demo.html` – uses the `ReactGlass` component with different presets.
- `demos/hook-demo.html` – shows `useReactGlass` in a grid of feature blocks.

## Usage

### Component

```tsx
import { ReactGlass } from "reactGlass";

export function HeroCard() {
  return (
    <ReactGlass
      className="glass-pane"
      options={{ refraction: 0.02, bevelDepth: 0.12, tilt: true }}
    >
      <h2>Liquid Glass</h2>
      <p>Bring refractive glass to any React element.</p>
    </ReactGlass>
  );
}
```

### Hook

```tsx
import { useReactGlass } from "reactGlass";

export function GlassBlock() {
  const ref = useReactGlass(
    { bevelWidth: 0.18, frost: 2, tilt: true },
    [] // optionally pass a dependency list to control re-initialisation
  );

  return (
    <div ref={ref} className="glass-block">
      <p>Hook-based usage for custom markup.</p>
    </div>
  );
}
```

> Tip: memoise your `options` object or pass a custom `deps` array to `useReactGlass` if you want to avoid re-initialising on every render.

### Direct API

You can also call the underlying function directly if you need fine-grained control:

```ts
import { reactGlass, registerDynamic, syncWith } from "reactGlass";

reactGlass({ target: ".glass", tilt: true, magnify: 1.1 });
registerDynamic(".animated-text");
syncWith();
```

All options mirror the original library (`target`, `snapshot`, `resolution`, `refraction`, `bevelDepth`, `bevelWidth`, `frost`, `shadow`, `specular`, `reveal`, `tilt`, `tiltFactor`, `magnify`, `on.init`).
