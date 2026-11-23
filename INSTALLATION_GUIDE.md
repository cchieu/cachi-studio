# Cachi Studio WordPress Migration - Installation Guide

## Overview
This guide explains how to migrate the existing Cachi Studio Vite + TinaCMS website to a self-hosted WordPress site with a custom theme.

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [WordPress Installation](#wordpress-installation)
3. [Theme Installation](#theme-installation)
4. [Plugin Installation](#plugin-installation)
5. [Content Migration](#content-migration)
6. [Customization](#customization)
7. [ troubleshooting](#troubleshooting)

---

## 1. PREREQUISITES

### Server Requirements
- PHP version 7.4 or higher (PHP 8.0+ recommended)
- MySQL version 5.7 or higher / MariaDB 10.1 or higher
- HTTPS support (recommended)
- WordPress 6.5 or later (tested with current stable release)

### Local Development
- Windows PowerShell (as specified)
- LocalWP, Flywheel, or manual XAMPP/MAMP/WAMP installation
- Alternatively: use a hosting provider with WordPress pre-installed

---

## 2. WORDPRESS INSTALLATION

### Option A: Using LocalWP (Recommended for local development)

1. **Download and install LocalWP** from localwp.com
2. **Create a new site** in LocalWP
   - Site name: `cachi-studio`
   - Environment: PHP 8.1 + Nginx
   - Click "Create Site"
3. **Wait for LocalWP to install WordPress** - this happens automatically
4. **Note the site URL** (e.g., `http://cachi-studio.test`)
5. **Click "Admin"** to log into the Word dashboard

### Option B: Manual WordPress Installation

1. **Download WordPress** from wordpress.org
2. **Extract** to `C:\Users\caleb\cachi-studio\wordpress\`
3. **Create a MySQL database** and user for WordPress
4. **Configure wp-config.php** with database details
5. **Run the famous 5-minute installation** by visiting the site URL in your browser
6. **Log in** to the WordPress dashboard

### Option C: Using a Hosting Provider

1. **Sign up** for a hosting plan that supports WordPress
2. **Use the one-click WordPress installer** (e.g., Softaculous, Installatron)
3. **Complete the setup** following the provider's prompts

---

## 3. THEME INSTALLATION

### Theme Directory Structure
The custom theme `cachi-studio` should be located at:
```
C:\Users\caleb\cachi-studio\wordpress\wp-content\themes\cachi-studio\
```

### Theme Files Included
The theme includes the following template files:

| File | Purpose |
|------|---------|
| `style.css` | Theme information + custom CSS with design tokens |
| `functions.php` | Theme setup, menus, enqueued assets, Customizer support |
| `front-page.php` | Homepage template (primary homepage) |
| `index.php` | Default template |
| `page.php` | Generic page template |
| `single-project.php` | Individual project CPT page |
| `archive-project.php` | Projects listing/archive page |
| `single-service.php` | Individual service CPT page |
| `archive-service.php` | Services listing/archive page |
| `404.php` | 404 error page |
| `search.php` | Search results page |
| `header.php` | Header withnavbar |
| `footer.php` | Footer with contact info and widgets |
| `template-parts/header-part.php` | Reusable header component |
| `template-parts/footer-part.php` | Reusable footer component |
| `assets/js/nav.js` | Navigation initialization (mobile menu, scroll effects) |
| `assets/js/contact-form.js` | Contact form AJAX submission |
| `assets/js/skip-links.js` | Accessibility skip links |

### Theme Activation

1. **Log into WordPress dashboard** at `your-site.com/wp-admin`
2. **Navigate to** Appearance → Themes
3. **Find** "Cachi Studio" in the themes list
4. **Click "Activate"** 

### Required Plugin: Cachi Studio Content

The theme depends on the companion plugin `cachi-studio-content` for:
- Custom Post Types (Projects, Services)
- Custom Taxonomy (Project Category)
- Theme Customizer settings (Homepage content)
- Contact form functionality

1. **Navigate to** Plugins → Add New
2. **Search for** "Cachi Studio Content" or upload the plugin folder
3. **Or**: Click "Upload Plugin" and select `C:\Users\caleb\cachi-studio\wordpress\wp-content\plugins\cachi-studio-content\`
4. **Click "Install Now"** then "Activate"

---

## 4. PLUGIN INSTALLATION

The `cachi-studio-content` plugin is included in the WordPress directory. It must be activated for the theme to work correctly.

### Plugin Features
- **Custom Post Types**: Projects and Services
- **Custom Taxonomy**: Project Category (for filtering)
- **Theme Customizer Settings**: Homepage content management
- **Contact Form**: AJAX-powered form with validation and spam protection
- **Options Page**: Theme settings accessible via Appearance → Customize

### Plugin Configuration

After activation, the following will appear in the WordPress Customizer:

#### Homepage Settings
- **Hero Tagline**: The brief tagline text (default: "INDEPENDENT CREATIVE STUDIO")
- **Hero Subtitle**: The long subtitle description
- **About Description**: The "We believe..." paragraph
- **Pillar 1-3 Title & Copy**: The three pillar sections
- **Final CTA Title & Subtitle**: The final call-to-action
- **Contact Email**: Email address for contact form
- **Contact WhatsApp**: WhatsApp number (e.g., "+1 555 000 0000")
- **Form Endpoint**: URL for external form service (leave blank for email submission)

#### Contact Form
The contact form shortcode `[cachi_studio_contact_form]` can be:
- Added to any page using the Block Editor
- Included in the theme footer (already included in footer.php)
- Placed on a dedicated "Contact" page

---

## 5. CONTENT MIGRATION

### TinaCMS → WordPress Content Migration

The migration transfers content from the existing TinaCMS setup to WordPress. Follow these steps:

### Step 1: Export TinaCMS Content

The existing TinaCMS content is located in:
```
C:\Users\caleb\cachi-studio\content\
```

**Projects** (`content/projects/`): Each project is a Markdown file with fields:
- title, slug, category, year, concept, image, description, challenge, insight, solution, exploration, outcome, deliverables

**Services** (`content/services/`): Each service is a Markdown file with fields:
- number, title, blurb, receive

**Site Content** (`content/site-content/`): Homepage settings:
- heroTagline, heroSubtitle, aboutDescription, pillar1-3 titles/copies, finalCTA titles/subtitles, contactEmail, contactWhatsApp, formEndpoint

### Step 2: Import via WordPress WP-CLI (Recommended)

If WP-CLI is available, use the included importer:

```powershell
# Navigate to WordPress directory
cd C:\Users\caleb\cachi-studio\wordpress

# Run the importer (if importer script exists)
wp run-plugin-importer --plugin=cachi-studio-content

# Or manually import using the WP CLI
wp import --authors=create
```

### Step 3: Manual Content Creation

If WP-CLI is not available, content can be added manually through the WordPress dashboard:

**To add Projects:**
1. Navigate to **Projects → Add New** in the WordPress dashboard
2. Enter the project **Title** 
3. Set the **Featured Image** (using the project thumbnail)
4. Add the **Category** (using the Project Category taxonomy)
5. Enter the **Year** as a custom field
6. Add custom fields via the "Custom Fields" section:
   - `concept` (true/false)
   - `challenge` (rich text)
   - `insight` (rich text)
   - `solution` (rich text)
   - `exploration` (rich text)
   - `outcome` (rich text)
   - `deliverables` (comma-separated list)
7. Set the **Project Category** taxonomy

**To add Services:**
1. Navigate to **Services → Add New** in the WordPress dashboard
2. Enter the service **Title**
3. Set the **Service Number** as a custom field
4. Add the **Featured Image** if required
5. Enter the **Detailed Description** in the content editor
6. Add custom fields:
   - `involves` (rich text)
   - `solves` (rich text)
   - `receive` (rich text)
   - `deliverables` (comma-separated list)

**To set Homepage Content:**
1. Navigate to **Appearance → Customize** → Cachi Studio Settings
2. Edit the homepage fields as needed
3. Click "Publish" to save

### Step 4: Image Migration

**Project Thumbnails:**
- Original images are in: `C:\Users\caleb\cachi-studio\public\images\`
- Files: `work-kilo.svg`, `work-orbit.svg`, `work-campaign.svg`, `work-bloom.svg`, `work-loop.svg`, `work-paper.svg`, `studio-wall.svg`
- **To add**: 
  1. Go to **Media → Add New** in WordPress
  2. Upload each SVG/PNG file
  3. Set as featured image when editing each project
  4. Or use the "Add New" button in the project editor

**Studio Wall Image:**
- File: `studio-wall.svg` (used on case study pages)
- Add via **Media → Add New** and use in the theme

### Step 5: Verify Migration

After importing, verify:
- [ ] All 7 projects appear in the Work archive
- [ ] Project detail pages render correctly
- [ ] Project categories filter correctly
- [ ] All 4 services appear in the Services archive
- [ ] Homepage displays correctly with custom content
- [ ] Navigation works (All pages accessible)
- [ ] Contact form is functional
- [ ] 404 page works for broken links

---

## 6. CUSTOMIZATION

### Adding/Editing Homepage Content

1. **Log into WordPress dashboard**
2. **Navigate to** Appearance → Customize → Cachi Studio Settings
3. **Edit the following fields**:
   - Hero tagline and subtitle
   - About description
   - Pillar 1-3 titles and content
   - Final CTA title and subtitle
   - Contact email and WhatsApp number
   - Form endpoint URL (optional)
4. **Click "Publish"** to save changes

### Adding Projects

1. Navigate to **Projects → Add New**
2. Fill in the project details:
   - Title (used as project name)
   - Featured image (project thumbnail)
   - Content area (description)
   - Project Category (taxonomy)
   - Custom fields: concept, year, challenge, insight, solution, exploration, outcome, deliverables
3. Click "Publish"

### Adding Services

1. Navigate to **Services → Add New**
2. Fill in the service details:
   - Title
   - Service number (custom field)
   - Detailed description (content editor)
   - Custom fields: involves, solves, receive, deliverables
3. Click "Publish"

### Customizing the Contact Form

1. **Configure email settings** via Customizer → Cachi Studio Settings → Contact Email
2. **Set form endpoint** if using a service like Formspree/Basin:
   - Enter the full URL (e.g., `https://formspree.io/f/abc123`)
   - Leave blank to use email submission
3. **Test the form** by submitting a test enquiry

### Changing Brand Colors

The theme uses CSS custom properties defined in `style.css`. To modify colors:

1. Edit `style.css` or use the Customizer's color settings
2. The color tokens are:
   - `--color-ink: #101010` (primary background/text)
   - `--color-volt: #F1ED28` (accent/yellow)
   - `--color-paper: #F4F4F0` (light background)
   - `--color-fog: #858585` (muted text)

### Adding Social Links

1. Edit the footer via **Appearance → Customize** or directly edit `footer.php`
2. Update the social media URLs in the footer social list:
   ```html
   <li><a href="https://linkedin.com/yourprofile" class="transition hover:text-volt">LINKEDIN</a></li>
   <li><a href="https://instagram.com/yourhandle" class="transition hover:text-volt">INSTAGRAM</a></li>
   <li><a href="https://behance.net/yourprofile" class="transition hover:text-volt">BEHANCE</a></li>
   ```

---

## 7. TROUBLESHOOTING

### Common Issues

#### 1. "White Screen of Death" (WSOD)
**Cause**: PHP error in a theme or plugin file
**Solution**:
- Enable WP_DEBUG in `wp-config.php`: `define( 'WP_DEBUG', true );`
- Check the error message and file location
- Disable recently added plugins or theme modifications

#### 2. Projects not appearing in the Work archive
**Cause**: 
- Projects not published or set to draft status
- Custom fields not set correctly
- Taxonomy not assigned
**Solution**:
- Check **Projects → All Projects** - ensure status is "Published"
- Verify **Project Category** is assigned in the sidebar
- Ensure `custom-fields` is in the post type supports (it is by default)

#### 3. Contact form not submitting
**Cause**:
- Form endpoint not configured and email not working
- Nonce mismatch
- Server mail settings incorrect
**Solution**:
- Go to **Appearance → Customize** → Cachi Studio Settings
- Enter a **Form Endpoint URL** if using a form service
- Or ensure the site can send email (contact hosting provider)
- Check the browser console for error messages

#### 4. Custom fields not showing
**Cause**:
- `custom-fields` not enabled for the post type
- Using ACF instead of native WordPress custom fields
**Solution**:
- The theme uses native WordPress custom fields
- Go to **Screen Options** (top right of admin page) and ensure "Custom Fields" is checked
- Or use the WordPress block editor's "Custom Fields" section

#### 5. Mobile menu not working
**Cause**:
- JavaScript not loading
- Conflict with other plugins
**Solution**:
- Ensure the theme is properly enqueuing scripts
- Check for JavaScript errors in the browser console (F12)
- Try disabling other plugins to check for conflicts

#### 5. Animations not working
**Cause**:
- framer-motion not available in WordPress (it's React-specific)
- Theme uses CSS animations instead
**Solution**:
- The theme replaces framer-motion animations with pure CSS
- Key animations preserved:
  - Scroll-triggered reveals (using CSS + minimal JS)
  - Hover transitions and effects
  - Marquee infinite scrolling
  - Navbar scroll effect
- Some complex framer-motion sequences may simplify to CSS equivalents

#### 6. Images not displaying
**Cause**:
- Featured image not set
- Image path incorrect
- File permissions
**Solution**:
- Set a **Featured Image** for each project/service
- Verify image URLs in the theme templates
- Check file permissions on the `wp-content/uploads/` directory
- Use the WordPress Media Library to add and manage images

#### 7. Demo content doesn't match the original site
**Cause**:
- TinaCMS had specific rich-text formatting
- WordPress editor may render Markdown/HTML differently
**Solution**:
- Use the WordPress block editor to recreate formatting
- The theme provides the same visual design (colors, typography, layout)
- Content entry will look different but the design is preserved

### Need More Help?

- Check the WordPress **Theme Support** forum
- Review the **migration-plan.md** file in the project root
- Contact a WordPress developer for custom requirements

---

## DEVELOPER NOTES

### Theme Customization

The theme is designed to be highly customizable without requiring code changes. Most configuration is done through the WordPress Customizer:

- `Appearance → Customize → Cachi Studio Settings`

### Adding New Template Parts

To add reusable template parts:

1. Create a new file in `wp-content/themes/cachi-studio/template-parts/`
2. Follow the naming convention: `*-part.php`
3. Include the part in other templates using `get_template_part( 'template-parts/part-name' )`
4. The part can access the current post via `have_posts()` and `the_post()`

### Extending the Contact Form

The contact form AJAX handler is in `cachi-studio-content.php`. To extend:

1. Add new form fields in `footer.php` or the shortcode
2. Add handling in the `cachi_studio_submit_contact_form()` function
3. Update the success/failure messages in the JavaScript

### Preserving Animations

The original used framer-motion for React. The WordPress version uses:
- **CSS transitions** for hover effects and subtle animations
- **vanilla JavaScript** for scroll effects and mobile menu
- **WordPress Core** features for content animations

Key animations preserved from the original:
- Marquee infinite scroll
- Reveal-on-scroll effects
- Navbar background change on scroll
- Project card hover transitions
- Service item interactions
- Form status messages

### SEO Considerations

The theme includes:
- Semantic HTML5 markup
- Proper heading hierarchy (h1, h2, h3...)
- `wp_head()` for meta tags and scripts
- Schema-ready structure
- Customizable title tags via WordPress settings
- Descriptive alt text for images (set in Media Library)
- SEO-friendly URLs (project slugs preserved)

### Performance

- No external CSS/JS frameworks (all assets enqueued locally)
- Google Analytics only loaded when configured (no default tracking)
- Contact form uses native WordPress AJAX (no external dependencies)
- Images use lazy loading (`loading="lazy"`)
- Efficient CSS with minimal selectors
- CSS custom properties for theming (no dynamic CSS generation)

---

## SUPPORTED WORDPRESS FEATURES

✅ Custom Post Types: Projects, Services  
✅ Custom Taxonomy: Project Category  
✅ Theme Customizer: Homepage settings  
✅ Contact Form: AJAX submission, validation, spam protection  
✅ Featured Images: Project and service thumbnails  
✅ Menus: Primary and footer navigation  
✅ Widgets: Footer widget areas  
✅ Media Library: Image management  
✅ SEO: Semantic markup, title tags, meta descriptions  
✅ Accessibility: Skip links, ARIA labels, focus states  
✅ Responsive Design: Mobile-first approach  
✅ Form Nonces: Secure form submission  
✅ Clean URL Structures: `/project/slug`, `/service-slug`  

---

## UNINSTALLING

To completely remove the theme and plugin:

1. **Deactivate the Cachi Studio Content plugin**
2. **Delete the plugin** `cachi-studio-content`
3. **Deactivate the Cachi Studio theme**
4. **Delete the theme** `cachi-studio`
5. **Remove the WordPress directory** if no longer needed

**Note**: This will not delete your WordPress site content (posts, pages, media), only the theme and plugin-specific data.

---