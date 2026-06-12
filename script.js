// DOM Elements
const linksContainer = document.getElementById('links-container');
const socialIconsContainer = document.getElementById('social-icons');

// Icon mapping for Font Awesome
const ICON_MAP = {
    'instagram': 'fab fa-instagram',
    'discord': 'fab fa-discord',
    'facebook': 'fab fa-facebook',
    'twitter': 'fab fa-twitter',
    'x': 'fab fa-x-twitter',
    'youtube': 'fab fa-youtube',
    'tiktok': 'fab fa-tiktok',
    'linkedin': 'fab fa-linkedin',
    'github': 'fab fa-github',
    'globe': 'fas fa-globe',
    'website': 'fas fa-globe',
    'envelope': 'fas fa-envelope',
    'email': 'fas fa-envelope',
    'phone': 'fas fa-phone',
    'rocket': 'fas fa-rocket',
    'calendar': 'fas fa-calendar-days',
    'form': 'fas fa-clipboard-list',
    'link': 'fas fa-link'
};

// Parse socials from Markdown file
async function fetchSocialsFromMarkdown() {
    try {
        const response = await fetch('content/socials.md');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const markdown = await response.text();
        
        // Parse markdown: - [Label](URL) | icon-name
        const socialRegex = /^-\s*\[([^\]]+)\]\(([^)]+)\)(?:\s*\|\s*([^\n]+))?/gm;
        const socials = [];
        let match;
        
        while ((match = socialRegex.exec(markdown)) !== null) {
            socials.push({
                label: match[1].trim(),
                url: match[2].trim(),
                icon: match[3]?.trim().toLowerCase() || 'globe'
            });
        }
        
        return socials.length > 0 ? socials : null;
    } catch (error) {
        console.error('Error fetching socials.md:', error);
        return null;
    }
}

// Fallback socials
const FALLBACK_SOCIALS = [
    { label: 'Instagram', url: 'https://instagram.com/kiwihacks', icon: 'instagram' },
    { label: 'Discord', url: 'https://discord.gg/war7YQqz4s', icon: 'discord' },
    { label: 'Website', url: 'https://kiwihacks.org/', icon: 'globe' }
];

// Render social icons
function renderSocials(socials) {
    socialIconsContainer.innerHTML = '';
    
    socials.forEach(social => {
        const a = document.createElement('a');
        a.href = social.url;
        a.target = social.url.startsWith('mailto:') ? '_self' : '_blank';
        a.rel = 'noopener';
        a.setAttribute('aria-label', social.label);
        
        const iconClass = ICON_MAP[social.icon] || 'fas fa-link';
        a.innerHTML = `<i class="${iconClass}"></i>`;
        
        socialIconsContainer.appendChild(a);
    });
}

// Parse links from Markdown file
async function fetchLinksFromMarkdown() {
    try {
        const response = await fetch('content/links.md');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const markdown = await response.text();
        
        // Parse markdown links
        // Format: - [Title](URL) | emoji | featured
        const linkRegex = /^-\s*\[([^\]]+)\]\(([^)]+)\)(?:\s*\|\s*([^\||\n]+))?(?:\s*\|\s*(featured))?/gm;
        const links = [];
        let match;
        
        while ((match = linkRegex.exec(markdown)) !== null) {
            links.push({
                title: match[1].trim(),
                url: match[2].trim(),
                icon: match[3]?.trim() || '🔗',
                featured: match[4]?.toLowerCase() === 'featured'
            });
        }
        
        if (links.length === 0) {
            console.log('No links found in markdown file.');
            return null;
        }
        
        return links;
    } catch (error) {
        console.error('Error fetching links.md:', error);
        return null;
    }
}

// Fallback links if markdown fails
const FALLBACK_LINKS = [
    { title: 'KiwiHacks Nova', url: 'https://nova.kiwihacks.org', icon: 'rocket', featured: true },
    { title: 'Sign up for KiwiHacks Nova', url: 'https://kiwihacks.fillout.com/nova', icon: 'form', featured: true },
    { title: 'KiwiHacks Website', url: 'https://kiwihacks.org/', icon: 'globe', featured: true },
    { title: 'Join our Discord', url: 'https://discord.gg/war7YQqz4s', icon: 'discord', featured: false },
    { title: 'Follow us on Instagram', url: 'https://instagram.com/kiwihacks', icon: 'instagram', featured: false }
];

// Create link button element
function createLinkButton(link) {
    const a = document.createElement('a');
    a.href = link.url;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    a.className = `link-button${link.featured ? ' featured' : ''}`;

    // Icon or Image
    let iconHtml;
    const iconValue = link.icon.trim();
    const iconKey = iconValue.toLowerCase();
    const iconClass = ICON_MAP[iconKey];
    const iconModifier = iconKey.replace(/[^a-z0-9-]/g, '-');
    const isImagePath = iconValue.startsWith('http') || iconValue.startsWith('assets/') || iconValue.endsWith('.png') || iconValue.endsWith('.jpg') || iconValue.endsWith('.svg');
    
    if (link.imageUrl) {
        iconHtml = `<img src="${link.imageUrl}" alt="${link.title}" class="link-icon" onerror="this.style.display='none'">`;
    } else if (isImagePath) {
        iconHtml = `<img src="${iconValue}" alt="${link.title}" class="link-icon" onerror="this.style.display='none'">`;
    } else if (iconClass) {
        iconHtml = `<div class="link-icon-symbol link-icon-${iconModifier}" aria-hidden="true"><i class="${iconClass}"></i></div>`;
    } else {
        iconHtml = `<div class="link-icon-placeholder">${iconValue}</div>`;
    }

    a.innerHTML = `
        ${iconHtml}
        <span class="link-text">${link.title}</span>
        <i class="fas fa-chevron-right link-arrow"></i>
    `;

    return a;
}

// Render links
function renderLinks(links) {
    linksContainer.innerHTML = '';
    
    links.forEach(link => {
        const button = createLinkButton(link);
        linksContainer.appendChild(button);
    });
}

// Initialize
async function init() {
    // Fetch socials from markdown file
    const mdSocials = await fetchSocialsFromMarkdown();
    const socials = mdSocials || FALLBACK_SOCIALS;
    renderSocials(socials);
    
    // Fetch links from markdown file
    const mdLinks = await fetchLinksFromMarkdown();
    const links = mdLinks || FALLBACK_LINKS;
    renderLinks(links);
}

// Run on page load
document.addEventListener('DOMContentLoaded', init);
