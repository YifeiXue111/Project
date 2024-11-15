function findParentParagraph(node) {
    while (node) {
        if (node.nodeType === Node.ELEMENT_NODE && node.tagName === "P") {
            return node;
        }
        node = node.parentNode;
    }
    return null;
}

function getHighlightedParagraphs() {
    const selection = window.getSelection();
    if (!selection || selection.isCollapsed) {
        return null;
    }

    const paragraphs = [];
    const anchorNode = selection.anchorNode;
    const focusNode = selection.focusNode;

    const startParagraph = findParentParagraph(anchorNode);
    const endParagraph = findParentParagraph(focusNode);

    let currentNode = startParagraph;
    while (currentNode) {
        if (currentNode.nodeType === Node.ELEMENT_NODE && currentNode.tagName === "P") {
            paragraphs.push(currentNode.textContent.trim());
        }
        if (currentNode === endParagraph) break;
        currentNode = currentNode.nextElementSibling;
    }

    return paragraphs;
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "getHighlightedParagraphs") {
        const paragraphs = getHighlightedParagraphs();
        sendResponse({ paragraphs });
    }
});
