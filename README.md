# BrainBites

SWE 363 Term Project - Phase 4  
Team 23 | Section 02 | 14 November 2026

BrainBites is a web-based puzzle platform designed for short puzzle sessions. The interface covers puzzle discovery, account entry, game instructions, and role-based experiences for guests, players, creators, and administrators.

## Technology

| Area | Implementation |
| --- | --- |
| UI | React 19 and React DOM |
| Development and build | Vite 8 with the React plugin |
| Language | JavaScript and JSX |
| Styling | CSS Modules and shared CSS variables |
| Icons | lucide-react |
| Persistent preference | Browser localStorage for the theme |
| Current data | Frontend fixture data and component state |

## Running the project

Install Node.js and npm compatible with the project's dependency lockfile. Clone the repository and enter the project folder:

```bash
git clone https://github.com/talha-meraj/BrainBites.git
cd BrainBites
npm ci
npm run dev
```

The Vite configuration requests port 5173 and opens the browser automatically. Use the local URL printed in the terminal if that port is occupied.

To review a specific submitted branch:

```bash
git fetch origin
git switch <submission-branch>
npm ci
npm run dev
```

Replace `<submission-branch>` with the team's actual final branch.

## Production commands

```bash
npm run build
npm run preview
```

The configured build command is `vite build`. These commands are documented from `package.json`; a full dependency installation and production build were not executed during this documentation review.

## Using the interface

1. Start on Home to view the featured puzzle, puzzle cards, leaderboard preview, and archive links.
2. Open Help for puzzle instructions and expandable rules.
3. Use Login or Register to inspect the account forms.
4. Use the theme control to switch between light and dark appearances.
5. In the integrated extension, use the role picker for player, creator, and administrator demonstrations.

The role picker and account screens are frontend demonstrations. They should not be interpreted as production authentication or authorization.

## Source organization

| Path | Purpose |
| --- | --- |
| `src/main.jsx` | Mounts the React application |
| `src/App.jsx` | Owns theme, screen, and role state; selects the visible screen |
| `src/index.css` | Global reset, typography, colors, theme variables |
| `src/components/layout/` | Navbar and Footer |
| `src/components/common/` | Reusable Button, Field, Modal, Tag, and BrandMark components |
| `src/components/sections/` | Page components |
| `src/data/` | Puzzle and account fixture data |
| `public/` | Static assets, including the favicon |
| `vite.config.js` | Vite React plugin and development-server configuration |

## Review findings

The inspected GitHub version has these confirmed code-level issues:

- Several navigation actions target screens that `App.jsx` does not render, leaving the main content empty.
- Registration accepts a one-character username and matching one-character passwords, despite the interface describing longer minimums.
- The Login screen's Forgot password button has no action handler.

The separate C03 export contains additional route handling, so the missing-screen finding must be rechecked against the final integrated version. See [C04_REVIEW_NOTES.md](C04_REVIEW_NOTES.md) for the verification scope and reproduction details.

## Documentation

- [Technical documentation](TECHNICAL_DOCUMENTATION.md)
- [AI-assisted review record](C04_REVIEW_NOTES.md)
- [Omar's declaration additions](OMAR_AI_DECLARATION.md)

No backend service, database implementation, or production account system was included in the inspected GitHub snapshot.
