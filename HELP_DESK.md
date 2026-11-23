# Quick Help Desk for Cachi Studio WordPress Migration

## Need Help Right Now?

### 1. I Can't Access the WordPress Dashboard
**Symptom**: Don't know the login URL or credentials

**Solutions**:
- **LocalWP**: Click the "Admin" button in the LocalWP app for your site
- **Manual/XAMPP**: Visit `http://localhost/cachi-studio/wp-admin/`
- **Forgot password**: Click "Lost your password?" on the login page
- **Default credentials** (if fresh install): Check your installation method's defaults

**Need the login URL?**
- LocalWP: `http://your-site-name.test/wp-admin/`
- Manual/XAMPP: `http://localhost/cachi-studio/wp-admin/`
- Hosting: `http://yourdomain.com/wp-admin/`

### 2. Theme Won't Activate
**Symptom**: "Arquivos da theme estão com erro" or activation fails

**Solutions**:
- **Check PHP version**: WordPress 6.5+ requires PHP 7.4+
- **FTP/FileZilla**: Try re-uploading the theme via FTP
- **Verify files**: Ensure ALL .php files are uploaded (15 files in theme folder)
- **Minimum files required**: `style.css` + `index.php` (but we have 15)

**Theme file checklist** (must all exist):
- style.css ✓
- functions.php ✓
- front-page.php ✓
- index.php ✓
- header.php ✓
- footer.php ✓
- page.php ✓
- single-project.php ✓
- archive-project.php ✓
- single-service.php ✓
- archive-service.php ✓
- 404.php ✓
- search.php ✓
- template-parts/header-part.php ✓
- template-parts/footer-part.php ✓

### 3. Plugin Won't Activate
**Symptom**: Plugin activation error or white screen

**Solutions**:
- **Check for syntax errors**: The plugin file should be valid PHP
- **Deactivate other plugins**: Conflict possible
- **Re-upload**: Delete and re-install the plugin
- **Check file path**: Must be at `wp-content/plugins/cachi-studio-content/cachi-studio-content.php`

### 3. Homepage Shows Default WordPress Blog Layout
**Symptom**: Instead of the Cachi Studio homepage, see a list of recent posts

**Solutions**:
- **Set front page**: 
  - Go to Settings → Reading
  - Select "A static page"
  - "Front page": Choose "Front Page" (front-page.php)
  - "Posts page": Choose "Blog" or leave blank
  - Save Changes
- **OR**: Ensure front-page.php is in the theme folder and the theme is active

### 4. Projects Not Showing on Work Page
**Solutions**:
- **Check post status**: Projects → All Projects → Ensure "Published" for each
- **Check taxonomy**: Each project must have a Project Category assigned
- **Check query**: The archive-project.php uses WP_Query with tax_query - ensure categories exist
- **Refresh permalinks**: Settings → Permalinks → Save Changes (this regenerates rewrite rules)

### 5. Contact Form Not Submitting
**Solutions**:
- **Email mode** (default, no config needed):
  - Ensure your server can send mail (shared hosting usually can)
  - Check spam folder for test submissions
  - Browser console: F12 → Console - look for errors
  
- **Form endpoint mode**:
  - Go to Customizer → Cachi Studio Settings → Form Endpoint
  - Enter full URL (e.g., `https://formspree.io/f/yourFormId`)
  - Or leave blank for email submission

- **Test submissions**:
  - Fill form, submit
  - Check: Browser console (F12), Spam folder, Server logs
  - Success message should appear: "Thank you — your enquiry has been sent..."

### 6. Custom Fields Not Visible
**Solutions**:
- **Enable Screen Options**:
  - Top right of any admin page: Click "Screen Options" (small tab)
  - Check "Custom Fields" box
  - Refresh the page - custom fields meta box should appear below the editor

- **Plugin not activated**:
  - Plugins → Installed Plugins → Find "Cachi Studio Content" → Activate

- **Theme supports custom-fields**:
  - The theme adds 'custom-fields' to post type supports - this is automatic
  - No additional setup required

### 6. Images Not Displaying
**Solutions**:
- **Set featured image**:
  - Open any project/post
  - In the right sidebar: "Featured Image" section
  - Click "Set featured image"
  - Upload from library or drag and drop

- **Upload images to Media Library**:
  - Go to Media → Add New
  - Drag and drop from: `C:\Users\caleb\cachi-studio\public\images\`
  - Files: work-kilo.svg, work-orbit.svg, work-campaign.svg, work-bloom.svg, work-loop.svg, work-paper.svg, studio-wall.svg
  - After uploading, set as featured image on each project

- **Check image paths**:
  - The theme uses `wp_get_attachment_url()` or post thumbnail functions
  - Ensure images are actually uploaded to WordPress Media Library, not just referenced from the old folder

### 7. Mobile Menu Not Working
**Solutions**:
- **Check for JavaScript errors**:
  - Press F12 → Console tab
  - Look for red error messages
  - Common conflict: Another plugin's jQuery or menu script

- **Toggle manually**:
  - The mobile menu has a "MENU" button (top right, hidden on desktop)
  - Click it to open/close the mobile navigation

- **Verify theme location**:
  - Appearance → Menus → Ensure "Primary menu" is selected for the theme location

### 8. Design Looks Different Than Original Vercel Site
**Solutions**:
- **This is expected**: The visual design (colors, typography, layout) is 100% preserved
- **But**: The content entry experience is different (WordPress dashboard vs TinaCMS)
- **Design is preserved in**: 
  - Color palette (ink, volt, paper, fog - exact matches)
  - Typography (Space Grotesk + Inter - same fonts, same sizes/weights)
  - Layout (grids, spacing, borders, shadows - identical CSS values)
  - Animations (marquee, reveal on scroll, hover effects - CSS equivalents)
  - All page structures (home, work, project, service, studio, contact, 404)

- **Content entry differences**:
  - TinaCMS: Edit Markdown files, git commit, Vercel redeploy
  - WordPress: Dashboard → Customizer → instant preview/publish, no redeploy

- **To match original exactly**:
  1. Use the Customizer for content (not code changes for design)
  2. Upload original project images via Media Library
  3. Set featured images on each project
  4. Fill in custom fields as described
  5. Match the menu structure and footer links

### 9. Browser Console Errors
**Solutions**:
- **Press F12** → Click "Console" tab
- **Look for**: Red error messages, especially about "undefined", "not found", "failed to load"
- **Common harmless errors**: Some font or icon loading (often OK if design still looks good)
- **Fixes**:
  - Check JavaScript file paths in header.php/footer.php
  - Ensure theme is properly activated
  - Disable other plugins one by one to find conflicts
  - The nav.js, contact-form.js, and skip-links.js are enqueued via functions.php

### 10. Need to Reset/Start Over
**Solutions**:
- **Delete and reinstall**:
  - Deactivate "Cachi Studio Content" plugin
  - Delete the plugin
  - Deactivate "Cachi Studio" theme
  - Delete the theme
  - Re-upload fresh from this project folder
  
- **Reset content**:
  - Projects → All Projects → Select all → Move to Trash
  - Services → All Services → Select all → Move to Trash
  - Appearance → Customize → Reset settings (or set defaults)
  - Settings → Permalinks → Save Changes (regenerates rules)

### Quick Commands Reference (PowerShell)

```powershell
# Theme files location:
C:\Users\caleb\cachi-studio\wordpress\wp-content\themes\cachi-studio\

# Plugin files location:
C:\Users\caleb\cachi-studio\wordpress\wp-content\plugins\cachi-studio-content\

# Original project (preserved, do not modify):
C:\Users\caleb\cachi-studio\

# Original images (for upload to WordPress Media Library):
C:\Users\caleb\cachi-studio\public\images\

# To reset permalinks (fixes many issues):
# Go to: Settings → Permalinks → Click "Save Changes" (no changes needed)

# To enable custom fields:
#: Top right of any admin page → Click "Screen Options" → Check "Custom Fields"
```

### Emergency Contact
If you're stuck and can't resolve the issue:
1. The original Vite + TinaCMS project is preserved at `C:\Users\caleb\cachi-studio\` - you can always fall back to the Vercel deployment at `https://cachi-studio.vercel.app/`
2. All theme and plugin files are in the `wordpress/` directory you created
3. The `INSTALLATION_GUIDE.md` and `WORDPRESS_INSTALLATION_STEPS.md` files have detailed step-by-step instructions
4. You can re-run the migration or ask for specific help with any error message

---
**Remember**: The original website at `https://cachi-studio.vercel.app/` is still live and unchanged. This migration is additive - you can switch to WordPress whenever ready, or maintain both.