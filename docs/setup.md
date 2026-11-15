# Workstation setup

**Status:** verified on primary development machine 2026-11-13. The project is developed on Windows, but the steps also roughly translate to macOS or Linux (install fnm, Git, Git LFS and the GitHub CLI with the respective platform's package manager).

## Machines and reference devices

Below are the two development machines used for the project, which give good general coverage for testing WebGL driver quirks.

| Machine | Role | OS | CPU | GPU | RAM |
| --- | --- | --- | --- | --- | --- |
| Laptop | Primary development | Windows 11 | AMD Ryzen 7 250 | NVIDIA GeForce RTX 5060 Laptop (8 GB) and integrated AMD Radeon 780M | 16 GB |
| Desktop | Secondary: heavy Blender work, Intel Arc testing | Windows 10 | AMD Ryzen 7 3700X | Intel Arc A750 | 32 GB |

## Setup steps

Commands run in PowerShell 7. Steps marked *admin* need an administrator PowerShell window.

### 1. Terminal and Windows preparation

- Install PowerShell 7 and Windows Terminal (Windows 11 already has Terminal):

  ```powershell
  winget install Microsoft.PowerShell Microsoft.WindowsTerminal
  ```

- *Admin:* enable long paths:

  ```powershell
  New-ItemProperty -Path "HKLM:\SYSTEM\CurrentControlSet\Control\FileSystem" -Name LongPathsEnabled -Value 1 -PropertyType DWORD -Force
  ```

### 2. Node.js through fnm

Node is installed through the fnm version manager, and the version is pinned per project (`.node-version`). Begin by uninstalling any directly installed Node.js first, so two Nodes don't fight over `PATH`.

```powershell
winget install Schniz.fnm

# add this line to the PowerShell profile (open it with: notepad $PROFILE)
fnm env --use-on-cd --shell powershell | Out-String | Invoke-Expression
# then, in a new terminal

fnm install 26
fnm default 26
```

If an Unauthorized Access error appears after editing $PROFILE when opening another terminal, run the below command:

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### 3. npm

npm comes automatically with Node, so there's nothing extra to install. The repository pins the npm version in `package.json` (`engines`), enforces it with `engine-strict=true` in `.npmrc`, and commits `package-lock.json`; CI installs with `npm ci`.

```powershell
# verify that npm has been installed successfully
npm -v
```

### 4. Git, Git LFS and the GitHub CLI

Git for Windows includes Git LFS.

```powershell
winget upgrade Git.Git
winget install --id GitHub.cli
```

In addition to running the below, configure GitHub to ensure no personal email appears in commit history (from Settings > Emails).

```powershell
git config --global user.name "git-username"
git config --global init.defaultBranch main
git config --global core.autocrlf false
git config --global core.longpaths true
git lfs install
gh auth login
gh auth setup-git
gh auth refresh -s project   # lets the CLI manage the GitHub Project board
```

### 5. VS Code

- Turn on Settings Sync (sign in with GitHub) so both machines share settings and extensions.
- Extensions:

| Extension | ID | Why |
| --- | --- | --- |
| ESLint | `dbaeumer.vscode-eslint` | Lint errors inline; fix on save |
| Prettier | `esbenp.prettier-vscode` | Formatting on save |
| EditorConfig | `EditorConfig.EditorConfig` | Applies `.editorconfig` |
| WebGL GLSL Editor | `raczzalan.webgl-glsl-editor` | GLSL syntax, completion and validation |
| MDX | `unifiedjs.vscode-mdx` | Syntax and IntelliSense for content files |
| Vitest | `vitest.explorer` | Run and debug unit tests in the editor |
| Playwright Test | `ms-playwright.playwright` | Run, record and debug end-to-end tests |
| GitHub Pull Requests | `GitHub.vscode-pull-request-github` | Review and manage PRs and issues |
| GitHub Actions | `github.vscode-github-actions` | Workflow syntax checking and run status |
| glTF Tools | `cesium.gltf-vscode` | Inspect and preview GLB files |
| Blender Development | `JacquesLucke.blender-development` | Run and debug Blender Python scripts (from Phase 3) |

The project's `.vscode/settings.json` and `.vscode/extensions.json` files will cause VS Code to prompts for these extensions automatically.

### 6. Blender 5.2 LTS

- Install the 5.2.x LTS build with the `.msi` installer from blender.org's LTS page. Avoid installing from the Microsoft Store and winget versions, as they can update to 5.3 on their own and potentially break the pinned pipeline.

### 7. Browsers and art tools

- Chrome and Firefox, with the Spector.js extension for capturing WebGL frames.
- PureRef for reference boards and GIMP for textures.

## Accounts and services

| Service | Setup |
| --- | --- |
| GitHub (`Kitfudd`) | Two-factor sign-in with a passkey; *Keep my email addresses private* and *Block command line pushes that expose my email* both on |
| Cloudflare | Account with two-factor sign-in |
| Domain | `kitfud.com`, registered through Cloudflare Registrar (at-cost pricing, WHOIS privacy, Cloudflare nameservers), auto-renew on |
| Email | `hello@kitfud.com` through Cloudflare Email Routing: free and receive-only; replying *as* this address needs a separate service, deferred |

## Verify

Run the below in a new terminal to verify that setup is complete. Refer to the table for values that have been confirmed on the primary development machine.

```powershell
node -v
npm -v
git --version
git lfs version
gh auth status
& "C:\Program Files\Blender Foundation\Blender 5.2\blender.exe" --version
```

## Verified versions

| Tool | Version | Checked |
| --- | --- | --- |
| Node | 26.13.1 (through fnm) | 2026-11-13 |
| npm | 11.20.0 | 2026-11-13 |
| Git | 2.56.0.windows.4 | 2026-11-13 |
| Git LFS | 3.8.1 | 2026-11-13 |
| GitHub CLI | Logged in as Kitfudd over HTTPS; scopes `gist`, `read:org`, `repo`, `workflow` (`project` to add before sub-phase 0.6) | 2026-11-13 |
| Blender | 5.2.4 LTS | 2026-11-13 |
