# WordPress Installation Steps for Cachi Studio Migration

## PowerShell-Compatible Installation Commands

### Option A: Using LocalWP (Recommended)

#### Step 1: Download LocalWP
1. Go to https://localwp.com
2. Download the Windows installer
3. Run the installer (accept defaults, use PowerShell-compatible path)

#### Step 2: Create the Cachi Studio Site
1. Open LocalWP (via Start menu or desktop shortcut)
2. Click "Create Site"
3. Enter:
   - **Site name**: `cachi-studio`
   - **Environment**: PHP 8.1 + Nginx (or default)
   - Click "Create Site"

#### Step 3: Wait for Installation
- LocalWP will automatically:
  - Install WordPress
  - Create a MySQL database
  - Set up PHP-FPM and Nginx
  - Configure WordPress wp-config.php

#### Step 4: Log In
1. Once the site is "Online", click the "Admin" button
2. OR visit: `http://cachi-studio.test/wp-admin` (or your local domain)
3. Log in with:
   - **Username**: admin (or the auto-generated one)
   - **Password**: the auto-generated password shown in LocalWP
   - **URL**: your local site URL

#### Step 5: Install the Theme and Plugin
In the WordPress dashboard:

1. **Upload the theme**:
   - Go to Appearance → Themes → Add New → Upload Theme
   - Select: `C:\Users\caleb\cachi-studio\wordpress\wp-content\themes\cachi-studio\style.css`
   - Wait for upload, then click "Activate"

2. **Upload the plugin**:
   - Go to Plugins → Add New → Upload Plugin
   - Select: `C:\Users\caleb\cachi-studio\wordpress\wp-content\plugins\cachi-studio-content\cachi-studio-content.php`
   - Wait for upload, then click "Install Now" then "Activate"

3. **Configure settings**:
   - Go to Appearance → Customize → Cachi Studio Settings
   - Set:
     - Contact Email: `hello@cachi.studio`
     - Contact WhatsApp: `+00 000 000 000` (replace with real number)
     - Form Endpoint: Leave blank (use email submission) OR set if using Formspree/Basin
     - Hero tagline, subtitle, pillars, CTA text as desired

4. **Set permalinks**:
   - Go to Settings → Permalinks
   - Select "Post name"
   - Click "Save Changes"

5. **Add your first project**:
   - Go to Projects → Add New
   - Enter Title (e.g., "Kilo Atlas")
   - Set Featured Image (Set featured image → Upload/Add from library)
   - Add the project image from original project: `C:\Users\caleb\cachi-studio\public\images\work-kilo.svg`
   - Set Project Category (add new term if needed)
   - Custom fields will appear below the editor (concept, year, challenge, insight, solution, exploration, outcome, deliverables)
   - Publish

6. **Add your first service**:
   - Go to Services → Add New
   - Enter Title (e.g., "Brand & Identity")
   - Add custom field "number" (in the Custom Fields meta box, or use the content editor)
   - Set Featured Image if required
   - Custom fields: involves, solves, receive, deliverables
   - Publish

7. **Set up navigation**:
   - Go to Appearance → Menus
   - Create a new menu named "Primary"
   - Add links to: Home, Work, Services, Studio, Contact
   - Check "Primary menu" location
   - Save Menu

8. **Upload project images**:
   - Go to Media → Add New
   - Drag and drop all images from: `C:\Users\caleb\cachi-studio\public\images\`
   - Files: work-kilo.svg, work-orbit.svg, work-campaign.svg, work-bloom.svg, work-loop.svg, work-paper.svg, studio-wall.svg
   - Set as featured images on each project

### Option B: Manual WordPress Installation

#### Step 1: Install XAMPP/WAMP (if not already have it)
1. Download XAMPP for Windows from https://apachefriends.org/xampp-files/
2. Run the installer (accept defaults, installs to `C:\xampp\`)
3. Start XAMPP Control Panel
4. Start Apache and MySQL services

#### Step 2: Download WordPress
1. Go to https://wordpress.org/download/
2. Download the latest WordPress version
3. Extract the zip file

#### Step 3: Set Up WordPress Directory
1. Create: `C:\xampp\htdocs\cachi-studio\`
2. Extract WordPress contents into this directory
3. Your structure should be:
   ```
   C:\xampp\htdocs\cachi-studio\
   ├── wp-admin/
   ├── wp-includes/
   ├── wp-content/
   │   ├── themes/
   │   └── plugins/
   ├── wp-config.php
   └── .htaccess
   ```

#### Step 4: Configure Database
1. Go to http://localhost/phpmyadmin/ in your browser
2. Create a new database named `cachi_studio`
3. Note the database name, username (root), and password (empty by default)

#### Step 5: Configure wp-config.php
1. Edit `C:\xampp\htdocs\cachi-studio\wp-config.php`
2. Update the database settings:
   ```php
   /** The name of the database */
   define( 'DB_NAME', 'cachi_studio' );
   
   /** MySQL database hostname */
   define( 'DB_HOST', 'localhost' );
   
   /** MySQL database username */
   define( 'DB_USER', 'root' );
   
   /** MySQL database password */
   define( 'DB_PASSWORD', '' );
   ```
3. Alternatively, run the famous 5-minute installation:
   - Visit `http://localhost/cachi-studio/` in your browser
   - Follow the setup wizard (language, database, admin user, etc.)

#### Step 5: Complete Installation
1. Visit `http://localhost/cachi-studio/` (or your configured domain)
2. Follow the WordPress installation wizard:
   - Choose language
   - Enter database settings (or let it auto-detect)
   - Set site title, admin username, password, email
   - Click "Install WordPress"

#### Step 6: Log In
1. Visit `http://localhost/cachi-studio/wp-admin/`
2. Log in with your admin credentials

#### Step 7: Install Theme and Plugin (same as Option A, steps 5-8 above)

### Option C: Hosting Provider (One-Click)

#### Step 1: Choose a Hosting Provider
- SiteGround, Bluehost, A2 Hosting, WP Engine, etc.
- Most offer one-click WordPress installation

#### Step 2: One-Click Install
1. Log into your hosting control panel (cPanel, Plesk, etc.)
2. Look for "WordPress Installer" or "Softaculous"
3. Click and follow the prompts:
   - Domain selection
   - Directory (leave blank for root)
   - Admin username/password
   - Wait for installation

#### Step 2: Install Theme and Plugin
1. Log into your WordPress dashboard (usually `yourdomain.com/wp-admin`)
2. Follow the same steps as Option A, steps 5-8

---

## Post-Installation Checklist

### Essential Settings
- [ ] WordPress installed and accessible
- [ ] Theme "Cachi Studio" activated
- [ ] Plugin "Cachi Studio Content" activated
- [ ] Permalinks set to "Post name" (Settings → Permalinks)
- [ ] Homepage settings configured (Customizer → Cachi Studio Settings)
- [ ] Contact email and WhatsApp number set
- [ ] Form endpoint configured or left blank for email

### Content Population
- [ ] 7 projects created (Projects → Add New)
  - Each with: Title, Featured Image, Project Category, custom fields (concept, year, challenge, insight, solution, exploration, outcome, deliverables)
- [ ] 4 services created (Services → Add New)
  - Each with: Title, Service number custom field, custom fields (involves, solves, receive, deliverables)
- [ ] Navigation menu created (Appearance → Menus)
- [ ] Menu assigned to "Primary" location

### Image Upload
- [ ] All 7 project images uploaded via Media → Add New
  - From: `C:\Users\caleb\cachi-studio\public\images\`
  - work-kilo.svg, work-orbit.svg, work-campaign.svg, work-bloom.svg, work-loop.svg, work-paper.svg
- [ ] studio-wall.svg uploaded (for case study pages)
- [ ] Featured images set on each project and service

### Testing
- [ ] Homepage loads correctly (displays hero, intro, work grid, services, approach, why cachi, cta)
- [ ] Project pages accessible (Work page → project card → detail page)
- [ ] Service pages accessible (Services page → service card → detail page)
- [ ] Contact form submits (test with submit button)
- [ ] Navigation works (all links go to correct pages)
- [ ] Footer displays correctly (links, copyright, WhatsApp)
- [ ] 404 page works for broken URLs
- [ ] Browser console has no errors (F12 → Console tab)
- [ ] Responsive: resize browser window, check mobile/desktop views

### Customization
- [ ] Add social media links to footer (Appearance → Customize or edit footer-part.php)
- [ ] Update WhatsApp number to real value
- [ ] Add/remove projects/services as needed
- [ ] Adjust homepage content via Customizer → Cachi Studio Settings
- [ ] Modify colors if needed in style.css (color tokens: --color-ink, --color-volt, --color-paper, --color-fog)

---

## Troubleshooting

### Common Issues

**1. White Screen of Death (WSOD)**
- **Cause**: PHP error in theme/plugin
- **Fix**: 
  - Enable debugging: Add `define( 'WP_DEBUG', true );` to wp-config.php
  - Check error message for file and line number
  - Disable recently added theme/custom code

**2. Projects not appearing in Work archive**
- **Cause**: Posts in draft status, wrong category, missing featured image
- **Fix**:
  - Go to Projects → All Projects
  - Ensure status is "Published" for each
  - Verify Project Category is assigned in the sidebar
  - Set a Featured Image for each project

**3. Contact form not submitting**
- **Cause**: No form endpoint configured, mail not working on server
- **Fix**:
  - For email: Ensure your server can send mail (contact host)
  - For service: Set Form Endpoint URL in Customizer → Cachi Studio Settings
  - Test with a different browser or incognito mode

**4. Custom fields not showing**
- **Cause**: Screen Options hidden, plugin not activated
- **Fix**:
  - Top right of admin page: Click "Screen Options"
  - Check "Custom Fields" box
  - Ensure "Cachi Studio Content" plugin is activated

**5. Images not displaying**
- **Cause**: Featured image not set, wrong path
- **Fix**:
  - Set Featured Image on each project/service post
  - Use Media → Add New to upload images from original project folder
  - Check image URLs in the theme templates

**6. Mobile menu not opening**
- **Cause**: JavaScript conflict, theme not enqueuing scripts
- **Fix**:
  - Check for JavaScript errors in browser console (F12)
  - Try disabling other plugins one by one
  - Ensure the theme is properly activated

**7. Design looks different than the original**
- **Cause**: Different content structure, WordBlock Editor vs TinaCMS
- **Fix**:
  - The visual design (colors, typography, layout) is preserved identically
  - Content entry workflow is different (WordPress dashboard vs TinaCMS)
  - Use the Customizer for content, not code edits for design changes
  - Refer to the original Vercel site: https://cachi-studio.vercel.app/ for visual reference

### Need More Help?
- Review `INSTALLATION_GUIDE.md` for detailed steps
- Check `MIGRATION_SUMMARY.md` for design preservation details
- The original Vite project at `C:\Users\caleb\cachi-studio` is preserved unchanged
- Contact a WordPress developer for custom requirements beyond the scope of this migration

---