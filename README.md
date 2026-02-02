# EchoSee — Smart Glasses for the Hearing Impaired
## Accessible Website Development Project

**Project Objective:** Design and develop a modern, animated, accessibility-first website for EchoSee Smart Glasses.

**Responsibilities** Partnerships, FAQ, Contact + Accessibility Lead  

## Project Overview

EchoSee is an AI-powered AR device that provides real-time subtitles to the hearing impaired through smart glasses. This repository contains the **accessibility-first frontend** of the official website, emphasizing semantic HTML, keyboard navigation, screen-reader support, and smooth animations.

### Tagline
> "See What You Cannot Hear"

### Core Features
- Real-time subtitles on AR lens
- Adjustable font size
- Emoji-based emotion display
- Multilingual support (English, Urdu, 20+ premium)
- Works offline with AI chip
- Battery life: 10–12 hours

---

## Day 1 Progress ✅

### Completed Tasks

#### 1. **EchoSee Home Page (index.html)**
   - Hero section with compelling tagline and CTA buttons
   - "Pre-Order Now" and "Learn More" buttons with hover effects
   - Responsive design for mobile, tablet, desktop

#### 2. **Accessible FAQ Accordion**
   - Semantic HTML structure (`<section>`, `<h3>`, `<button>`, `<div role="region">`)
   - ARIA roles: `aria-expanded`, `aria-controls`, `aria-labelledby`, `aria-hidden`, `aria-describedby`
   - Keyboard navigation:
     - **Tab** to navigate between questions
     - **Enter/Space** to toggle answer
     - **Arrow Up/Down** to move focus between questions
     - **Home/End** to jump to first/last question
   - Screen-reader friendly instructions (SR-only text)
   - Only one answer open at a time
   - Smooth expand/collapse animations with fallback for `prefers-reduced-motion`

#### 3. **Styling & Accessibility**
   - Hero section with modern typography and spacing
   - Button styles with focus-visible outlines for keyboard users
   - FAQ button expanded state visual feedback
   - Smooth CSS transitions for animations
   - High contrast text colors (WCAG AA compliant)
   - Responsive design with mobile breakpoints

#### 4. **Bug Fixes**
   - Fixed FAQ accordion collapse issue
   - Proper animation state management
   - Clean panel toggling logic

---

## Project Structure

```
accessible-ui-internship/
├── index.html              # Home page with hero + FAQ
├── css/
│   └── styles.css         # All styling (hero, buttons, FAQ)
├── js/
│   └── main.js            # FAQ accordion logic & keyboard nav
├── README.md              # This file
└── .github/
    └── copilot-instructions.md
```

---

## Features Implemented

### HTML
- ✅ Semantic structure (`<header>`, `<section>`, `<h1>`, `<h2>`, `<button>`)
- ✅ ARIA attributes for accessibility
- ✅ Screen-reader instructions
- ✅ Proper label associations

### CSS
- ✅ Hero section with responsive typography
- ✅ Button styles (primary & secondary)
- ✅ FAQ accordion expand/collapse animations
- ✅ Focus-visible states for keyboard users
- ✅ Reduced motion support (`@media prefers-reduced-motion`)
- ✅ Mobile-first responsive design

### JavaScript
- ✅ FAQ toggle functionality
- ✅ Keyboard event handling (Enter, Space, Arrow keys, Home, End)
- ✅ Single-panel-open logic
- ✅ ARIA state management
- ✅ Animation timing & cleanup
- ✅ Reduced motion detection

### Accessibility (WCAG 2.1 Level AA)
- ✅ Semantic HTML
- ✅ Keyboard navigation
- ✅ Screen reader support
- ✅ Focus visible states
- ✅ Color contrast
- ✅ Reduced motion respect
- ✅ ARIA roles & labels

---

## How to Run Locally

### Option 1: Open Directly (Quick Test)
```bash
# Simply open index.html in your browser
start index.html
```

### Option 2: Local Web Server (Recommended)

**Node.js (http-server):**
```bash
npx http-server -c-1 . -p 8080
```
Then visit: `http://localhost:8080`

**Python 3:**
```bash
python -m http.server 8080
```
Then visit: `http://localhost:8080`

---

## Testing Checklist

### Keyboard Navigation
- [ ] Tab through FAQ buttons
- [ ] Use Enter/Space to toggle answers
- [ ] Use Arrow Up/Down to navigate between questions
- [ ] Use Home/End to jump to first/last question
- [ ] Focus visible outline appears on all buttons

### Screen Reader (NVDA, JAWS, VoiceOver)
- [ ] Reads heading structure correctly
- [ ] Announces button state ("expanded" / "collapsed")
- [ ] Reads SR-only instructions for FAQ
- [ ] Announces panel content when expanded
- [ ] Announces button focus changes

### Visual
- [ ] FAQ panels expand/collapse smoothly
- [ ] Only one panel open at a time
- [ ] Chevron icon rotates on expand/collapse
- [ ] Expanded state has visual highlight
- [ ] Responsive on mobile (<600px)

### Animations
- [ ] Smooth transitions in normal motion preference
- [ ] No animations with `prefers-reduced-motion: reduce`

---

## Git Workflow

All changes are staged, committed with descriptive messages, and pushed to:
```
https://github.com/Junaid-290/accessible-ui-internship.git
```

### Recent Commits
```
3f79eb7 - Rename partnerships.html to index.html
a7a5c33 - Fix FAQ accordion collapse bug - set maxHeight to none instead of clearing
9971b61 - Day 1: EchoSee home page with FAQ accordion, hero section, and stable toggle logic
```

---

## Accessibility Notes

### ARIA Implementation
- `aria-expanded` — Button state (true/false)
- `aria-controls` — Links button to controlled panel
- `aria-hidden` — Hides collapsed panels from screen readers
- `aria-labelledby` — Links panel to button for context
- `aria-describedby` — Links FAQ section to instructions
- `role="region"` — Marks panels as important regions

### Keyboard Support
Follows [WAI-ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/) for accordion pattern.

### Focus Management
- Clear focus outlines via `focus-visible`
- Focus visible only appears on keyboard navigation
- Logical tab order maintained

---

## Browser Support

- ✅ Chrome/Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

---

## Color Palette

```css
--max-width: 760px;
--accent: #0b63ff;    /* Blue */
--bg: #ffffff;        /* White */
--text: #111827;      /* Dark gray */
--muted: #6b7280;     /* Light gray */
```

All color combinations meet WCAG AA contrast requirements.

---

## Development Notes

### Files Modified
- `index.html` — Main home page (renamed from partnerships.html)
- `css/styles.css` — Hero, buttons, FAQ accordion styles
- `js/main.js` — FAQ toggle logic & keyboard navigation

### No External Dependencies
- Pure HTML, CSS, JavaScript
- No frameworks or libraries required
- Ready for production deployment

### Code Quality
- ESLint compliant
- Semantic, accessible markup
- Clean, well-commented JavaScript
- Mobile-first responsive design

---

## Next Steps

1. **Day 2:** Build contact form with floating labels
2. **Day 3:** Implement logo carousel for partnerships
3. **Day 4:** Add card flip animations
4. **Day 5:** Comprehensive accessibility audit & polish

---

## Questions or Feedback?

For issues, accessibility concerns, or feature requests, please reach out to the team lead.

---

**Last Updated:** February 1, 2026  
**Status:** Day 1 Complete | Days 2–5 In Progress
