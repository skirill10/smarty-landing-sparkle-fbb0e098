import { createFileRoute } from "@tanstack/react-router";

/**
 * Server-side proxy for the published Google Sheet that holds the international
 * rate card. Browsers cannot fetch docs.google.com directly (no CORS), so the
 * CSV export is relayed here and cached at the edge.
 *
 * Two source styles are supported:
 *  - `pubId` (File > Share > Publish to web) — the `2PACX-...` id, no sharing needed.
 *  - `sheetId` — the document id, which requires "Anyone with the link can view".
 * Override with RATES_SHEET_PUB_ID / RATES_SHEET_ID / RATES_SHEET_GID env vars.
 */
const DEFAULT_PUB_ID =
  "2PACX-1vRlt2_HwdD7JmOCtLdLvKw9aitTClGUdglT6IpfjFG_19N4DOfdG1_sjcNh3DDpikmcmsWnNdv6JeKx";

export const Route = createFileRoute("/api/public/rates-sheet")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const url = new URL(request.url);
        const gid = url.searchParams.get("gid") ?? process.env["RATES_SHEET_GID"] ?? null;
        const sheetId = url.searchParams.get("sheetId") ?? process.env["RATES_SHEET_ID"] ?? null;
        const pubId =
          url.searchParams.get("pubId") ??
          process.env["RATES_SHEET_PUB_ID"] ??
          (sheetId ? null : DEFAULT_PUB_ID);

        const exportUrl = pubId
          ? `https://docs.google.com/spreadsheets/d/e/${encodeURIComponent(pubId)}/pub?output=csv${
              gid ? `&gid=${encodeURIComponent(gid)}` : ""
            }`
          : `https://docs.google.com/spreadsheets/d/${encodeURIComponent(
              sheetId!,
            )}/gviz/tq?tqx=out:csv&gid=${encodeURIComponent(gid ?? "0")}`;


        try {
          const upstream = await fetch(exportUrl, { redirect: "follow" });
          const body = await upstream.text();
          const isCsv = upstream.ok && !body.trimStart().startsWith("<");

          if (!isCsv) {
            // Respond 200 with a diagnostic payload: a non-2xx here would be
            // reported as an app runtime error even though the client falls
            // back to the bundled rate card.
            return Response.json(
              {
                unavailable: true,
                reason: "sheet_unavailable",
                status: upstream.status,
                message:
                  'The Google Sheet is not publicly readable. Share it with "Anyone with the link can view".',
              },
              { headers: { "Cache-Control": "public, max-age=60" } },
            );
          }

          return new Response(body, {
            headers: {
              "Content-Type": "text/csv; charset=utf-8",
              "Cache-Control": "public, max-age=300, stale-while-revalidate=3600",
            },
          });
        } catch (error) {
          return Response.json(
            { unavailable: true, reason: "fetch_failed", message: String(error) },
            { headers: { "Cache-Control": "no-store" } },
          );
        }

      },
    },
  },
});
