import { createFileRoute } from "@tanstack/react-router";

/**
 * Server-side proxy for the published Google Sheet that holds the international
 * rate card. Browsers cannot fetch docs.google.com directly (no CORS), so the
 * CSV export is relayed here and cached at the edge.
 *
 * The sheet must be shared as "Anyone with the link can view".
 * Override with RATES_SHEET_ID / RATES_SHEET_GID env vars.
 */
const DEFAULT_SHEET_ID = "1UorvSmjKhx1b2RFWH73Of-ncETBJ-HHF4XLddsxg9FU";

export const Route = createFileRoute("/api/public/rates-sheet")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const url = new URL(request.url);
        const sheetId =
          url.searchParams.get("sheetId") ??
          process.env["RATES_SHEET_ID"] ??
          DEFAULT_SHEET_ID;
        const gid = url.searchParams.get("gid") ?? process.env["RATES_SHEET_GID"] ?? "0";

        const exportUrl = `https://docs.google.com/spreadsheets/d/${encodeURIComponent(
          sheetId,
        )}/gviz/tq?tqx=out:csv&gid=${encodeURIComponent(gid)}`;

        try {
          const upstream = await fetch(exportUrl, { redirect: "follow" });
          const body = await upstream.text();
          const isCsv = upstream.ok && !body.trimStart().startsWith("<");

          if (!isCsv) {
            return Response.json(
              {
                error: "sheet_unavailable",
                status: upstream.status,
                message:
                  "The Google Sheet is not publicly readable. Share it with \"Anyone with the link can view\".",
              },
              { status: 502 },
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
            { error: "fetch_failed", message: String(error) },
            { status: 502 },
          );
        }
      },
    },
  },
});
