# manvij1612.github.io

Personal academic website for **Manvi Jain** — gravitational-wave data analysis, UMass Dartmouth.

Plain static HTML, CSS and a few lines of JavaScript. No build step, no framework, no
dependencies to install. Open `index.html` in a browser and it works.

---

## 1. Add your images

Everything already renders without them: each image slot falls back to a placeholder, so the
site never shows a broken-image icon. Drop your files in `assets/img/` using **exactly these
filenames** and they appear automatically — no code changes needed.

| File to add | Where it shows up | Suggested size |
|---|---|---|
| `assets/img/profile.jpg` | Round portrait in the home-page hero | square, ~800×800 px |
| `assets/img/gw-detector.jpg` | Wide banner figure at the top of **Research** | ~1600×900 px |
| `assets/img/research-figure.png` | Figure in the *precessing binaries* section of **Research** | ~1600×900 px |
| `assets/img/outreach.jpg` | Photo in the **Teaching & Outreach** page | ~1600×900 px |

To add an image:

```bash
cp ~/Desktop/my-photo.jpg  assets/img/profile.jpg
cp ~/Desktop/ligo.jpg      assets/img/gw-detector.jpg
```

Then reload the page. Keep each file under ~500 KB so pages stay fast — on macOS you can
resize and compress in one step:

```bash
sips -Z 800 -s format jpeg -s formatOptions 70 ~/Desktop/my-photo.jpg --out assets/img/profile.jpg
```

### Where to get a gravitational-wave image you are allowed to use

Use only images that are public domain or openly licensed, and **keep the credit line** in the
`<figcaption>`:

- **Caltech/MIT/LIGO Laboratory image gallery** — <https://www.ligo.caltech.edu/images> —
  aerial photos of Hanford and Livingston, optics, control rooms. Free for educational and
  non-commercial use with credit (`Caltech/MIT/LIGO Lab`).
- **LIGO Open Science Center (GWOSC)** — <https://gwosc.org> — real strain data. You can make
  your *own* GW150914 spectrogram or whitened-strain plot; a figure you generated yourself is
  both more honest and more impressive than a stock photo.
- **NASA / Goddard SVS** — <https://svs.gsfc.nasa.gov> — black hole merger renderings, public domain.
- **SXS Collaboration** — <https://www.black-holes.org> — numerical-relativity merger visualisations.

The best option for `research-figure.png` is a plot from your own work — a fitting-factor
distribution, a template-bank scatter in the mass plane, an injection-recovery plot. Save the
matplotlib figure with `dpi=200, bbox_inches="tight"`, and prefer a transparent or white
background.

### Changing an image caption or slot

Captions live in the HTML next to each image, inside `<figcaption>…</figcaption>`. Search the
file for the image filename and you will find both. Every slot is marked with an
`<!-- REPLACE: … -->` comment.

---

## 2. Deploy to GitHub Pages

Your account already has a repo called `manvi.github.io`, but **that name will not work as a
user site.** GitHub only serves a user site from a repo named exactly
`<your-username>.github.io` — for you that is **`manvij1612.github.io`**. A repo named
anything else is served as a *project* site at a sub-path instead.

### Recommended: create `manvij1612.github.io`

```bash
cd /Users/mjain2/website
git init -b main
git add .
git commit -m "Personal academic website"
gh repo create manvij1612.github.io --public --source=. --remote=origin --push
```

(No `gh` CLI? Create an empty public repo named `manvij1612.github.io` on github.com, then:)

```bash
git remote add origin https://github.com/manvij1612/manvij1612.github.io.git
git push -u origin main
```

Then in the repo: **Settings → Pages → Build and deployment → Source: _Deploy from a branch_**,
branch `main`, folder `/ (root)`. Save. After a minute or two the site is live at:

**https://manvij1612.github.io**

Every later `git push` republishes it.

### If you would rather reuse the existing repo

A repo named `manvi.github.io` publishes to
`https://manvij1612.github.io/manvi.github.io/` — a long, odd URL. If you want to keep it
anyway, everything here still works because all links are relative. You will only need to
change the `SITE_URL` used in the `<link rel="canonical">` and `og:url` tags (see §4).

### Custom domain (optional)

If you buy e.g. `manvijain.com`, create a file named `CNAME` in this folder containing just:

```
manvijain.com
```

then point a `CNAME` DNS record at `manvij1612.github.io` and set the domain under
Settings → Pages.

---

## 3. Keeping the CV up to date

`assets/cv/Manvi_Jain_CV.pdf` is a copy of your LaTeX CV. After you rebuild the PDF:

```bash
cp ~/github/CV+resume/CV.pdf /Users/mjain2/website/assets/cv/Manvi_Jain_CV.pdf
git add -A && git commit -m "Update CV" && git push
```

`cv.html` mirrors the CV as HTML so it reads well on a phone and is indexed by Google. If you
change the PDF substantially, update that page too.

---

## 4. Files, and what to edit

```
index.html            Home: hero, about, current work, recent news
research.html         Research projects in detail, methods, code
publications.html     Papers, preprints, thesis, talks
teaching.html         Teaching, outreach, awards
cv.html               CV in HTML + download link
404.html              Shown for a bad URL
assets/css/style.css  All styling. Colours are CSS variables at the very top.
assets/js/main.js     Dark-mode toggle, mobile menu, footer year
assets/img/           Images (see §1)
assets/cv/            CV PDF
.nojekyll             Tells GitHub Pages to serve the files as-is
```

A few things worth knowing:

- **The nav bar and footer are repeated in each HTML file.** If you add a page or change a
  link, edit all six files (search for `nav__links`).
- **Colours** are CSS custom properties in the `:root` block at the top of `style.css`.
  `--accent` is the navy used for links and buttons; `--highlight` is the rust accent.
  Dark mode overrides the same names further down.
- **Canonical / social URLs.** Each page's `<head>` has `<link rel="canonical">`,
  `og:url` and `og:image` pointing at `https://manvij1612.github.io`. If you deploy somewhere
  else, update those three lines in each file.
- **`assets/img/og-card.png`** is the preview card shown when the site is shared on
  LinkedIn, Slack or X. Regenerate or replace it if your title changes.
- **`assets/img/gw-chirp.svg`** is the hero waveform — a Newtonian inspiral–merger–ringdown
  chirp generated for this site, not a stock graphic.

### Links you may want to add later

- **arXiv author identifier.** Register one at <https://arxiv.org/user> (it gives you a URL
  like `arxiv.org/a/jain_m_N`). There is deliberately no arXiv author link on the site right
  now, because the obvious guess belongs to a different researcher. Once you have yours, add a
  button next to ORCID and ADS in `publications.html`.
- **Google Scholar profile**, if you create one — same place.
- **INSPIRE-HEP** author profile, once your record is claimed.

---

## 5. Preview locally before pushing

```bash
cd /Users/mjain2/website
python3 -m http.server 8000
```

Then open <http://localhost:8000>. Press `Ctrl-C` to stop.

Opening `index.html` directly by double-clicking also works, but the local server is a closer
match to how GitHub Pages will serve it.
