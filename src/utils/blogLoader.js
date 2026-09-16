// Cache for blog posts to avoid refetching
let blogPostsCache = null;
let blogManifestCache = null;

/**
 * Simple frontmatter parser that works in the browser
 * Parses YAML frontmatter from markdown content
 * @param {string} content - The markdown content with frontmatter
 * @returns {Object} Object with `data` (frontmatter) and `content` (markdown)
 */
function parseFrontmatter(content) {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
  const match = content.match(frontmatterRegex);
  
  if (!match) {
    // No frontmatter found, return empty data and full content
    return { data: {}, content: content.trim() };
  }
  
  const frontmatterText = match[1];
  const markdownContent = match[2];
  
  // Simple YAML parser for basic key-value pairs
  const data = {};
  const lines = frontmatterText.split('\n');
  
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    
    // Handle key: value pairs
    const colonIndex = trimmed.indexOf(':');
    if (colonIndex > 0) {
      const key = trimmed.substring(0, colonIndex).trim();
      let value = trimmed.substring(colonIndex + 1).trim();
      
      // Remove quotes if present
      if ((value.startsWith('"') && value.endsWith('"')) || 
          (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }
      
      // Handle arrays (tags: ["tag1", "tag2"] or tags: [tag1, tag2])
      if (value.startsWith('[') && value.endsWith(']')) {
        try {
          // Try to parse as JSON first (handles proper JSON arrays)
          value = JSON.parse(value);
        } catch (e) {
          // If JSON parsing fails, do simple array parsing
          const arrayContent = value.slice(1, -1);
          const items = arrayContent.split(',').map(item => {
            const trimmed = item.trim();
            if ((trimmed.startsWith('"') && trimmed.endsWith('"')) || 
                (trimmed.startsWith("'") && trimmed.endsWith("'"))) {
              return trimmed.slice(1, -1);
            }
            return trimmed;
          });
          value = items;
        }
      }
      
      data[key] = value;
    }
  }
  
  return {
    data,
    content: markdownContent.trim()
  };
}

/**
 * Fetch the blog manifest file or try to discover blog posts
 * @returns {Promise<Array>} Array of blog post filenames
 */
async function fetchBlogManifest() {
  if (blogManifestCache) {
    return blogManifestCache;
  }
  
  try {
    // First try to fetch the manifest file
    // Use process.env.PUBLIC_URL if available (for production builds)
    const baseUrl = process.env.PUBLIC_URL || '';
    const manifestUrl = `${baseUrl}/blogs/blog-manifest.json`;
    console.log('Attempting to fetch manifest from:', manifestUrl);
    const response = await fetch(manifestUrl);
    
    if (response.ok) {
      const manifest = await response.json();
      console.log('Successfully loaded blog manifest:', manifest);
      if (Array.isArray(manifest) && manifest.length > 0) {
        blogManifestCache = manifest;
        return manifest;
      } else {
        console.warn('Manifest is empty or invalid, using fallback');
      }
    } else {
      console.warn(`Manifest fetch returned ${response.status} ${response.statusText}, using fallback`);
    }
  } catch (error) {
    console.warn('Manifest file not found, will use fallback method:', error);
  }
  
  // Fallback: If manifest doesn't exist, return known posts
  // Users should add their blog post filename to the manifest
  // or we can try to discover them (requires server-side support)
  console.log('Using fallback blog list');
  return ['example-post.md'];
}

/**
 * Fetch a single markdown file
 * @param {string} filename - The filename of the blog post
 * @returns {Promise<string>} The raw markdown content
 */
async function fetchMarkdownFile(filename) {
  try {
    // Use process.env.PUBLIC_URL if available (for production builds)
    const baseUrl = process.env.PUBLIC_URL || '';
    const url = `${baseUrl}/blogs/${filename}`;
    console.log(`Fetching blog post from: ${url}`);
    
    const response = await fetch(url);
    if (!response.ok) {
      console.error(`Failed to fetch ${url}: ${response.status} ${response.statusText}`);
      console.error(`Response headers:`, Object.fromEntries(response.headers.entries()));
      return null;
    }
    const text = await response.text();
    if (!text || text.trim().length === 0) {
      console.error(`Empty content for ${filename}`);
      return null;
    }
    console.log(`Successfully fetched ${filename} (${text.length} characters)`);
    return text;
  } catch (error) {
    console.error(`Error fetching ${filename}:`, error);
    console.error(`Error details:`, error.message, error.stack);
    return null;
  }
}

/**
 * Parse a markdown file and extract frontmatter and content
 * @param {string} filename - The filename of the blog post
 * @param {string} content - The raw markdown content
 * @returns {Object} Parsed blog post with metadata and content
 */
/**
 * Detect if text contains Arabic or RTL characters
 * @param {string} text - Text to check
 * @returns {boolean} True if text contains RTL characters
 */
function isRTL(text) {
  if (!text) return false;
  // Arabic, Hebrew, Persian, Urdu, etc.
  const rtlRegex = /[\u0590-\u05FF\u0600-\u06FF\u0700-\u074F\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/;
  return rtlRegex.test(text);
}

function parseBlogPost(filename, content) {
  const { data, content: markdownContent } = parseFrontmatter(content);
  
  // Generate slug from filename (remove .md extension)
  const slug = filename.replace(/\.md$/, '');
  
  // Ensure tags is an array
  let tags = data.tags || [];
  if (typeof tags === 'string') {
    // If tags is a string, try to parse it
    try {
      tags = JSON.parse(tags);
    } catch (e) {
      // If parsing fails, split by comma
      tags = tags.split(',').map(t => t.trim()).filter(t => t);
    }
  }
  if (!Array.isArray(tags)) {
    tags = [];
  }
  
  // Detect RTL: check frontmatter rtl field, or auto-detect from title/content
  const explicitRTL = data.rtl === true || data.rtl === 'true';
  const autoDetectRTL = isRTL(data.title) || isRTL(markdownContent.substring(0, 500));
  const isRTLPost = explicitRTL || autoDetectRTL;
  
  return {
    slug,
    title: data.title || 'Untitled',
    date: data.date || new Date().toISOString().split('T')[0],
    excerpt: data.excerpt || '',
    tags: tags,
    content: markdownContent,
    rtl: isRTLPost,
    ...data, // Include any other frontmatter fields
  };
}

/**
 * Get all blog posts, sorted by date (newest first)
 * @returns {Promise<Array>} Array of blog post objects
 */
export async function getAllBlogPosts() {
  // Return cached posts if available (but only if we have posts, not empty cache)
  if (blogPostsCache && blogPostsCache.length > 0) {
    console.log('Returning cached blog posts:', blogPostsCache.length);
    return blogPostsCache;
  }
  
  // Clear cache if it was empty (from previous failed load)
  if (blogPostsCache && blogPostsCache.length === 0) {
    console.log('Clearing empty cache and retrying...');
    blogPostsCache = null;
    blogManifestCache = null;
  }
  
  try {
    const manifest = await fetchBlogManifest();
    console.log('Blog manifest loaded:', manifest);
    console.log('Manifest type:', typeof manifest, 'Is array:', Array.isArray(manifest));
    
    if (!manifest || manifest.length === 0) {
      console.warn('No blog posts found in manifest');
      return [];
    }
    
    // Fetch all blog posts in parallel
    const fetchPromises = manifest.map(async (filename) => {
      console.log(`Processing filename: ${filename}`);
      const content = await fetchMarkdownFile(filename);
      if (content) {
        try {
          const parsed = parseBlogPost(filename, content);
          console.log(`Successfully parsed ${filename}:`, parsed.title);
          return parsed;
        } catch (parseError) {
          console.error(`Error parsing ${filename}:`, parseError);
          console.error(`Parse error details:`, parseError.message, parseError.stack);
          return null;
        }
      } else {
        console.warn(`No content retrieved for ${filename}`);
      }
      return null;
    });
    
    const results = await Promise.all(fetchPromises);
    console.log('Fetch results:', results);
    const validPosts = results.filter(post => post !== null);
    
    console.log(`Loaded ${validPosts.length} blog posts out of ${manifest.length} in manifest`);
    
    if (validPosts.length === 0) {
      console.error('No valid posts were loaded. Check the console for fetch errors.');
    }
    
    // Sort by date (newest first)
    validPosts.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    // Cache the results
    blogPostsCache = validPosts;
    return validPosts;
  } catch (error) {
    console.error('Error loading blog posts:', error);
    console.error('Error details:', error.message, error.stack);
    return [];
  }
}

/**
 * Get a single blog post by slug
 * @param {string} slug - The slug of the blog post
 * @returns {Promise<Object|null>} Blog post object or null if not found
 */
export async function getBlogPostBySlug(slug) {
  const posts = await getAllBlogPosts();
  
  return posts.find(post => post.slug === slug) || null;
}

/**
 * Get all unique tags from all blog posts
 * @returns {Promise<Array>} Array of unique tag strings
 */
export async function getAllTags() {
  const posts = await getAllBlogPosts();
  const tags = new Set();
  posts.forEach(post => {
    post.tags.forEach(tag => tags.add(tag));
  });
  return Array.from(tags).sort();
}

/**
 * Clear the cache (useful for development/hot reloading)
 */
export function clearBlogCache() {
  blogPostsCache = null;
  blogManifestCache = null;
}
