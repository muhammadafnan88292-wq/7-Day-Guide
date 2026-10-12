# AI DigiExperts — Day 6 Mini Website

A responsive three-page front-end mini website built for the Day 6 Independent Project assignment.

## Pages
- **Home (`index.html`)** — Hero, dynamically loaded featured services, learning steps, CTA.
- **Services (`services.html`)** — Service cards loaded from JSON with interactive category filters.
- **Contact (`contact.html`)** — Email, phone, and accessible demo form with client-side validation.

## Technologies
HTML5, CSS3 (CSS variables, Flexbox, Grid, media queries), vanilla JavaScript, and local JSON.

## JavaScript features
- Responsive mobile navigation with `aria-expanded`, Escape key support, and outside-click close.
- Dynamic content loaded with `fetch('services.json')` and rendered using DOM methods.
- Interactive service filters.
- Contact form with required fields, email validation, minimum lengths, focus management, and live status messages.
- IntersectionObserver reveal animations with reduced-motion support.
- Automatic copyright year.

## How to run locally
1. Download or clone the repository.
2. Open the folder in **Visual Studio Code**.
3. Install the **Live Server** extension if needed.
4. Right-click `index.html` and choose **Open with Live Server**.
5. Navigate between Home, Services, and Contact. Do not double-click the HTML file using `file://` because dynamic `fetch()` may be blocked.

Alternatively, with Python installed, run `python -m http.server 8000` inside the project directory, then visit `http://localhost:8000/`.

## Deployment (GitHub Pages)
1. Create a public GitHub repository and push all project files to its root.
2. Open repository **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**, then `main` and `/ (root)`.
4. Save and wait for deployment.
5. Open the Pages URL shown by GitHub and test all three pages and service filters.

## Testing checklist
- [ ] Home, Services, and Contact open on desktop and mobile.
- [ ] Mobile menu opens and closes with click, link selection, and Escape.
- [ ] Featured service cards and all service cards load.
- [ ] Service filters change displayed cards.
- [ ] Contact form shows errors for missing/invalid fields and success for valid inputs.
- [ ] All navigation, mailto, and phone links work.
- [ ] No horizontal overflow on mobile.
- [ ] Lighthouse scores are measured and recorded (not assumed).

## Screenshots to capture
Save real browser screenshots to `screenshots/`: `home-desktop.png`, `home-mobile.png`, `services-desktop.png`, `services-mobile.png`, `contact-desktop.png`, `contact-mobile.png`.

## Contact information
Email: muhammadafnan88292@gmail.com  
Phone: 03437493408

## Important notes
This is an **internship demonstration** and the service descriptions are examples, not verified official AI DigiExperts offerings. The form performs **front-end validation only**: it does not send or store enquiries. For real submission, integrate a backend or a trusted form service with proper consent and security. Deployment URL and actual screenshots must be added after publishing and testing.

**Live website:** _Add your actual GitHub Pages URL here after deployment._
