# BrainBites

> **SWE-363: Software Engineering — Term Project (Phase 4: Front-End Web Prototype)**  
> **Team 23 | Section 02 | November 2026**  
> **Repository:** [github.com/talha-meraj/BrainBites](https://github.com/talha-meraj/BrainBites)

---

## Team Members & Roles

| Member Name | KFUPM ID | Phase 4 Responsibilities & Role |
| :--- | :--- | :--- |
| **Talha Meraj** | 202436920 | **Lead Front-End Architect:** Foundation setup, design system tokens, common UI kit, layout (Navbar & Footer), core sections (Home, Login, Register, Help), and mock fixtures. |
| **Marwan Al-Hamdan** | 202466720 | **Interactive Game & Screen Integration:** Archive library, playable ArchiveGame runner, Heatword challenge engine, campus leaderboard, and role-based workspace simulation. |
| **Mohammed Alibrahim** | 201934750 | **Quality Assurance & Verification:** Functional testing, interactive flows validation, cross-browser consistency checks, responsive audit, and code review. |
| **Omar Ihab Atwah** | 202272460 | **Technical Documentation & Code Review:** Architecture documentation, technical specification, validation error edge-case checks, and AI declaration synthesis. |

---

## Overview

**BrainBites** is an interactive, web-based daily puzzle platform tailored for quick, high-engagement cognitive breaks. Built with a high-contrast **Neo-Brutalist editorial aesthetic** (hard drop shadows, thick ink borders, tactile press states, and vivid accent tones), the interface faithfully implements the team's Figma wireframe design.

The web prototype includes comprehensive puzzle discovery, playable game mechanics, historical puzzle archives, campus leaderboards, player help manuals, and simulated workspace experiences across four distinct user personas (**Guest**, **Player**, **Creator**, and **Administrator**).

---

## Key Features

- **Daily Featured Challenge (Heatword #042)**: Interactive daily puzzle hero card displaying live solver metrics, difficulty ratings, color-heat preview chips, and direct game launch.
- **Playable Puzzle Engines**:
  - `Heatword`: Interactive 5-letter deduction game with proximity heat clues (*Exact, Near-1, Near-5, Far*).
  - `ArchiveGame`: Playable interactive session for historical puzzles loaded from fixture data.
- **Puzzle Discovery & Archives**:
  - Filterable library featuring *Letter Ladder* and *Campus Mini Crosswords*.
  - Historical archive calendar grid with instant playback.
- **Global & Campus Leaderboards**: Ranked table with solve times, streaks, department filters, and solver badges.
- **Comprehensive Player Guide (`Help`)**:
  - 4-step beginner walkthrough with visual process cards.
  - Expandable rule accordions for each game category.
  - 3-column responsive FAQ covering streaks, rankings, and score submissions.
- **Authentication & Onboarding**:
  - **Login**: Split-screen editorial layout with quick 1-click persona demo sign-in buttons.
  - **Register**: Two-column responsive sign-up form with input validation and instant demo-fill.
- **Role Simulation Switcher**:
  - Two-tier sticky navigation bar with a dedicated `"VIEW AS"` switcher allowing evaluators to preview role-tailored workspaces:
    - **Guest**: Discovery, rules, and demo registration.
    - **Player**: Solved history, active streaks, and personal profile.
    - **Creator**: Puzzle authoring studio, submission drafts, and community feedback.
    - **Administrator**: User account moderation, puzzle review queues, and score audits.
- **Accessibility & Neo-Brutalist Theme**:
  - Full Light / Dark mode toggling persisted in browser `localStorage`.
  - Accessible keyboard navigation with `"Skip to content"` focus link.
  - Native semantic HTML and ARIA dialog traps for overlay modals.

---

## Technology Stack

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **UI Framework** | **React 19** | Component-driven declarative UI architecture |
| **Bundler & Tooling** | **Vite 8** | Instant HMR development server and optimized production build |
| **Language** | **JavaScript (ES Modules + JSX)** | Client-side application logic |
| **Styling** | **CSS Modules + CSS Custom Properties** | Scoped component styling and design-token theming |
| **Iconography** | **lucide-react** | Lightweight, accessible UI icon set |
| **Fonts** | **Google Fonts** | `Archivo Black` (display headers), `DM Sans` (body), `Space Mono` (chips/metrics) |
| **State & Persistence** | **React Hooks + localStorage** | View routing, persona simulation, and persistent theme preferences |

---

## Project Structure & File Tree

```text
BrainBites/
├── docs/                                 # Technical documentation
│   └── technical_documentation.md        # Architecture, component contracts, and state design
├── public/                               # Static web assets
│   ├── favicon.svg                       # 2x2 neo-brutalist puzzle bite mark
│   └── robots.txt
├── src/
│   ├── components/
│   │   ├── common/                       # Reusable design-system atoms
│   │   │   ├── BrandMark.jsx             # 2x2 geometric bite mark logo (small/medium/large)
│   │   │   ├── BrandMark.module.css
│   │   │   ├── Button.jsx                # Neo-brutalist button (primary/secondary/danger/ghost)
│   │   │   ├── Button.module.css
│   │   │   ├── Field.jsx                 # Accessible form field with helper/error alerts
│   │   │   ├── Field.module.css
│   │   │   ├── Modal.jsx                 # Accessible dialog overlay with Escape & backdrop trap
│   │   │   ├── Modal.module.css
│   │   │   ├── Tag.jsx                   # Status badge pill (accent/success/danger/plain)
│   │   │   └── Tag.module.css
│   │   ├── layout/                       # Structural site frame components
│   │   │   ├── Footer.jsx                # Minimal academic footer & floating quick-help '?'
│   │   │   ├── Footer.module.css
│   │   │   ├── Navbar.jsx                # Two-tier header, role switcher & dark mode slider
│   │   │   └── Navbar.module.css
│   │   └── sections/                     # Top-level screen views
│   │       ├── Archive.jsx               # Historical puzzle archive catalog & search
│   │       ├── Archive.module.css
│   │       ├── ArchiveGame.jsx           # Interactive playable archive puzzle runner
│   │       ├── ArchiveGame.module.css
│   │       ├── Heatword.jsx              # Daily Heatword playable challenge screen
│   │       ├── Heatword.module.css
│   │       ├── Help.jsx                  # Player manual, expandable rules & 3-column FAQ
│   │       ├── Help.module.css
│   │       ├── Home.jsx                  # Main landing, daily feature hero & leaderboard aside
│   │       ├── Home.module.css
│   │       ├── Leaderboard.jsx           # Global rankings table with category filters
│   │       ├── Leaderboard.module.css
│   │       ├── Login.jsx                 # Split-screen login & 1-click persona quick sign-in
│   │       ├── Login.module.css
│   │       ├── Register.jsx              # Validated player registration view
│   │       ├── Register.module.css
│   │       ├── WorkspaceDemo.jsx         # Role dashboard for Creator & Administrator tasks
│   │       └── WorkspaceDemo.module.css
│   ├── data/                             # Mock fixture data
│   │   ├── initialPuzzles.js             # Daily puzzles, leaderboard entries, and archives
│   │   └── mockUsers.js                  # Demo accounts for Guest, Player, Creator, and Admin
│   ├── App.jsx                           # Application state manager & dynamic screen router
│   ├── index.css                         # Design system tokens, color palettes, and global reset
│   └── main.jsx                          # React DOM entry point
├── .gitignore                            # Untracks build outputs, dependencies, and prototype drafts
├── AI_USAGE.md                           # Course AI usage declaration & tool-to-file mapping
├── index.html                            # HTML5 document shell & font imports
├── package.json                          # Scripts and project dependencies
├── README.md                             # Project overview and instructions
└── vite.config.js                        # Vite React plugin configuration
```

---

## Getting Started

### Prerequisites
- **Node.js** (v18.0.0 or later recommended)
- **npm** (v9.0.0 or later)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/talha-meraj/BrainBites.git
   cd BrainBites
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Launch the local development server:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

---

## Production Build

To produce an optimized production bundle:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

---

## Evaluation Guide for Reviewers

When reviewing and evaluating the prototype:

1. **Role Simulation (`VIEW AS`)**:
   - Use the role switcher in the top navigation bar to toggle between **Guest**, **Player**, **Creator**, and **Administrator**.
   - Notice how the secondary workspace navigation bar adapts its routes and capabilities for each persona.
2. **Interactive Gameplay**:
   - Click **"Play today's puzzle"** on the Home screen to launch the playable daily Heatword puzzle.
   - Navigate to **"Archive"** and click **"Play"** on any past date tile to launch an archived puzzle session.
3. **Authentication Flows**:
   - Visit **Login** and test the 1-click demo buttons at the bottom to sign in as any simulated user instantly.
   - Visit **Register** to test input validation, password match verification, or the `"Use valid demo details"` button.
4. **Theme Adaptation**:
   - Click the **Dark mode** slider in the header to observe full design token switching across all components, borders, and heat indicators.

---

## Documentation

- [AI Usage Declaration](AI_USAGE.md)
- [Technical Documentation](docs/technical_documentation.md)

---

## Academic Information

- **Course:** SWE-363: Software Engineering (Term Project)
- **Team Number:** Team 23
- **Section:** 02
- **Term:** 2026-2027 (Term 241)
