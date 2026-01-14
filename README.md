# KiwiHacks Linktree Clone

A custom Linktree-style page for KiwiHacks with easy markdown-based link management.

## Features

- 🎨 Warm brown theme matching the original Linktree style
- 📱 Fully responsive design
- 🔗 Rounded corner buttons with hover effects
- 📝 Simple markdown file for managing links
- 🖼️ Support for image icons
- 🚀 Smooth animations
- 💬 Social media icons

## Setup

### 1. Basic Setup

Simply open `index.html` in a browser or run a local server:

```bash
python3 -m http.server 8080
```

Then visit `http://localhost:8080`

### 2. Add Your Logo

Replace the placeholder with your logo:
1. Save your logo as `assets/logo.png`
2. Refresh the page

### 3. Edit Links

Open `links.md` and edit your links using this format:

```markdown
- [Link Title](https://url.com) | https://icon-url.com/icon.png | featured
```

**Format breakdown:**
- `[Link Title](URL)` - The button text and destination
- `| image-url` - URL to an icon image (optional)
- `| featured` - Makes the button tan/highlighted (optional)

**Example:**
```markdown
- [KiwiHacks Website](https://kiwihacks.org/) | https://kiwihacks.org/favicon.ico | featured
- [Join our Discord](https://discord.gg/war7YQqz4s) | https://discord.com/icon.png
- [Follow on Instagram](https://instagram.com/kiwihacks) | https://instagram.com/favicon.ico
```

## Customization

### Colors

Edit `styles.css` to change:

- Background color: Look for `background: #43302b`
- Featured button color: Search for `#d4a574`
- Button colors in `.link-button` and `.link-button.featured`

### Profile

Edit `index.html` to change:

- Avatar image (upload to `assets/logo.png`)
- `@KiwiHacks` title
- Tagline text
- Social media links in the icons section

## Deployment

### GitHub Pages

1. Push to a GitHub repository
2. Go to Settings > Pages
3. Select "Deploy from a branch"
4. Choose `main` branch

### Netlify

1. Drag and drop the folder to [Netlify Drop](https://app.netlify.com/drop)
2. Or connect your GitHub repo

### Vercel

1. Import the project from GitHub
2. Deploy automatically

## File Structure

```
LinktreeKiwiHacks/
├── index.html              # Main HTML file
├── styles.css              # All styling
├── script.js               # Link loading & rendering
├── links.md                # Edit this to manage your links
├── assets/
│   ├── logo.png            # Your logo (add this)
│   └── logo-placeholder.svg # Placeholder shown before logo added
└── README.md               # This file
```

## License

MIT - Feel free to use and modify for your own projects!
