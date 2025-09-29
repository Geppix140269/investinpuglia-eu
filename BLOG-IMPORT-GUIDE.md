# Blog Import Guide - No More Manual Formatting! 🚀

## Problem Solved! ✅

Instead of copy/pasting markdown and losing all formatting (##, **, links, etc.), use these automated scripts to convert and upload your blog posts with perfect formatting.

## Quick Start (3 Commands)

### 1. Convert Markdown to Sanity Format
```bash
npm run convert-blog-posts
```
This converts all 6 blog posts from `/content/blog-posts/*.md` to proper Sanity block format with:
- ✅ Headers (# ## ### ####) → Proper Sanity headings
- ✅ Bold (**text**) → Sanity strong marks
- ✅ Italic (*text*) → Sanity emphasis marks
- ✅ Links [text](url) → Sanity link marks
- ✅ Lists (- item) → Sanity list blocks
- ✅ Code `code` → Sanity code marks
- ✅ Blockquotes > text → Sanity blockquote blocks

### 2. Set Up Sanity API Token
1. Go to https://sanity.io/manage
2. Select your project
3. Go to API → Tokens
4. Create new token with **Write** permissions
5. Add to `.env.local`:
```
SANITY_API_TOKEN=your_token_here
```

### 3. Upload to Sanity (Optional - Automated)
```bash
npm run upload-to-sanity
```
This automatically:
- ✅ Creates Giuseppe Funaro as author
- ✅ Creates proper categories (EU Grants, Investment Analysis, etc.)
- ✅ Uploads all 6 posts with proper formatting
- ✅ Sets correct slugs, categories, and metadata

## Manual Import Alternative

If you prefer manual control:

1. Run: `npm run convert-blog-posts`
2. Go to `/content/sanity-formatted/`
3. Open any `.json` file
4. Copy the `body` array from the JSON
5. In Sanity Studio, create new post and paste the `body` content into the content field
6. The formatting will be perfect! ✨

## What Gets Created

Each blog post gets:
- **Perfect formatting** (no more ## showing as text!)
- **Proper headings** (H1, H2, H3, H4)
- **Bold and italic** text properly marked
- **Working links** with proper href attributes
- **Lists** with proper bullet/number formatting
- **Categories** assigned based on content
- **Author** set to Giuseppe Funaro
- **SEO-friendly slugs** generated automatically

## Files Converted

1. `eu-grants-tourism-complete-guide.md` → EU Grants category
2. `industrial-investment-opportunities-puglia.md` → Investment Analysis
3. `why-international-investors-choose-puglia.md` → Investment Analysis
4. `secure-500k-eu-grants-property-development.md` → Property Development
5. `navigating-italian-bureaucracy-foreign-investors.md` → Property Development
6. `success-stories-international-investors-puglia.md` → Success Stories

## After Upload

1. ✅ Posts appear on `/insights` page automatically
2. ✅ Individual post pages work at `/insights/post-slug`
3. ✅ Homepage shows latest 3 posts in Investment Insights section
4. 📷 **Add featured images** in Sanity Studio for each post
5. 🔍 **Review and edit** any content in Sanity Studio as needed

No more hours of manual formatting! 🎉