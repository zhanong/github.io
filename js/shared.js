// --- SHARED CONFIGURATION ---
const GITHUB_USER = 'zhanong';
const GITHUB_REPO = 'github.io'; // Make sure this is correct
// ----------------------------

/**
 * Parses front matter from a markdown file's text content.
 * @param {string} text - The raw text content of the markdown file.
 * @returns {{attributes: object, body: string}}
 */
function parseFrontMatter(text) {
    const frontMatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n/;
    const match = frontMatterRegex.exec(text);
    if (!match) return { attributes: {}, body: text };

    const frontMatterBlock = match[1];
    const attributes = {};
    frontMatterBlock.split('\n').forEach(line => {
        const parts = line.split(':');
        if (parts.length >= 2) {
            const key = parts[0].trim();
            const value = parts.slice(1).join(':').trim();
            if (key && value) attributes[key] = value;
        }
    });
    return { attributes, body: text.substring(match[0].length) };
}