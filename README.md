# BrainBites

SWE 363 Term Project - Phase 4  
Team 23 | Section 02 | 14 November 2026

BrainBites is a web-based puzzle platform designed for short puzzle sessions. The integrated frontend supports puzzle discovery, interactive games, account-entry screens, leaderboards, and role-based demonstration workspaces for guests, players, creators, and administrators.

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

Replace `<submission-branch>` with the team's actual final branch. The features below describe the **integrated frontend extension**; confirm that the selected branch contains these components before testing them.

## Production commands

```bash
npm run build
npm run preview
```

The configured build command is `vite build`. These commands are documented from `package.json`; a full dependency installation and production build were not executed during this documentation review.

## Features and navigation

- **Home:** Browse the featured puzzle, puzzle library, leaderboard preview, and archive entry points. The navbar highlights **Puzzles** while the puzzle-library section is in view and **Home** when returning to the top.
- **Puzzles:** Open Heatword from the home page and play directly in the browser.
- **Archive:** Select **Play puzzle** on any of four archived puzzle cards to open its interactive game. No account is required for these demo games.
- **Leaderboard:** Switch between **Overall**, **Word Games**, **Mini Crosswords**, and **Heatword** rankings; view the top-three podium and full rankings; return to puzzle selection. Rankings use sample data.
- **Help:** Read game guidance and expand available rules or instructions.
- **Login / Register:** View and interact with account-entry forms. These are frontend demonstrations, not production account authentication.
- **Appearance:** Switch between light and dark themes; the selected theme is saved in browser `localStorage`.
- **Role navigation:** Use the demonstration role picker to inspect the guest, player, creator, and administrator interfaces. Each creator/admin navigation tab has a distinct screen.

## Playable puzzles

| Puzzle | Available actions |
| --- | --- |
| **Heatword** | Enter a five-letter guess using the physical or on-screen keyboard; submit or delete letters; use up to three guesses; view colored feedback; restart or move to the next sample word. |
| **Daily Brain Teaser** | Answer multiple-choice questions, receive explanations, view the round score, advance through questions, and play again. |
| **Logic Puzzles** | Answer Yes/No reasoning questions, view correctness and explanations, advance, and replay. |
| **Memory Match** | Flip cards to find matching symbol pairs, track moves, and restart with a shuffled deck. |
| **Word Scramble** | Rearrange letter tiles by selecting or dragging, check the word, continue to the next word, and restart. |

### Heatword feedback

Heatword uses five-letter answers and allows **three guesses** per round. Each tile provides positional or alphabetic-distance feedback:

| Feedback | Meaning |
| --- | --- |
| **Green** | Correct letter in the correct position. |
| **Yellow** | Guessed letter also occurs elsewhere in the answer. |
| **Red (hot)** | Guessed letter is one alphabet step from the answer letter at this position. |
| **Purple (warm)** | Guessed letter is two to five alphabet steps away at this position. |
| **Gray (cold)** | Guessed letter is farther away at this position. |
| **Diagonal yellow + red/purple/gray** | Combines the **letter-present-elsewhere** clue with the **temperature** clue for this position. |

The on-screen keyboard uses uniformly sized, centered letter keys and reflects the game's feedback. Heatword currently rotates through a small built-in word list; it does not use a live daily-puzzle service or dictionary validation.

## Role-based demonstration pages

The role picker simulates different experiences. It does **not** enforce real authentication, access control, or server-side permissions.

| Role | Pages | Available actions |
| --- | --- | --- |
| **Guest** | Home, Puzzles, Archive, Leaderboard, Help, Login, Register | Browse content, play demo puzzles, read instructions, inspect rankings, and open account forms. |
| **Player** | Player dashboard and shared puzzle pages | View sample progress statistics; use quick links to play Heatword and open the leaderboard. |
| **Creator** | Overview, My Puzzles, Create Puzzle, Feedback | Open workspace shortcuts; search and filter sample puzzles; publish/unpublish entries locally; enter a title and instructions, preview or save a draft; mark feedback reviewed or reopen it. |
| **Administrator** | Overview, Users, Puzzles, Score Audit | Open management shortcuts; search/filter users and suspend/restore sample accounts; search/filter puzzles and toggle publication status; flag or clear sample score records. |

**Prototype limitation:** Creator and administrator changes are held in component state. They are not written to a database and may reset when navigating away from the workspace screen or refreshing the page. Saved drafts, moderation changes, user statuses, and score flags are demonstrations only.

## Using the interface

1. Run the development server and open **Home**.
2. Scroll to **Puzzles** to launch **Heatword**, or open **Archive** to choose one of the four practice games.
3. Use **Help** to review instructions and **Leaderboard** to explore sample rankings.
4. Switch the theme with the navbar control.
5. Use **Login** or **Register** to inspect account forms, or switch the demonstration role to explore the player, creator, and administrator pages.

## Source organization

| Path | Purpose |
| --- | --- |
| `src/main.jsx` | Mounts the React application |
| `src/App.jsx` | Owns theme, screen, selected-puzzle, and role state; selects the visible screen |
| `src/index.css` | Global reset, typography, colors, theme variables |
| `src/components/layout/` | Navbar and Footer |
| `src/components/common/` | Reusable Button, Field, Modal, Tag, and BrandMark components |
| `src/components/sections/` | Home, Help, Login, Register, Archive, ArchiveGame, Heatword, Leaderboard, and WorkspaceDemo pages |
| `src/data/` | Puzzle and account fixture data where used |
| `public/` | Static assets, including the favicon |
| `vite.config.js` | Vite React plugin and development-server configuration |

Interactive archive puzzles, Heatword answers, leaderboard records, and workspace demonstrations also contain local fixture data in their respective frontend components.

## Current implementation limitations

- The integrated extension is a **frontend prototype**; no backend service, database, or production account system has been verified as part of this version.
- Leaderboard results, workspace statistics, accounts, feedback, and moderation records are sample data, not live records.
- Gameplay state and workspace edits are not persisted as user progress across sessions.
- Role selection is for demonstration and does not provide secure role-based authorization.
- The integrated extension has not been verified here through a full installation, browser test, or production build.

## Historical review findings

An earlier inspection of the **GitHub snapshot**, before the integrated extension, identified these code-level issues:

- Several navigation actions targeted screens that `App.jsx` did not render, leaving the main content empty.
- Registration accepted a one-character username and matching one-character passwords, despite the interface describing longer minimums.
- The Login screen's Forgot password button had no action handler.

The integrated extension adds explicit routes for the archive games, Heatword, leaderboard, player dashboard, creator pages, and administrator pages. This addresses the earlier missing-screen coverage in the provided integrated `App.jsx`, but the historical findings should not be treated as a completed end-to-end verification of the final repository. Registration validation and password-recovery behavior were not reverified. See [C04_REVIEW_NOTES.md](C04_REVIEW_NOTES.md) for the original verification scope and reproduction details.

## Documentation

- [Technical documentation](TECHNICAL_DOCUMENTATION.md)
- [AI-assisted review record](C04_REVIEW_NOTES.md)
- [Omar's declaration additions](OMAR_AI_DECLARATION.md)

No backend service, database implementation, or production account system was included in the inspected GitHub snapshot.
