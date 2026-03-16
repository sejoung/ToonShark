# ToonShark User Manual

---

## Table of Contents

1. [Introduction](#1-introduction)
2. [Installation & Launch](#2-installation--launch)
3. [Home Screen](#3-home-screen)
4. [Workspace](#4-workspace)
   - [PDF Tabs](#41-pdf-tabs)
   - [Option Panel](#42-option-panel)
   - [Results Panel](#43-results-panel)
5. [Slice Modes](#5-slice-modes)
   - [Auto Mode](#51-auto-mode)
   - [Fixed Mode](#52-fixed-mode)
6. [Job Detail Page](#6-job-detail-page)
7. [Slice Viewer](#7-slice-viewer)
8. [Thumbnail Capture](#8-thumbnail-capture)
9. [Device Preview](#9-device-preview)
10. [Episode Export](#10-episode-export)
11. [Settings](#11-settings)
    - [Language](#111-language)
    - [Theme](#112-theme)
    - [Storage](#113-storage)
    - [Slice Defaults](#114-slice-defaults)
    - [Auto Slice](#115-auto-slice)
    - [PDF Render Scale](#116-pdf-render-scale)
    - [Export](#117-export)
    - [Naming](#118-naming)
    - [Preview](#119-preview)
    - [Device Presets](#1110-device-presets)
12. [Keyboard Shortcuts](#12-keyboard-shortcuts)
13. [Customizing Platform Presets](#13-customizing-platform-presets)
14. [FAQ](#14-faq)

---

## 1. Introduction

ToonShark is a desktop tool for the webtoon production workflow. It takes webtoon manuscripts in PDF format, splits them into individual image slices, and automatically converts and exports them to match each publishing platform's specifications (Ridi, Alltoon, WATCHA, etc.).

**Core workflow:**

```
Open PDF → Slice → Preview → Export per platform
```

![Home Screen](images/01-home-empty.png)

---

## 2. Installation & Launch

### Install from Package

| OS | Format | Description |
|----|--------|-------------|
| macOS (Apple Silicon & Intel) | `.dmg` | Drag and drop to Applications |
| Windows x64 | `.exe` | Run the NSIS installer |

### Build from Source

```bash
git clone https://github.com/user/toonshark.git
cd toonshark
npm install
npm run dev
```

> **Requirements:** Node.js >= 24, npm >= 11

---

## 3. Home Screen

The home screen is displayed when the app launches. From here you can open PDFs or browse recent job history.

![Home Screen (with jobs)](images/15-home-light-theme.png)

### Header Bar

| Button | Function |
|--------|----------|
| **Open Folder** | Opens the base data directory in your file explorer |
| **Settings** | Navigate to the settings page |
| **Open PDF** | Opens a file picker to select a PDF and enter the workspace |

### PDF Drag & Drop

Drag PDF files anywhere onto the home screen and a blue overlay appears. Drop the files to automatically open the workspace. You can drop multiple PDFs at once.

<!-- Image: Drag-and-drop overlay (only visible during active drag, cannot be auto-captured) -->

### Open PDFs

Currently open PDFs in this session are displayed as a list. Click to switch to that PDF's workspace, or press the **x** button to close it. PDFs being processed show a spinning indicator.

### Recent Jobs

Previously executed jobs are grouped by source PDF.

Each PDF group shows:
- PDF name and run count
- Storage usage
- **Delete** button — delete all jobs for this PDF
- **Open** button — open this PDF in the workspace

Each job entry shows:
- Creation time
- Slice count, mode (Auto/Fixed)
- Storage usage
- Click to navigate to the job detail page

### Storage Warning

When total storage usage exceeds 10GB, a warning banner appears at the top. Use the **Clean Up** button to delete all job history.

---

## 4. Workspace

The main working screen when a PDF is opened. It is split into a left option panel and a right results panel.

![Workspace (after job completion)](images/03-workspace-after-run.png)

### 4.1 PDF Tabs

Currently open PDFs are shown as tabs at the top.

- Click a tab — switch to that PDF
- **x** button — close the tab (remove PDF)
- **+ Add PDF** — add a new PDF
- **Home** — return to the home screen
- PDFs being processed show a spinning indicator

You can open multiple PDFs simultaneously and switch between tabs.

### 4.2 Option Panel

The left sidebar (272px) contains all slicing settings.

![Option Panel](images/02-workspace-before-run.png)

#### File Prefix

The name prepended to output files. Auto-generated from the PDF filename. Supports Korean characters.

> Example: if prefix is `ep01` → `ep01_0001.png`, `ep01_0002.png`, ...

#### Slice Mode

Select **Auto** or **Fixed** mode. Detailed options for each mode are described in [5. Slice Modes](#5-slice-modes).

#### PDF Render Scale

The scale factor when converting PDF to images.

| Value | Description |
|-------|-------------|
| 1.0x | Original size |
| 2.0x | Double resolution |
| 4.0x | 4x resolution (default) |
| 8.0x | 8x resolution (maximum) |

Higher values produce sharper images but take longer to process. The original PDF page dimensions are displayed so you can preview the resulting resolution.

#### Run Button

Click the **Run** button after configuring your settings to start the slicing job.

- If a job with identical settings already exists, a duplicate detection toast is shown
- Progress is displayed during processing:
  - Copying PDF → Counting pages → Rendering pages → Slicing images → Generating preview → Done

<!-- Image: Progress bar (requires capture during processing) -->

#### Error Display

A red error message box appears if the job fails.

### 4.3 Results Panel

Job results are displayed in the right area.

![Results Panel](images/03-workspace-after-run.png)

When there are no results, a "No results" message is shown.

When a job completes, a **Job Result Card** is created:

- **Creation time**, slice count, page count
- **Option summary tags** — see all settings used at a glance
- **Quick action buttons:**

| Button | Function |
|--------|----------|
| **Preview** | Go to the device preview page |
| **Source PDF** | Open the original PDF file |
| **Folder** | Open the job directory |
| **Detail** | Go to the job detail page |
| **Episode Export** | Go to the export page |
| **Delete** | Delete this job |

- **Slice thumbnails** — up to 12 shown, click to open in the slice viewer

---

## 5. Slice Modes

### 5.1 Auto Mode

Analyzes white margins (gaps between panels) to automatically detect cut boundaries. Suitable for most webtoons.

![Auto Mode Options](images/02-workspace-before-run.png)

| Option | Description | Range |
|--------|-------------|-------|
| **Margin Color Sensitivity** | Color range recognized as margin. "Strict" = pure white only, "Loose" = includes slightly gray areas | 230–255 |
| **Min Margin Height** | Only consecutive white rows at least this many pixels tall are recognized as cut boundaries | 1–500 |
| **Min Slice Height** | Minimum height of each generated slice. Prevents overly small fragments | 0–2000 |
| **Cut Position** | "Middle of margin": cuts at center of white area. "Before color": cuts just above where the drawing begins | Selection |

**Tips:**
- In most cases, **Strict (255)** margin sensitivity is recommended
- For webtoons with narrow margins between panels, set **Min Margin Height** lower
- **Before color** cut position produces cleaner results without unnecessary whitespace at the top of slices

### 5.2 Fixed Mode

Splits uniformly at a set pixel height. Useful for manuscripts without margins or with irregular layouts.

![Fixed Mode Options](images/04-workspace-fixed-mode.png)

| Option | Description | Range |
|--------|-------------|-------|
| **Slice Height** | Fixed height of each slice (px) | 100–5000 |
| **Start Offset** | Skip this many pixels from the top before starting to split. Useful for excluding top margins or headers | 0+ |

---

## 6. Job Detail Page

A page for viewing detailed information about a specific job.

![Job Detail Page](images/05-job-detail.png)

### Meta Information

| Field | Description |
|-------|-------------|
| Created | Job creation date and time |
| Pages | Number of pages in the original PDF |
| Slices | Number of generated slice images |
| Mode | Slice mode used (Auto/Fixed interval) |
| Prefix | Prefix used in filenames |
| Source PDF | Path to the original PDF file |

### Action Buttons

| Button | Function |
|--------|----------|
| **Preview** | Go to the device preview page |
| **Episode Export** | Go to the export page |
| **Open Source PDF** | Open the original PDF in the default app |
| **Open Folder** | Open the job directory in your file explorer |

### Slice Thumbnail Gallery

All generated slices are displayed in a grid. Each thumbnail shows the filename and dimensions (px). Click to open in the slice viewer.

---

## 7. Slice Viewer

A full-screen viewer for examining individual slices.

![Slice Viewer](images/07-slice-viewer.png)

### Layout

- **Top bar** — Navigation controls, preview button, scroll speed adjustment, thumbnail capture button, file info
- **Left sidebar** — Full list of slice thumbnails (click to navigate)
- **Center viewer** — Full-size image of the selected slice

### Navigation

| Action | Function |
|--------|----------|
| **Prev/Next** buttons | Move to previous/next slice |
| Click left sidebar thumbnail | Jump to that slice |
| **← →** keys | Previous/next slice |
| **↑ ↓** keys | Scroll image up/down |
| **Esc** key | Go back to previous page |

### Scroll Speed

Use the slider in the top bar to adjust the scroll amount (50–1000px) for the **↑ ↓** keys and scroll buttons.

### Scroll Buttons

Circular **↑** **↓** buttons are located at the bottom-right of the screen. Clicking them scrolls the image by the configured scroll speed.

---

## 8. Thumbnail Capture

Crop a specific area from a slice in the slice viewer to generate a platform-spec thumbnail.

![Thumbnail Platform Selection](images/08-thumbnail-dropdown.png)

![Thumbnail Crop Overlay](images/09-thumbnail-crop.png)

### How to Use

1. Click the **Thumbnail** button in the slice viewer
2. Select a platform from the dropdown (e.g., Ridi 360x522)
3. A crop box appears over the image
4. **Drag** the crop box to adjust its position
5. **Drag corner handles** to resize (aspect ratio is locked)
6. Click the **Save** button to generate the thumbnail

### Crop Box Controls

| Action | Function |
|--------|----------|
| Drag center area | Move the crop box |
| Drag corners (NW/NE/SW/SE) | Resize (maintains platform aspect ratio) |
| **Save** button | Save the cropped area as a thumbnail |
| **Cancel** button or Esc | Exit crop mode |

### Result

- A success toast is shown when the thumbnail is saved
- If the source resolution is smaller than the target size, a note about upscaling is included
- A **📂** button appears — click to open the saved folder

---

## 9. Device Preview

Simulates how the webtoon would look on actual mobile devices.

![Device Preview](images/06-preview.png)

### Device Selection

Select a pre-configured device from the dropdown in the top bar.

Built-in device examples:
- iPhone 16 Pro (393×852)
- iPhone 16 Pro Max (430×932)
- Samsung Galaxy S25 (393×852)
- Samsung Galaxy S25 Ultra (412×915)
- Others (can be added/edited in Settings)

### Custom Size

Enter width and height manually to test any viewport size.

### Image Gap

Use the **Gap** input to adjust spacing (px) between slices. Default is 0.

### Preview Area

- A white-background viewport matching the selected device size is displayed at the center of the screen
- Scroll within the viewport to see the entire webtoon
- Slice images are displayed to fit the viewport width

---

## 10. Episode Export

Converts and exports sliced images to match each platform's specifications.

![Episode Export](images/10-export.png)

### Platform Selection

Platforms are grouped by country.

| Platform | Width | Format | Max File Size |
|----------|-------|--------|---------------|
| Ridi | 720px | JPG | 100MB |
| Alltoon | 760px | PNG | - |
| WATCHA | 1080px | JPG | - |

- Use **checkboxes** to select platforms for export
- Country-level checkboxes select all platforms in that country at once
- Already-exported platforms are grayed out with the export date displayed

### Running the Export

1. Check the desired platforms
2. Click the **Run Export** button
3. Progress is displayed
4. On completion, results are shown:
   - File count per platform
   - Warnings (e.g., file size exceeded)
   - **Open Export Folder** button

<!-- Image: Export completion result (requires capture after actual export) -->

### Export History

Previous export records are shown at the bottom. You can open the export folder from each entry.

### Export Output Location

Exported files are saved under `export/{country}/{platform}/` within the job directory.

---

## 11. Settings

Access via the **Settings** button on the home screen.

![Settings Page](images/11-settings.png)

Settings are organized in collapsible accordion-style sections.

### 11.1 Language

| Option | Description |
|--------|-------------|
| English | English UI |
| 한국어 | Korean UI |

### 11.2 Theme

| Option | Description |
|--------|-------------|
| Light | Light theme |
| Dark | Dark theme |
| System | Automatically follows OS setting |

### 11.3 Storage

- **Base Directory** — path where all job data is stored
- **Browse** — change directory (existing data is not moved automatically)
- **Open** — open the current directory in your file explorer

### 11.4 Slice Defaults

- **Default Height (px)** — default slice height for Fixed mode (100–5000)

### 11.5 Auto Slice

Default values when using Auto mode in the workspace.

| Option | Description |
|--------|-------------|
| Margin Color Sensitivity | Margin recognition range (230–255) |
| Min Margin Height (px) | Minimum height for cut boundary recognition (1–500) |
| Min Slice Height (px) | Minimum height of generated slices (0–2000) |
| Cut Position | Middle of margin / Before color |

### 11.6 PDF Render Scale

Default scale factor when converting PDF to images (1.0x–8.0x). Can be adjusted per-job in the workspace.

### 11.7 Export

- **JPG Quality** — JPEG compression quality used for episode export and thumbnail capture (60–100)

### 11.8 Naming

| Option | Description |
|--------|-------------|
| Default Prefix | Default prefix used when opening a new PDF |
| Number Padding | Digits for file numbering (e.g., 4 → `0001`, 2 → `01`) |

### 11.9 Preview

| Option | Description |
|--------|-------------|
| Image Gap (px) | Spacing between slices in preview |
| Scroll Amount (px) | Scroll distance in the slice viewer (50–1000) |

### 11.10 Device Presets

Manage the device list used in the device preview.

![Device Presets](images/13-settings-devices.png)

#### Editing Devices

Each device has a **Name**, **Width (px)**, and **Height (px)**. Use the **x** button to delete.

#### Adding Devices

Click the **Add Device** button to add a new device. Default is 393×852px.

#### Import / Export

| Button | Function |
|--------|----------|
| **Import Presets** | Load device presets from a JSON file |
| **Export Presets** | Save current device presets to a JSON file |
| **Reset Defaults** | Restore the built-in default device list |

#### Saving

After making changes, you must click the **Save Settings** (or **Save Changes**) button at the bottom. The button turns orange and pulses when there are unsaved changes.

Use the **Reset All Settings** button to restore all settings to defaults (base directory is preserved).

> A confirmation dialog appears if you try to leave the page with unsaved changes.

---

## 12. Keyboard Shortcuts

### Slice Viewer

| Key | Function |
|-----|----------|
| `←` | Previous slice |
| `→` | Next slice |
| `↑` | Scroll image up |
| `↓` | Scroll image down |
| `Esc` | Go back (cancels crop mode if active) |

### Global

| Action | Description |
|--------|-------------|
| PDF drag & drop | Add PDF files on the home screen or workspace |

---

## 13. Customizing Platform Presets

Edit the `resources/defaults/countries.json` file to add new platforms or modify existing ones.

### Structure

```json
[
  {
    "id": "kr",
    "platforms": [
      {
        "id": "ridi",
        "episode": {
          "width": 720,
          "format": "jpg",
          "maxFileSizeMB": 100
        },
        "thumbnail": {
          "width": 360,
          "height": 522,
          "format": "jpg",
          "maxFileSizeMB": 2
        }
      }
    ]
  }
]
```

### Field Reference

| Field | Description |
|-------|-------------|
| `id` (country) | Country identifier (e.g., `kr`, `jp`) |
| `id` (platform) | Platform identifier (e.g., `ridi`, `kakao_webtoon`) |
| `episode.width` | Target width for episode images (px) |
| `episode.format` | Output format (`jpg` or `png`) |
| `episode.maxFileSizeMB` | Max file size per image (MB). `null` for no limit |
| `thumbnail.width` | Thumbnail width (px) |
| `thumbnail.height` | Thumbnail height (px) |
| `thumbnail.format` | Thumbnail format (`jpg` or `png`) |
| `thumbnail.maxFileSizeMB` | Max thumbnail size (MB). `null` for no limit |

> The `thumbnail` field is optional. If omitted, thumbnail capture is disabled for that platform.

---

## 14. FAQ

### Q: Too many slices are generated
**A:** In Auto mode, increase **Min Slice Height** or **Min Margin Height**. This prevents small margins from being recognized as cut boundaries.

### Q: White lines remain at slice boundaries
**A:** Change the cut position to **Before color**. This cuts just above where the drawing begins instead of at the center of the margin, producing cleaner results.

### Q: Images are blurry
**A:** Increase the PDF Render Scale. The default is 4.0x, and the maximum is 8.0x. Higher values take longer to process.

### Q: Exported files exceed the platform's file size limit
**A:** Lower the **JPG Quality** in settings, or reduce the slice height to make individual files smaller. Warnings are shown in the export results.

### Q: I want to change the storage location
**A:** Go to Settings → Storage → Browse and select a new directory. Existing data is not moved automatically, so copy it manually if needed.

### Q: I want to add a new platform
**A:** Edit the `resources/defaults/countries.json` file to add a new platform. See [13. Customizing Platform Presets](#13-customizing-platform-presets) for details.

### Q: The device I want isn't in the preview list
**A:** Go to Settings → Device Presets and click the **Add Device** button to add your device's viewport size.
