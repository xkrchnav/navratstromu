const isMdxImageNode = (node) => {
  if (!node || node.type !== "mdxJsxFlowElement") {
    return false;
  }

  return node.name === "MdxImage";
};

export default function remarkGroupMdxImages() {
  return (tree) => {
    if (!tree || tree.type !== "root" || !Array.isArray(tree.children) || tree.children.length < 2) {
      return;
    }

    const nextChildren = [];

    for (let index = 0; index < tree.children.length; index += 1) {
      const current = tree.children[index];

      if (!isMdxImageNode(current)) {
        nextChildren.push(current);
        continue;
      }

      const streak = [current];
      let cursor = index + 1;

      while (cursor < tree.children.length && isMdxImageNode(tree.children[cursor])) {
        streak.push(tree.children[cursor]);
        cursor += 1;
      }

      if (streak.length >= 2) {
        nextChildren.push({
          type: "mdxJsxFlowElement",
          name: "div",
          attributes: [
            {
              type: "mdxJsxAttribute",
              name: "class",
              value: "mdx-image-grid",
            },
          ],
          children: streak,
        });
      } else {
        nextChildren.push(streak[0]);
      }

      index = cursor - 1;
    }

    tree.children = nextChildren;
  };
}
