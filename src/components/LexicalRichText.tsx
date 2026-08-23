import { Fragment, type ReactNode } from "react";

/**
 * Minimal renderer for Payload's Lexical rich-text JSON.
 *
 * Payload's own React converter targets Next.js; adding it here would pull
 * in a Next-oriented dependency for a handful of node types. This covers
 * paragraphs, headings, lists, links and basic text formatting — everything
 * editorial article bodies need — styled with the site's existing type scale
 * instead of a new "prose" plugin.
 */

type LexicalNode = {
  type: string;
  tag?: string;
  text?: string;
  format?: number | string;
  url?: string;
  listType?: string;
  children?: LexicalNode[];
};

const FORMAT_BOLD = 1;
const FORMAT_ITALIC = 2;
const FORMAT_UNDERLINE = 8;

function renderText(node: LexicalNode, key: number): ReactNode {
  const format = typeof node.format === "number" ? node.format : 0;
  let content: ReactNode = node.text ?? "";
  if (format & FORMAT_BOLD) content = <strong>{content}</strong>;
  if (format & FORMAT_ITALIC) content = <em>{content}</em>;
  if (format & FORMAT_UNDERLINE) content = <u>{content}</u>;
  return <Fragment key={key}>{content}</Fragment>;
}

function renderChildren(nodes: LexicalNode[] | undefined): ReactNode {
  if (!nodes) return null;
  return nodes.map((node, index) => renderNode(node, index));
}

function renderNode(node: LexicalNode, key: number): ReactNode {
  switch (node.type) {
    case "text":
      return renderText(node, key);
    case "linebreak":
      return <br key={key} />;
    case "paragraph":
      return (
        <p key={key} className="mt-5 leading-relaxed text-muted-foreground">
          {renderChildren(node.children)}
        </p>
      );
    case "heading": {
      const Tag = (node.tag ?? "h2") as "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
      return (
        <Tag key={key} className="mt-10 font-display font-bold tracking-tight first:mt-0">
          {renderChildren(node.children)}
        </Tag>
      );
    }
    case "list": {
      const Tag = node.listType === "number" ? "ol" : "ul";
      return (
        <Tag key={key} className="mt-5 list-outside list-disc space-y-2 pl-5 text-muted-foreground">
          {renderChildren(node.children)}
        </Tag>
      );
    }
    case "listitem":
      return <li key={key}>{renderChildren(node.children)}</li>;
    case "link":
      return (
        <a
          key={key}
          href={node.url}
          className="font-semibold text-brand hover:underline"
          {...(node.url?.startsWith("http")
            ? { target: "_blank", rel: "noreferrer noopener" }
            : {})}
        >
          {renderChildren(node.children)}
        </a>
      );
    default:
      return <Fragment key={key}>{renderChildren(node.children)}</Fragment>;
  }
}

export function LexicalRichText({ content }: { content: unknown }) {
  const root = (content as { root?: { children?: LexicalNode[] } } | undefined)?.root;
  if (!root?.children?.length) return null;
  return <div className="mx-auto max-w-2xl">{renderChildren(root.children)}</div>;
}
