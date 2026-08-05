import type { CollectionAfterChangeHook, GlobalAfterChangeHook } from "payload";

/**
 * Publishing content triggers the "Build static site" GitHub Action so the
 * static export on Hostinger is rebuilt with the new copy baked in.
 *
 * Requires GITHUB_REPO ("owner/repo") and GITHUB_TOKEN (fine-grained token with
 * Contents: read and write on that repo) in the CMS environment.
 */
export const triggerRebuild: CollectionAfterChangeHook & GlobalAfterChangeHook = async (args) => {
  const repo = process.env.GITHUB_REPO;
  const token = process.env.GITHUB_TOKEN;

  if (!repo || !token) return (args as { doc: unknown }).doc;

  try {
    const response = await fetch(`https://api.github.com/repos/${repo}/dispatches`, {
      method: "POST",
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ event_type: "cms-publish" }),
    });

    if (!response.ok) {
      console.error(`Rebuild dispatch failed [${response.status}]: ${await response.text()}`);
    }
  } catch (error) {
    console.error("Rebuild dispatch failed", error);
  }

  return (args as { doc: unknown }).doc;
};
