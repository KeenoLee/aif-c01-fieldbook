# AIF-C01 Fieldbook

[![Deploy GitHub Pages](https://github.com/KeenoLee/aif-c01-fieldbook/actions/workflows/deploy-pages.yml/badge.svg)](https://github.com/KeenoLee/aif-c01-fieldbook/actions/workflows/deploy-pages.yml)

An offline-first study companion for the **AWS Certified AI Practitioner (AIF-C01)** exam. It combines a focused study path, domain notes, flashcards, reviewed practice questions, guided practice, and a timed mock exam in a single dependency-free web app.

[Open the live app](https://keenolee.github.io/aif-c01-fieldbook/)

> [!IMPORTANT]
> This is an independent, unofficial study aid. It is not affiliated with, endorsed by, or sponsored by Amazon Web Services. Always use the current [AWS Certified AI Practitioner exam guide](https://docs.aws.amazon.com/aws-certification/latest/ai-practitioner-01/ai-practitioner-01.html) as the source of truth.

## What is included

- **Today:** recommends the next useful study action from your saved progress.
- **3-day path:** fifteen checkpoints for a short preparation window.
- **Domain map:** concise notes for all five exam domains and an AWS service atlas.
- **Scenario lab:** business scenarios with immediate explanations.
- **Flashcards:** active recall with retained and needs-work tracking.
- **Question bank:** 377 retained questions with answer checking, explanations, review status, search, and quality filters.
- **Practice exam:** a fresh 65-question, blueprint-weighted set with immediate correct/incorrect feedback and explanations.
- **Mock exam:** a fresh 65-question simulation with a 90-minute timer, deferred scoring, a question navigator, and domain-level results.

The application runs entirely in the browser. It has no build step, package manager, account system, or application backend.

## Practice exam and mock exam

| Mode | Questions | Timer | Feedback | Best for |
| --- | ---: | ---: | --- | --- |
| Practice exam | 65 | None | Immediately after each answer | Learning and repairing decisions |
| Mock exam | 65 | 90 minutes | After submission or timeout | Rehearsing exam conditions |

Both modes generate a fresh set and approximate the official domain weights with whole questions:

| Domain | Official weight | Questions in each generated set |
| --- | ---: | ---: |
| 1. Fundamentals of AI and ML | 20% | 13 |
| 2. Fundamentals of Generative AI | 24% | 16 |
| 3. Applications of Foundation Models | 28% | 18 |
| 4. Responsible AI | 14% | 9 |
| 5. Security, Compliance, and Governance | 14% | 9 |

AWS applies these percentages to scored content. The official exam currently contains 50 scored questions and 15 unscored questions; this app applies the closest whole-question distribution across each 65-question study set. A raw percentage in this app is diagnostic and is **not** equivalent to an AWS scaled score.

## Question-bank quality

The bundled study bank began with 385 extracted questions. Every item was reviewed for wording, answer plausibility, AIF-C01 scope, and outdated AWS guidance:

- 377 questions were retained.
- 8 misleading or obsolete questions were removed.
- Changed or time-sensitive items were cross-checked against official AWS documentation during the July 2026 audit.
- Only questions with complete selectable answer keys are eligible for generated exams.

These are study questions, not official AWS Certification exam questions. The real exam can differ in wording, difficulty, and coverage. Do not rely on memorizing answer keys; use the explanations and official documentation to understand why an answer fits.

## Run locally

No installation is required. Serve the production folder with any static file server:

```bash
cd AIF-C01-study-app-sol
python3 -m http.server 8000
```

Then open [http://localhost:8000](http://localhost:8000).

You can use another static server if preferred. The app requires only a modern browser with JavaScript and `localStorage` enabled.

## Progress and privacy

Study progress is stored in the browser under the `aif-c01-fieldbook-v2` `localStorage` key.

- No login or account is required.
- The application has no analytics or progress-sync service.
- Progress is not sent to an application backend.
- Clearing site data or selecting **Reset all** removes the saved progress for that browser.
- Progress does not automatically move between browsers or devices.

## Project structure

```text
.
├── .github/
│   └── workflows/
│       └── deploy-pages.yml
├── AIF-C01-study-app-sol/
│   ├── index.html
│   ├── styles.css
│   ├── app.js
│   ├── test-bank-data.js
│   └── test-bank-review.js
├── .gitignore
└── README.md
```

- `index.html` contains the application structure and study views.
- `styles.css` provides the responsive visual system.
- `app.js` contains the study content, interaction logic, scoring, timers, and browser persistence.
- `test-bank-data.js` contains the bundled question data.
- `test-bank-review.js` contains audit corrections, removals, verification notes, and source links.
- `deploy-pages.yml` publishes `AIF-C01-study-app-sol` to GitHub Pages after changes reach `main`.

## Contributing

Contributions that improve clarity, accessibility, browser behavior, or alignment with current AWS documentation are welcome.

1. Fork or clone the repository.
2. Create a branch using the `feature/short-description` convention.
3. Make a focused change.
4. Run the basic checks:

   ```bash
   node --check AIF-C01-study-app-sol/app.js
   git diff --check
   ```

5. Test the affected flow in a desktop and mobile-sized browser.
6. Open a pull request describing the change and its verification.

For content corrections, include a direct link to the relevant official AWS documentation. Do not submit confidential exam material or claim that third-party questions are genuine AWS exam questions.

## Deployment

GitHub Actions deploys the production folder to GitHub Pages whenever `main` is updated. The workflow can also be started manually from the repository's **Actions** tab.

## Official resources

- [AWS Certified AI Practitioner overview](https://aws.amazon.com/certification/certified-ai-practitioner/)
- [AWS Certified AI Practitioner exam guide](https://docs.aws.amazon.com/aws-certification/latest/ai-practitioner-01/ai-practitioner-01.html)
- [AWS Skill Builder](https://skillbuilder.aws/)

## License and trademarks

This repository does not currently include an open-source license. Public visibility does not by itself grant permission to copy, modify, or redistribute the project.

AWS, Amazon Web Services, and AWS service names are trademarks of Amazon.com, Inc. or its affiliates. All other trademarks belong to their respective owners.
