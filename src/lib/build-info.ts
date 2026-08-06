/**
 * Deployment stamp shown in the footer for technical validation:
 * lets anyone confirm which build a given environment is actually serving.
 * Values are injected at build time in vite.config.ts.
 */
declare const __BUILD_VERSION__: string;
declare const __BUILD_COMMIT__: string;
declare const __BUILD_TIME__: string;

function read(value: string | undefined, fallback: string) {
  return value && value.length > 0 ? value : fallback;
}

export const buildVersion = read(
  typeof __BUILD_VERSION__ === "string" ? __BUILD_VERSION__ : undefined,
  "dev",
);

export const buildCommit = read(
  typeof __BUILD_COMMIT__ === "string" ? __BUILD_COMMIT__ : undefined,
  "local",
);

export const buildTime = read(typeof __BUILD_TIME__ === "string" ? __BUILD_TIME__ : undefined, "");

/** e.g. "v1.4.0 · a1b2c3d · 2026-08-06 20:41 UTC" */
export const buildStamp = [
  `v${buildVersion}`,
  buildCommit,
  buildTime ? buildTime.replace("T", " ").replace(/:\d\d\.\d+Z$/, " UTC") : "",
]
  .filter(Boolean)
  .join(" · ");
