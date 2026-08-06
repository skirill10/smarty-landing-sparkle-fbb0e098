// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { execSync } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// Static export mode: `STATIC_EXPORT=1 bun run build` prerenders the site to
// plain HTML in dist/client (index.html + assets) for upload to static hosting
// such as Hostinger public_html or GitHub Pages. Default builds stay unchanged.
const staticExport = process.env["STATIC_EXPORT"] === "1";

// Deployment stamp rendered in the footer so any environment can be validated
// against the build it is actually serving. The version changes on EVERY build:
// base version + a monotonic build number (CI run number, else a UTC timestamp).
const env = process.env;
const buildTime = new Date();
const stamp = buildTime.toISOString().replace(/[-:T]/g, "").slice(2, 12); // yymmddHHMM
const buildNumber = env["BUILD_NUMBER"] ?? env["GITHUB_RUN_NUMBER"] ?? stamp;
const baseVersion = env["BUILD_VERSION"] ?? env["npm_package_version"] ?? "1.0.0";
const buildVersion = env["BUILD_VERSION_EXACT"] ?? `${baseVersion}+${buildNumber}`;

function gitCommit() {
  try {
    return execSync("git rev-parse HEAD", { stdio: ["ignore", "pipe", "ignore"] })
      .toString()
      .trim();
  } catch {
    return "";
  }
}

const buildCommit =
  (
    env["BUILD_COMMIT"] ??
    env["GITHUB_SHA"] ??
    env["CF_PAGES_COMMIT_SHA"] ??
    env["VERCEL_GIT_COMMIT_SHA"] ??
    gitCommit() ??
    "local"
  ).slice(0, 7) || "local";
const buildTimeIso = buildTime.toISOString();

// Machine-readable stamp so a deploy can be verified with a single request
// (e.g. curl https://smarty.tel/version.json) instead of reading the footer.
function writeVersionFile(dir: string) {
  try {
    mkdirSync(dir, { recursive: true });
    writeFileSync(
      `${dir}/version.json`,
      JSON.stringify(
        { version: buildVersion, commit: buildCommit, buildTime: buildTimeIso },
        null,
        2,
      ),
    );
  } catch {
    // Never fail a build over the stamp file.
  }
}

export default defineConfig({
  ...(staticExport ? { nitro: false as const } : {}),
  vite: {
    define: {
      __BUILD_VERSION__: JSON.stringify(buildVersion),
      __BUILD_COMMIT__: JSON.stringify(buildCommit),
      __BUILD_TIME__: JSON.stringify(buildTimeIso),
    },
    plugins: [
      {
        name: "smartytel-version-file",
        apply: "build" as const,
        buildStart() {
          // Written into public/ so it is copied into every build output.
          writeVersionFile("public");
        },
      },
    ],
  },
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
    ...(staticExport ? { prerender: { enabled: true, crawlLinks: true } } : {}),
  },
});
