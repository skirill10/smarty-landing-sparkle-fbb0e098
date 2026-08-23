/** Minimal valid Lexical JSON for a single-paragraph rich-text field. */
export function richText(text: string) {
  return {
    root: {
      type: "root",
      direction: "ltr" as const,
      format: "" as const,
      indent: 0,
      version: 1,
      children: [
        {
          type: "paragraph",
          direction: "ltr" as const,
          format: "" as const,
          indent: 0,
          version: 1,
          children: [
            { type: "text", text, format: 0, detail: 0, mode: "normal" as const, style: "", version: 1 },
          ],
        },
      ],
    },
  };
}
