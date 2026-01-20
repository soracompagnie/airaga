import type { AiragaNode, AiragaNodeProps, NodeType } from "@airaga/parser/types/ast";

export class Heading {
  private static create(type: NodeType, content: string, props?: AiragaNodeProps): AiragaNode {
    return { type, content, props };
  }

  public static h1(content: string, props?: AiragaNodeProps): AiragaNode {
    return this.create("h1", content, props);
  }

  public static h2(content: string, props?: AiragaNodeProps): AiragaNode {
    return this.create("h2", content, props);
  }

  public static h3(content: string, props?: AiragaNodeProps): AiragaNode {
    return this.create("h3", content, props);
  }

  public static h4(content: string, props?: AiragaNodeProps): AiragaNode {
    return this.create("h4", content, props);
  }

  public static h5(content: string, props?: AiragaNodeProps): AiragaNode {
    return this.create("h5", content, props);
  }

  public static h6(content: string, props?: AiragaNodeProps): AiragaNode {
    return this.create("h6", content, props);
  }

  public static p(content: string, props?: AiragaNodeProps): AiragaNode {
    return this.create("p", content, props);
  }

  public static b(content: string, props?: AiragaNodeProps): AiragaNode {
    return this.create("b", content, props);
  }

  public static i(content: string, props?: AiragaNodeProps): AiragaNode {
    return this.create("i", content, props);
  }

  public static u(content: string, props?: AiragaNodeProps): AiragaNode {
    return this.create("u", content, props);
  }

  public static s(content: string, props?: AiragaNodeProps): AiragaNode {
    return this.create("s", content, props);
  }

  public static pre(content: string, props?: AiragaNodeProps): AiragaNode {
    return this.create("pre", content, props);
  }
}