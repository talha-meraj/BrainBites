# AI Usage Declaration – SWE 363 Term Project

---

## Phase 4 use – Front-End

In Phase 4 (Front-End Web Prototype), generative AI tools were used for design harmonization, assisted component authoring, and documentation generation. All generated code and assets were reviewed, refined, and tested by team members.

### Summary of AI Tools Used & Files Affected

| Member | AI Tool & Model | Log ID | Contribution & Purpose | Files Affected |
| :--- | :--- | :--- | :--- | :--- |
| **Talha Meraj** | **Figma AI** *(ChatGPT 6.1-Sol)* | `C01` | Merging and refining divergent wireframe designs into the final prototype | `BrainBites Website Wireframe Prototype Figma/` |
| **Talha Meraj** | **Antigravity IDE** *(Gemini 3.8 Flash)* | `C02` | Architecture setup, foundational design tokens, reusable common components, layout, and primary screens | `src/main.jsx`<br>`src/App.jsx`<br>`src/index.css`<br>`src/components/common/*` (`BrandMark`, `Button`, `Field`, `Modal`, `Tag`)<br>`src/components/layout/*` (`Navbar`, `Footer`)<br>`src/components/sections/Home.*`<br>`src/components/sections/Login.*`<br>`src/components/sections/Register.*`<br>`src/components/sections/Help.*`<br>`src/data/initialPuzzles.js`<br>`src/data/mockUsers.js`<br>`public/favicon.svg`<br>`package.json`, `vite.config.js`, `.gitignore` |
| **Marwan Al-Hamdan** | **ChatGPT 5.6** | `C03` | Screen expansion, interactive game runner integration, workspace simulation, and cross-page consistency | `src/App.jsx`<br>`src/components/sections/Archive.*`<br>`src/components/sections/ArchiveGame.*`<br>`src/components/sections/Heatword.*`<br>`src/components/sections/Leaderboard.*`<br>`src/components/sections/WorkspaceDemo.*` |
| **Omar Ihab Atwah** | **ChatGPT** *(model not specified)* | `C04` | Technical documentation drafting, code review notes, and validation checks | `README.md`<br>`docs/TECHNICAL_DOCUMENTATION.md`<br>`C04_REVIEW_NOTES.md`<br>`OMAR_AI_DECLARATION.md` |
| **Mohammed Alibrahim** | *None* | N/A | Manual functional testing, quality assurance, and code review | None (manual work only) |

---

## Part A – Team Information

| Field | Value |
| :---- | :---- |
| **Team numbers** | 23 |
| **Section** | 02 |
| **Project title** | BrainBites |
| **Milestone (Phase)** | 4 – Front-End Web Prototype |
| **Submission date** | 14-November-2026 |

---

## Part B – Individual Declarations

### Member: Talha Meraj – 202436920 – Foundation, Help, Login, Register and Home pages

[x] **Option 1 – I used AI tools in this milestone.**

- **Tools and models:** Figma AI (ChatGPT 6.1-Sol), Antigravity IDE (Gemini 3.8 Flash)
- **Purposes:** Combining different designs and refining them in Figma; AI-assisted coding in Antigravity IDE.
- **Parts of the deliverable affected:** Figma Design Prototype, Front end of application.
- **Usage Log IDs (Part C):** `C01`, `C02`

> I declare that the Usage Log and the attached evidence contain **all** of my AI use in this milestone, with complete and unedited conversations, and that I understand and can explain all AI-assisted content I contributed.

[ ] **Option 2 – I did not use any AI tools in this milestone.**

**Signature:** *Talha Meraj* &nbsp;&nbsp;&nbsp;&nbsp; **Date:** 14-November-2026

---

### Member: Mohammed Alibrahim – 201934750 – Testing, and code review

[ ] **Option 1 – I used AI tools in this milestone.**

- **Tools and models:** 
- **Purposes:** 
- **Parts of the deliverable affected:** 
- **Usage Log IDs (Part C):** 

[x] **Option 2 – I did not use any AI tools in this milestone.**

> I declare that I did **not** use any generative AI tool in my contribution to this milestone. I understand that if this is found to be false, the case will be treated as **plagiarism** according to KFUPM regulations.

**Signature:** *Mohammed Alibrahim* &nbsp;&nbsp;&nbsp;&nbsp; **Date:** 14-November-2026

---

### Member: Marwan Al-Hamdan – 202466720 – Webpage Expansion, Integration, Hole-Filling, UI-Improvement and Consistency

[x] **Option 1 – I used AI tools in this milestone.**

- **Tools and models:** Figma AI (ChatGPT 5.6-Sol)
- **Purposes:** AI-assisted coding of the front-end.
- **Parts of the deliverable affected:** Front-end of Application.
- **Usage Log IDs (Part C):** `C03`

> I declare that the Usage Log and the attached evidence contain **all** of my AI use in this milestone, with complete and unedited conversations, and that I understand and can explain all AI-assisted content I contributed.

[ ] **Option 2 – I did not use any AI tools in this milestone.**

**Signature:** *Marwan Al-Hamdan* &nbsp;&nbsp;&nbsp;&nbsp; **Date:** 14-November-2026

---

### Member: Omar Ihab Atwah – 202272460 – Project Documentation and Front-End Code Review

[x] **Option 1 – I used AI tools in this milestone.**

- **Tools and models:** ChatGPT (exact model not specified).
- **Purposes:** Preparing the README and technical documentation, reviewing frontend navigation and registration validation, and preparing my AI declaration.
- **Parts of the deliverable affected:** `README.md`, `TECHNICAL_DOCUMENTATION.md`, `C04_REVIEW_NOTES.md`, supporting validation-check script, and AI declaration.
- **Usage Log IDs (Part C):** `C04`

> I declare that the Usage Log and the attached evidence contain **all** of my AI use in this milestone, with complete and unedited conversations, and that I understand and can explain all AI-assisted content I contributed.

[ ] **Option 2 – I did not use any AI tools in this milestone.**

**Signature:** *Omar Ihab Atwah* &nbsp;&nbsp;&nbsp;&nbsp; **Date:** 14-November-2026

---

## Part C – AI Usage Log

| ID | Member | Tool (model) | Date(s) | Purpose | Part of deliverable affected | What you changed and how you verified it | Evidence file |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **C01** | Talha Meraj | Figma AI *(ChatGPT 6.1 Sol)* | 13-Nov-2026 | Figma AI was used to combine two different Figma designs made earlier by teammates. After combining the designs by choosing the best parts from each, it was used to refine the prototype as per requirements. | Figma prototype | Changed parts of the prototype in the Figma design; verified by running the prototype in the Figma viewer and testing all flows. | `C01.md` / `C01.pdf` |
| **C02** | Talha Meraj | Antigravity IDE *(Gemini 3.8 Flash)* | 13-Nov-2026 / 14-Nov-2026 | Used Antigravity IDE to assist in generating code references and building foundational parts of the website. | Front-end: Home, Register, Login, Help pages, layout, and UI components. | Used generated code as reference while implementing. Verified by running the local Vite server and inspecting component behavior and responsive styles. | `C02.md` / `C02.pdf` |
| **C03** | Marwan Al-Hamdan | ChatGPT 5.6 | 14-Nov-2026 | Refactored existing code and created new screens to fill in all non-interactive features while maintaining visual homogeneity. | Front-end: page integration, navigation, transitioning data (`Archive`, `ArchiveGame`, `Heatword`, `WorkspaceDemo`, `Leaderboard`). | Verified against project requirements avoiding backend logic; scanned and tested all generated views through iterative manual testing. | `C03.md` / `C03.pdf` |
| **C04** | Omar Ihab Atwah | ChatGPT *(unspecified)* | 14-Nov-2026 | Project documentation, frontend code review, and registration-validation checks. | `README.md`, `TECHNICAL_DOCUMENTATION.md`, review notes, validation-check script, and AI declaration. | Inspected repository and source export, compared navigation targets with screen handling, and tested edge-case validation inputs. | `C04_REVIEW_NOTES.md` and accompanying chat log |

---

## Part D – Team Statement

> We confirm that this declaration is complete and accurate. We take full responsibility for our submission, including AI-assisted parts, and understand that AI errors are not an excuse. We understand that a missing declaration results in a grade of zero, and that a false or incomplete declaration is an academic integrity violation.

| Member Name | KFUPM ID | Signature | Date |
| :--- | :--- | :--- | :--- |
| **Talha Meraj** | 202436920 | *Talha Meraj* | 14-November-2026 |
| **Mohammed Alibrahim** | 201934750 | *Mohammed Alibrahim* | 14-November-2026 |
| **Marwan Al-Hamdan** | 202466720 | *Marwan Al-Hamdan* | 14-November-2026 |
| **Omar Ihab Atwah** | 202272460 | *Omar Ihab Atwah* | 14-November-2026 |

