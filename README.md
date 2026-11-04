# PacRim Annual Performance Appraisal – Online Form → Excel

The form (`index.html`) collects an appraisal and sends each submission as **one new row** to an Excel table. It also keeps a backup copy in the browser and can export an .xlsx.

| File | Purpose |
|---|---|
| `index.html` | The form (host it on GitHub Pages) |
| `logo.png` | PacRim logo shown on the form |
| `PacRim_Appraisals.xlsx` | Excel template with a table (`AppraisalsTable`) and all 37 column headers, in the right order |
| `Code.gs` | Google Apps Script receiver (Option B) |

## Step 1 – Put it on GitHub and publish the form
1. On github.com click **New repository**, name it e.g. `pacrim-appraisal`.
2. **Upload files** → drag in `index.html`, `logo.png`, `PacRim_Appraisals.xlsx`, `Code.gs`, `README.md` → **Commit**.
3. **Settings → Pages → Source: Deploy from a branch → `main` / `(root)` → Save**.
4. After a minute your form is live at `https://<your-username>.github.io/pacrim-appraisal/`.

> Appraisals contain personal data. GitHub Pages sites are public to anyone with the link, and the link you paste below will be visible in the page code. Keep the repo **private** if your plan allows Pages on private repos, or only share the link with managers, and never put employee data in the repo itself.

## Step 2 – Connect to Excel (choose one)

### Option A – Microsoft Excel Online via Power Automate (best if your company uses Microsoft 365)
1. Upload `PacRim_Appraisals.xlsx` to **OneDrive or SharePoint** (keep the table name `AppraisalsTable`).
2. Go to **make.powerautomate.com → Create → Instant cloud flow → "When an HTTP request is received"**.
3. In the trigger, paste a JSON schema (use **Generate from sample** with one submission, or an empty `{}` schema).
4. Add action **Excel Online (Business) → Add a row into a table**: pick the file, table `AppraisalsTable`, then map each column to the matching field from the trigger.
5. Save. Copy the **HTTP POST URL** that appears in the trigger.
6. In `index.html`, near the bottom, set:
   ```js
   const SUBMIT_URL  = "PASTE_THE_URL_HERE";
   const SUBMIT_MODE = "json";
   ```
7. Commit the change on GitHub.

### Option B – Google Sheets via Apps Script (free, no Microsoft licence; download as .xlsx anytime)
1. Create a new Google Sheet, rename the tab to **Appraisals**, paste row 1 headers from `PacRim_Appraisals.xlsx` into row 1 (or File → Import the xlsx).
2. **Extensions → Apps Script**, replace the code with the contents of `Code.gs`, save.
3. **Deploy → New deployment → Web app**. Execute as: **Me**. Who has access: **Anyone**. Deploy and authorise.
4. Copy the **Web app URL** and set in `index.html`:
   ```js
   const SUBMIT_URL  = "PASTE_THE_URL_HERE";
   const SUBMIT_MODE = "apps-script";
   ```
5. Commit the change. In the sheet use **File → Download → Microsoft Excel (.xlsx)** whenever you need Excel.

## Testing
Open the live form, submit a test appraisal, and confirm a new row appears. If the connection fails, the form shows an error but the entry is kept on that device; use **Download Saved Entries (.xlsx)** to recover it.

## Notes
- Column headers in Excel must match the names in row 1 of the template exactly.
- If you edit the form's performance areas, update the Excel/Sheet headers to match.
- Anyone who has the form's web-app/flow URL could post to it, so don't share it beyond your managers.
