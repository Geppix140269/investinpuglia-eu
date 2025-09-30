# Sanity Studio Publishing Troubleshooting

## ✅ Publishing Works But Post Not Visible on Website?

### **Common Issues & Solutions:**

---

## 1. **Browser Cache** (Most Common!)

**Problem**: Your browser is showing old cached version of the page

**Solution**:
1. Press `Ctrl + Shift + R` (Windows) or `Cmd + Shift + R` (Mac) for hard refresh
2. Or clear browser cache completely
3. Try opening in Incognito/Private window

---

## 2. **Check Post Status in Studio**

Go to `/studio` and verify:

✅ **Status shows "Published"** (not "Draft")
✅ **Published At** date is filled (should be automatic)
✅ **Slug** is generated (required!)
✅ **Title** is filled

---

## 3. **Verify on Sanity Dashboard**

1. Go to https://www.sanity.io/manage
2. Select your project: `investinpuglia` (ID: trdbxmjo)
3. Click "Vision" tab
4. Run this query:

```groq
*[_type == "post"] | order(publishedAt desc) {
  _id,
  title,
  slug,
  publishedAt,
  _updatedAt
}
```

This shows ALL posts in your database.

---

## 4. **CDN Cache Delay**

**Problem**: Sanity CDN can take 1-2 minutes to update

**Solution**:
- Wait 2-3 minutes after publishing
- Force refresh your browser
- Check if `useCdn: false` in lib/sanity.ts (it is!)

---

## 5. **Check /insights Page Directly**

Open: https://investinpuglia.eu/insights

You should see your posts there. If they appear on live site but not locally:

**For Local Development:**
```bash
# Stop dev server (Ctrl+C)
# Delete .next folder
rm -rf .next
# Restart dev server
npm run dev
```

---

## 6. **Deployment Delay (Production)**

If you're viewing production site:
- Changes can take 2-5 minutes to deploy
- Check your hosting dashboard (Vercel/Netlify)
- Wait for "Deployment successful" message

---

## 7. **Image Not Loading?**

If post shows but image is broken:

1. In Studio, make sure image uploaded successfully
2. Check "Main image" field is filled
3. Image must be in Sanity's CDN format:
   ```
   https://cdn.sanity.io/images/trdbxmjo/production/...
   ```

---

## 8. **Quick Test**

Create a new test post with:
- Title: "Test Post [Current Date]"
- Generate slug
- Add excerpt (optional)
- Click Publish
- Wait 2 minutes
- Hard refresh browser (Ctrl+Shift+R)
- Check /insights

---

## 9. **Verify Post Query**

The site uses this query in `lib/sanity/blog.ts`:

```typescript
*[_type == "post" && defined(slug.current)] | order(publishedAt desc)
```

This means posts MUST have:
- Type: "post"
- Slug: generated
- Will be ordered by publishedAt (newest first)

---

## 10. **Environment Variables**

Check your `.env.local` file has:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=trdbxmjo
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=sk...
```

---

## **Still Not Working?**

### Debug Steps:

1. **Check Console Errors**:
   - Open browser DevTools (F12)
   - Go to Console tab
   - Look for red errors

2. **Check Network Tab**:
   - DevTools → Network tab
   - Reload page
   - Look for failed Sanity requests

3. **Test Direct Sanity Query**:
   - Go to `/studio/vision`
   - Run: `*[_type == "post"][0]`
   - Should return your latest post

4. **Restart Everything**:
   ```bash
   # Stop dev server
   # Clear Next.js cache
   rm -rf .next
   # Clear node modules (if needed)
   rm -rf node_modules
   npm install
   # Restart
   npm run dev
   ```

---

## **Production vs Development**

### **Local (Development)**:
- Posts appear immediately
- No CDN caching
- Changes reflect instantly

### **Live (Production)**:
- May take 2-5 minutes
- CDN cache involved
- Deployment must complete

---

## **Contact for Help**

If none of these work:
1. Take screenshot of Studio showing "Published" status
2. Share the post title/slug
3. Note whether issue is on local dev or production
4. Check browser console for errors

---

**Last Updated**: January 2025
**Sanity Project**: trdbxmjo
**Dataset**: production