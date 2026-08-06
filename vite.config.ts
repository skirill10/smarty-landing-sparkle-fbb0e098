// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// Static export mode: `STATIC_EXPORT=1 bun run build` prerenders the site to
// plain HTML in dist/client (index.html + assets) for upload to static hosting
// such as Hostinger public_html or GitHub Pages. Default builds stay unchanged.
const staticExport = process.env["STATIC_EXPORT"] === "1";

export default defineConfig({
  ...(staticExport ? { nitro: false as const } : {}),
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
    ...(staticExport ? { prerender: { enabled: true, crawlLinks: true } } : {}),
  },
});
