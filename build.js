const fs = require('fs');
const path = require('path');

// --- Start: Copied from js/shared.js ---
// We copy this function here so the script can run independently.
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
            let value = parts.slice(1).join(':').trim();
            if ((value.startsWith("'") && value.endsWith("'")) || (value.startsWith('"') && value.endsWith('"'))) {
                value = value.substring(1, value.length - 1);
            }
            if (key && value) attributes[key] = value;
        }
    });
    return { attributes, body: text.substring(match[0].length) };
}
// --- End: Copied from js/shared.js ---


const postsDir = path.join(__dirname, 'posts');
const configPath = path.join(postsDir, 'config.json');
const outputPath = path.join(postsDir, 'all_posts.json');

console.log('Starting build process...');

try {
    // 1. Read the category configuration
    const configContent = fs.readFileSync(configPath, 'utf8');
    const categoriesConfig = JSON.parse(configContent);
    console.log('Successfully read posts/config.json');

    const allPosts = [];
    const fetchableCategories = categoriesConfig.filter(cat => cat.folder); // Don't try to fetch for "All"

    // 2. Go through each category folder
    for (const category of fetchableCategories) {
        const categoryDir = path.join(postsDir, category.folder);
        console.log(`Processing category: ${category.name} in /${category.folder}`);

        const files = fs.readdirSync(categoryDir);
        const mdFiles = files.filter(file => file.endsWith('.md'));

        // 3. Read each markdown file in the folder
        for (const file of mdFiles) {
            const filePath = path.join(categoryDir, file);
            const fileContent = fs.readFileSync(filePath, 'utf8');
            const { attributes } = parseFrontMatter(fileContent);

            // 4. Collect post data
            if (attributes.date) { // Ensure it's a valid post
                allPosts.push({
                    attributes,
                    path: `posts/${category.folder}/${file}`, // Create the relative path for the URL
                    category: category.name,
                    categoryConfig: category
                });
            }
        }
    }

    // 5. Sort posts by date, newest first
    allPosts.sort((a, b) => new Date(b.attributes.date) - new Date(a.attributes.date));

    // 6. Write the final JSON file
    fs.writeFileSync(outputPath, JSON.stringify(allPosts, null, 2));
    console.log(`\nBuild successful! ✨`);
    console.log(`${allPosts.length} posts processed and saved to ${outputPath}`);

} catch (error) {
    console.error('\nBuild failed! ❌');
    console.error(error);
}