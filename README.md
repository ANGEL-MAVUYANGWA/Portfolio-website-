# Angel Shiluva Mavuyangwa — Portfolio Website

A modern, fully responsive personal portfolio website built with pure HTML, CSS, and vanilla JavaScript — no frameworks, no build tools, no dependencies.

---

## Live Preview

Open `index.html` in any modern browser. No server required.

---

## Project Structure

```
portfolio/
├── index.html          # Home — hero, skills preview, featured projects
├── about.html          # About — biography, education, skill bars
├── projects.html       # Projects — filterable project grid
├── contact.html        # Contact — info panel + contact form
│
├── css/
│   └── style.css       # All styles (design tokens, layout, components)
│
├── js/
│   ├── icons.js        # Custom SVG icon library (replaces all emojis & Font Awesome)
│   └── script.js       # All interactivity (navbar, typewriter, filters, modal, form)
│
├── images/
│   └── profile.png     # Profile photo
│
├── Files/
│   └── MAVUYANGWA_ANGEL_CV.docx   # CV (triggers download from modal)
│
└── README.md
```

---

## Features

### Design
- **Dark theme** — Midnight Navy (`#0d1b2a`) base with Electric Teal (`#00d4aa`) accent
- **Google Fonts** — Space Grotesk (headings) + Inter (body) loaded via CDN
- **Gradient text** — teal-to-blue gradient on key headings
- **Glassmorphism navbar** — frosted blur with scroll-shadow effect
- **Floating tech badges** — animated SVG icons orbiting the hero profile image
- **Animated availability badge** — pulsing green dot indicating open-to-work status

### Icons
All emojis and Font Awesome icons from the original project have been replaced with **custom inline SVG icons** defined in `js/icons.js`. Icons are injected at runtime using a `data-icon` attribute:

```html
<span class="icon" data-icon="java"></span>
```

Available icon keys: `code`, `menu`, `x`, `java`, `python`, `react`, `database`, `chartLine`, `javascript`, `sql`, `springBoot`, `cloud`, `docker`, `git`, `blockchain`, `fitness`, `stockChart`, `camera`, `bank`, `mortarboard`, `award`, `briefcase`, `mail`, `mapPin`, `linkedin`, `github`, `send`, `download`, `arrowRight`, `chevronRight`, `check`, `checkCircle`, `robot`, `clipboard`, `laptop`, `barChart`, `spinner`, `leaf`, `users`, `brain`, `close`.

### Pages

#### `index.html` — Home
- Animated typewriter cycling through roles
- Hero stats (Projects, Academic Grade, Tech Expertise)
- Floating animated tech badges around profile image
- Skills preview card grid (6 cards, hover gradient reveal)
- Featured projects (3 cards)
- CV download modal (3 tailored CV variants)

#### `about.html` — About
- Biography section with profile image
- Academic highlights: 3 quick-stat cards (Degree, Distinctions, BA)
- Education card with individual module results
- Animated skill progress bars (triggered on scroll via IntersectionObserver)
- Skill category tags (Databases, Core Concepts, Business Analysis)

#### `projects.html` — Projects
- Filter buttons: All / Full-Stack / ML / Blockchain / Computer Vision / Desktop
- 6 project cards with tech stack tags and GitHub links:
  - JavaChain — Enterprise Blockchain
  - FitMetric Pro — Health & Fitness API
  - Stock Price Forecasting System
  - Real-Time Object Detection (OpenCV + YOLO)
  - Bank Management System
  - Customer Churn Prediction (XGBoost + SHAP)
- GitHub CTA card at the bottom

#### `contact.html` — Contact
- Contact info panel: email, location, LinkedIn, GitHub
- Availability card with animated check icon
- Contact form: name, email, subject selector, message
- Form validation + mailto fallback on submit

### Interactions
| Feature | Behaviour |
|---|---|
| Navbar | Blur + shadow on scroll; hamburger slide-in on mobile |
| Typewriter | Cycles through 5 role descriptions with realistic timing |
| Scroll Reveal | `.reveal` elements fade + slide up via IntersectionObserver |
| Skill Bars | Progress fill animates when scrolled into view |
| Project Filter | Instant show/hide with active button state |
| CV Modal | Slide-up modal with 3 CV variant buttons → download |
| Contact Form | Client-side validation → mailto link fallback |
| Download Toast | Bottom-right notification on CV download |

---

## Customisation

### Update personal details
Edit the following in all four HTML files:
- Name, email address, LinkedIn/GitHub URLs
- Location string in `contact.html`

### Add a new icon
In `js/icons.js`, add a new key to the `ICONS` object:
```js
myIcon: `<svg viewBox="0 0 24 24" ...>...</svg>`,
```
Then use it anywhere in HTML:
```html
<span class="icon" data-icon="myIcon"></span>
```

### Add a new project
In `projects.html`, copy any `.project-card` block and:
1. Set `data-category` to one of: `fullstack`, `ml`, `blockchain`, `cv`, `desktop`
2. Update the `data-icon` attribute, title, description, and tech tags
3. Update the GitHub link

### Change the colour accent
In `css/style.css`, update `:root`:
```css
--teal:     #00d4aa;   /* primary accent */
--accent:   #4f9cf9;   /* secondary accent */
```

### Add a real CV per role
The modal currently serves the same `.docx` for all three role buttons.  
To serve separate files, update `downloadCv()` in `js/script.js`:
```js
const cvMap = {
  'business-analyst': 'Files/CV_BusinessAnalyst.docx',
  'software-dev':     'Files/CV_SoftwareDev.docx',
  'data-science':     'Files/CV_DataScience.docx',
};
const cvFile = cvMap[type] || 'Files/MAVUYANGWA_ANGEL_CV.docx';
```

---

## Browser Support

| Browser | Support |
|---|---|
| Chrome 90+ | ✅ Full |
| Firefox 88+ | ✅ Full |
| Safari 14+ | ✅ Full |
| Edge 90+ | ✅ Full |
| IE 11 | ❌ Not supported |

Uses: CSS custom properties, `IntersectionObserver`, `backdrop-filter`, CSS Grid/Flexbox.

---

## Performance Notes

- Zero external JS dependencies (no jQuery, no icon fonts)
- SVG icons injected inline — no network requests per icon
- Google Fonts loaded with `display=swap` to prevent FOIT
- Images: only `profile.png` — keep it under 200 KB for fast loads
- All animations use `transform` and `opacity` — GPU-composited, no layout thrash

---

## Deployment

### GitHub Pages
```bash
# Push to a repo, then enable Pages from the repo Settings
git init
git add .
git commit -m "Initial portfolio"
git remote add origin https://github.com/YOUR_USERNAME/portfolio.git
git push -u origin main
```
Enable **Settings → Pages → Branch: main / root**.

### Netlify (drag & drop)
Drag the `portfolio/` folder onto [netlify.com/drop](https://netlify.com/drop). Done.

### Vercel
```bash
npx vercel
```
Select the `portfolio/` directory when prompted.

---

## Credits

- **Design & Code** — Angel Shiluva Mavuyangwa
- **Fonts** — [Google Fonts](https://fonts.google.com) (Space Grotesk, Inter)
- **Icons** — Custom SVG icons authored in `js/icons.js`; Java logo from [Simple Icons](https://simpleicons.org); Docker logo from [Docker Docs](https://docs.docker.com)

---

## License

MIT — free to use, modify, and distribute with attribution.

---

*Built with HTML · CSS · Vanilla JS — no build step, no bloat.*
