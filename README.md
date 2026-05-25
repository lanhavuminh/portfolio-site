# Portfolio Site - Lan Ha Vu Minh

This is the source code for the portfolio website. All content (text, images, videos, colours) is managed through simple files — no coding required.

## Quick Reference

| What you want to do | Where to go |
|---|---|
| Add/remove a collection | `content/collections.yaml` |
| Edit a collection description | `content/collections/{id}.txt` |
| Add/replace images or videos | `static/media/{id}/` |
| Edit the About page text | `content/about.txt` |
| Edit contact info & social links | `content/contact.yaml` |
| Change site colours | `content/theme.yaml` |
| Update press images | `static/media/press/` |
| Change the homepage video | `static/media/home/promo.mp4` |
| Change the About/Contact photos | `static/media/me/` |

---

## Adding a New Collection

### 1. Register it in `content/collections.yaml`

Open the file and add your new collection. There are two ways to add one:

**Standalone collection** (appears on its own in the sidebar):

```yaml
  - id: my-new-collection
    title: "My New Collection"
```

**Inside a category** (grouped under a heading like "LCF Year 1"):

```yaml
  - category: "LCF Year 1"
    items:
      - id: my-new-collection
        title: "My New Collection"
```

**With sections** (if the collection has distinct parts, e.g. different looks):

```yaml
  - id: my-new-collection
    title: "My New Collection"
    sections:
      - id: part-one
        subtitle: "Part One"
      - id: part-two
        subtitle: "Part Two"
```

**Rules for the `id` field:**
- Use only lowercase letters, numbers, and hyphens (e.g. `my-new-project`)
- No spaces or special characters
- This ID is used in the website URL (`/collections/my-new-project`) and to match the image folder and description file

### 2. Add a description

Create a plain text file at:

```
content/collections/my-new-collection.txt
```

Write the description as plain text — no formatting needed. This text appears above the gallery on the collection page.

**If your collection has sections**, create a subfolder and add a `.txt` file for each section:

```
content/collections/my-new-collection/part-one.txt
content/collections/my-new-collection/part-two.txt
```

You can also have a top-level description alongside the section descriptions:

```
content/collections/my-new-collection.txt        (main description)
content/collections/my-new-collection/part-one.txt  (section description)
content/collections/my-new-collection/part-two.txt  (section description)
```

### 3. Add images and videos

Create a folder in `static/media/` that matches the collection ID:

```
static/media/my-new-collection/
```

Drop your image and video files into this folder.

**If your collection has sections**, create subfolders for each section:

```
static/media/my-new-collection/part-one/
static/media/my-new-collection/part-two/
```

### Supported file formats

| Type | Formats |
|---|---|
| Images | `.jpg`, `.jpeg`, `.png`, `.gif`, `.webp` |
| Video | `.mp4` |

Other file types will be ignored.

### How images are ordered

Images and videos are sorted **alphabetically by filename**. To control the order, name your files so they sort the way you want:

```
01-front.jpg
02-side.jpg
03-detail.jpg
04-video.mp4
```

Or simply use names that sort naturally (e.g. `IMG-1348.jpg`, `IMG-1349.jpg` will appear in that order).

### Image tips

- **No size limit is enforced**, but keep images reasonable for web (aim for under 2MB each)
- Large images will slow down the site for visitors
- Videos auto-play on loop with no sound — keep them short and compressed
- The gallery displays in a 3-column layout, so both portrait and landscape images work well

---

## Editing Existing Content

### Collection descriptions

Edit the corresponding `.txt` file in `content/collections/`. For example, to update the "FARA X LCF" description, edit:

```
content/collections/fara-x-lcf.txt
```

### About page

Edit `content/about.txt`. The text appears as a single paragraph on the About page.

### Contact information

Edit `content/contact.yaml`:

```yaml
contact:
  note: "For loans and orders please contact via email"
  email: lanhavm@gmail.com
  instagram: lanhavuminh
  linkedin: "https://www.linkedin.com/in/lan-ha-vu-minh-b19406225/"
  ual: "https://ualshowcase.arts.ac.uk/@lanhavuminh"
  imageAbout: /media/me/about.jpg
  imageContact: /media/me/contact.jpg
```

- `note` — short message shown on the contact page
- `email` — your email address
- `instagram` — your Instagram username (not the full URL)
- `linkedin` — full LinkedIn profile URL
- `ual` — full UAL Showcase URL
- `imageAbout` — photo shown on the About page (path starts with `/media/`)
- `imageContact` — photo shown on the Contact page

To change the About or Contact photos, replace the files in `static/media/me/`.

### Site colours

Edit `content/theme.yaml`:

```yaml
theme:
  textColor: "#374151"
  activeColor: "#d4a5a5"
  backgroundColor: "#fffef9"
```

- `textColor` — main text colour across the site
- `activeColor` — highlight colour for the currently selected page in the sidebar
- `backgroundColor` — page background colour

Colours must be in hex format (e.g. `#ff5500`). You can use a colour picker like [htmlcolorcodes.com](https://htmlcolorcodes.com/color-picker/) to find hex values.

### Homepage video

Replace the file at `static/media/home/promo.mp4`. Keep the same filename.

### Press images

Add or remove images in `static/media/press/`. They are displayed automatically in alphabetical order.

---

## Removing a Collection

1. Delete or comment out its entry in `content/collections.yaml` (to comment out a line, put `#` at the start)
2. Optionally delete its description file from `content/collections/`
3. Optionally delete its image folder from `static/media/`

---

## Deploying Changes

After making changes, the site needs to be rebuilt and deployed. Run:

```
npm run build
```

If the site is set up with automatic deployment (e.g. via Cloudflare Pages connected to this repo), simply push your changes to the `main` branch and the site will update automatically.

---

## File Structure Overview

```
content/
  collections.yaml          # List of all collections (sidebar + routing)
  contact.yaml              # Contact info and social links
  theme.yaml                # Site colours
  about.txt                 # About page text
  collections/
    {collection-id}.txt     # Description for a collection
    {collection-id}/
      {section-id}.txt      # Description for a section within a collection

static/media/
  home/
    promo.mp4               # Homepage video
  me/
    about.jpg               # About page photo
    contact.jpg             # Contact page photo
  press/
    *.jpg                   # Press gallery images
  {collection-id}/
    *.jpg, *.mp4, ...       # Collection gallery media
  {collection-id}/
    {section-id}/
      *.jpg, *.mp4, ...     # Section gallery media
```
