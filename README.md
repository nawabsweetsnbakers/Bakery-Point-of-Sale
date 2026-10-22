# Nawab Sweets & Bakers POS

A Windows desktop point-of-sale customization of the existing Bakery-Point-of-Sale prototype for Nawab Sweets & Bakers in Pattoki, Punjab, Pakistan.

## Included customization

- Nawab Sweets & Bakers application metadata and settings defaults.
- Default currency symbol: `Rs.`.
- Default receipt footer: “Thank you for shopping with Nawab Sweets & Bakers!”
- Standard product categories are added automatically when the local category database is opened:
  - Mithai
  - Bakery items
  - Cakes
  - Biscuits & Nankhatai
  - Ice cream
  - Desi ghee
  - Snacks & beverages
- Existing category names are retained; default names are compared without regard to letter case.

## Windows build

Use a supported Windows machine with Node.js/npm installed. From the repository folder:

```powershell
npm install
npm run package-win
```

The packaging script is configured to create the app folder under `release-builds/NawabSweetsBakersPOS-win32-x64`. The Windows installer step is:

```powershell
node build.js
```

The installer script expects the packaged executable to be named `NawabSweetsBakersPOS.exe`. Confirm the output folder and executable name after packaging before running the installer step.

## Important operational notes

- This project is an older Electron/Express/NeDB prototype. It has not yet been fully audited or validated for live sales.
- Before real transactions, test product creation/editing, stock decrement, receipt printing, tax settings, end-of-day totals, backup/restore and recovery after power loss.
- The existing code enables Node integration and disables context isolation in its Electron window, and its local API uses permissive CORS. Treat security hardening as a prerequisite before exposing the service to a network or storing sensitive customer information.
- The application stores data under the Windows `%APPDATA%\POS\server\databases` directory and uploaded images under `%APPDATA%\POS\uploads`. Back up both directories before updates or migrations.
- `Rs.` is only a display symbol; it does not validate tax treatment or ensure every receipt/report formats amounts correctly for Pakistan. Tax remains disabled by default (0%) until the owner/accountant confirms the correct configuration.
- A working installer has not been built or tested on the target Windows computer as part of this repository change.

## Branch

Customization branch: `customize/nawab-branding`.
