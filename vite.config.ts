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

// Deployment stamp rendered in the footer so any environment can be validated
// against the build it is actually serving.
const env = process.env;
const buildVersion = env["BUILD_VERSION"] ?? env["npm_package_version"] ?? "0.0.0";
const buildCommit = (
  env["BUILD_COMMIT"] ??
  env["GITHUB_SHA"] ??
  env["CF_PAGES_COMMIT_SHA"] ??
  env["VERCEL_GIT_COMMIT_SHA"] ??
  "local"
).slice(0, 7);
const buildTime = new Date().toISOString();

export default defineConfig({
  ...(staticExport ? { nitro: false as const } : {}),
  vite: {
    define: {
      __BUILD_VERSION__: JSON.stringify(buildVersion),
      __BUILD_COMMIT__: JSON.stringify(buildCommit),
      __BUILD_TIME__: JSON.stringify(buildTime),
    },
  },
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
    ...(staticExport ? { prerender: { enabled: true, crawlLinks: true } } : {}),
  },
});
