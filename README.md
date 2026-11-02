# Qırım Eval

**How well does AI speak Crimean Tatar?** An open, human-written benchmark that tests ChatGPT, Claude and Gemini in Crimean Tatar, by Muzinie Beitullaieva, PhD.

This repository holds the project website. Stack: React + Vite + TypeScript + Tailwind CSS + Framer Motion (the same base Lovable uses).

## Run it locally

```bash
npm install
npm run dev
```

## Publish

Every push to `main` builds the site and publishes it with GitHub Pages
(Settings → Pages → Source: **GitHub Actions**). The address will be
`https://<username>.github.io/qirim-eval/`.

## Update the content — no code needed

All content lives in `src/data/`. Edit these files on GitHub (pencil icon) and the site rebuilds itself.

| File | What it controls |
| --- | --- |
| `site.json` | Name, email, LinkedIn, photo, résumé link, Hugging Face and GitHub links, licence |
| `progress.json` | Progress bars for the three phases (`done` / `total`) |
| `results.json` | Model scores. Empty `models` = "Pilot in progress" view |
| `errors.json` | Error gallery examples. Empty = placeholder cards |
| `categories.json` | The 10 skill areas and their sample prompts |

### `results.json` format

```json
{
  "updated": "2026-11-20",
  "ratings": 300,
  "models": [
    {
      "name": "ChatGPT", "version": "[model version]", "date": "2026-11-15",
      "total": 6.4, "meaning": 3.3, "fluency": 3.1, "answeredInCrh": 0.82,
      "turkish": 0.41, "russian": 0.07, "other": 0.03
    }
  ]
}
```

`total` is 2–10; `meaning` and `fluency` 1–5; the last four are shares from 0 to 1 (0.41 = 41%). These numbers come straight from the **Özet** sheet of the scoring workbook.

### `errors.json` format

```json
[
  {
    "type": "turkish",
    "item": "B01",
    "model": "ChatGPT",
    "output": "The model's full answer",
    "highlight": ["word1", "word2"],
    "correct": "The native-speaker version",
    "why": "One line on why it is wrong"
  }
]
```

`type` is one of `turkish`, `russian`, `other`, `invented`. Words listed in `highlight` are marked in the answer.

### Photo and résumé

Upload `muzinie.jpg` and `resume.pdf` to the `public/` folder, then set `"photo": "muzinie.jpg"` and `"resume": "resume.pdf"` in `site.json`.

## Before going public — please check

- The alphabet letters and the notes on Q, Ñ and Ğ (`src/components/Alphabet.tsx`).
- Experience entries and wording in `src/components/About.tsx`.
- Choose a licence for the dataset and for this code.

## Moving it to Lovable

Lovable does not connect to an existing GitHub repository. To continue in Lovable, download this repository as a ZIP
(Code → Download ZIP) and use Lovable's **Import project**. Lovable rebuilds the app on its own stack.
