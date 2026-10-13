export type ContentBlockType =
  | "heading"
  | "paragraph"
  | "image"
  | "table"
  | "numberedList"
  | "bulletList"
  | "callout"
  | "section"
  | "video"
  | "chessboard"
  | "faq"
  | "divider"
  | "markdown";

export interface HeadingBlock {
  id: string;
  type: "heading";
  level: 2 | 3 | 4;
  text: string;
}

export interface ParagraphBlock {
  id: string;
  type: "paragraph";
  text: string;
}

export interface ImageBlock {
  id: string;
  type: "image";
  url: string;
  caption?: string;
  alt?: string;
  alignment?: "center" | "full" | "left" | "right";
}

export interface TableBlock {
  id: string;
  type: "table";
  title?: string;
  headers: string[];
  rows: string[][];
  striped?: boolean;
}

export interface NumberedListItem {
  title?: string;
  body: string;
}

export interface NumberedListBlock {
  id: string;
  type: "numberedList";
  title?: string;
  items: NumberedListItem[];
}

export interface BulletListBlock {
  id: string;
  type: "bulletList";
  title?: string;
  style: "bullet" | "check" | "arrow" | "pawn";
  items: string[];
}

export interface CalloutBlock {
  id: string;
  type: "callout";
  variant: "tip" | "warning" | "insight" | "quote";
  title?: string;
  text: string;
  author?: string;
}

export interface SubPoint {
  title: string;
  body: string;
}

export interface SectionBlock {
  id: string;
  type: "section";
  heading: string;
  body?: string;
  points?: SubPoint[];
}

export interface VideoBlock {
  id: string;
  type: "video";
  url: string;
  caption?: string;
}

export interface ChessboardBlock {
  id: string;
  type: "chessboard";
  fen?: string;
  title?: string;
  description?: string;
  orientation?: "white" | "black";
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQBlock {
  id: string;
  type: "faq";
  title?: string;
  items: FAQItem[];
}

export interface DividerBlock {
  id: string;
  type: "divider";
}

export interface MarkdownBlock {
  id: string;
  type: "markdown";
  content: string;
}

export type ContentBlock =
  | HeadingBlock
  | ParagraphBlock
  | ImageBlock
  | TableBlock
  | NumberedListBlock
  | BulletListBlock
  | CalloutBlock
  | SectionBlock
  | VideoBlock
  | ChessboardBlock
  | FAQBlock
  | DividerBlock
  | MarkdownBlock;

export interface ContentStructure {
  intro: string;
  conclusion: string;
  blocks?: ContentBlock[];
  sections?: Array<{
    heading: string;
    body?: string;
    points?: SubPoint[];
  }>;
  [key: string]: any;
}

/**
 * Generate a unique ID for blocks
 */
export function generateBlockId(): string {
  return "blk_" + Math.random().toString(36).substring(2, 9) + "_" + Date.now().toString(36);
}

/**
 * Helper to ensure content has a normalized blocks array,
 * converting legacy sections if blocks are not present.
 */
export function normalizeBlocksFromContent(content: any): ContentBlock[] {
  if (!content) return [];
  
  if (Array.isArray(content.blocks) && content.blocks.length > 0) {
    return content.blocks;
  }

  const generatedBlocks: ContentBlock[] = [];

  // Convert legacy sections
  if (Array.isArray(content.sections)) {
    content.sections.forEach((sec: any) => {
      generatedBlocks.push({
        id: generateBlockId(),
        type: "section",
        heading: sec.heading || "Untitled Section",
        body: sec.body || "",
        points: Array.isArray(sec.points) ? sec.points : [],
      });
    });
  }

  // Convert legacy numbered lists (benefits, tactics, steps, etc.)
  const numberedSource = [
    ...(content.benefits || []),
    ...(content.tactics || []),
    ...(content.features || []),
    ...(content.metrics || []),
    ...(content.criteria || []),
    ...(content.whyItWorks || []),
  ];

  if (numberedSource.length > 0 && generatedBlocks.length === 0) {
    generatedBlocks.push({
      id: generateBlockId(),
      type: "numberedList",
      title: "Key Takeaways",
      items: numberedSource.map((item: any) => ({
        title: item.title || item.name || "",
        body: item.body || "",
      })),
    });
  }

  return generatedBlocks;
}
