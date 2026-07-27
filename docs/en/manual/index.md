# User Manual & Getting Started

Welcome to **NebulaLab**! This is a desktop experimental data processing and analysis workstation designed specifically for researchers. This manual will guide you to quickly understand the core purposes of the software, acquisition channels, suggested reading order, and future evolution direction.

---

## 1. Suggested Reading Order

To help you get started quickly and maximize the use of the software's features, it is recommended to read and practice in the following order:

1. **[Core Concepts](./concepts.md)**: Understand the design relationships between projects, samples, data processing workflows, and templates.
2. **[Data Preparation](./data-preparation.md)**: Learn how to import, verify, and normalize raw data from different experimental instruments.
3. **[Step-by-Step Tutorial](../tutorials/basic-processing.md)**: Follow 5 concrete steps to quickly complete a real-world hands-on exercise from importing raw data to plotting spectra and exporting.
4. **[Data Processing Workflow](./workflow.md)**: Gain deep insights into the built-in data cleaning, smoothing, noise reduction, and one-click templating technologies.
5. **[Community & Templates](./community.md)**: Explore how to share and reuse high-value research templates, plugins, and themes.
6. **[About Pro Membership](./pro.md)**: Compare the feature differences between the Free version and the Pro version, and learn how to activate and use advanced team features.

---

## 2. What the Software Can Do

NebulaLab aims to completely shorten the tedious path from "raw experimental instrument data" to "academic report/journal publication illustrations". It mainly handles the following core tasks:

- **Data Import & Organization**: Drag and drop to import more than ten common instrument data formats such as CSV, TXT, Excel, DAT, XY, and ASC. Supports multi-sheet parsing and "Group Tree" sample organization.
- **One-Stop Data Preprocessing**: Provides intuitive double-click cell editing, built-in high-frequency algorithms such as data cropping, smoothing and noise reduction (e.g., SG filter), baseline subtraction, and normalization to filter noise in seconds.
- **Scientific Plotting & Lossless Export**: Supports multi-curve comparisons on the same screen, with high-freedom adjustment of curve thickness, legends, grids, and axes. One-click export of publication-quality lossless SVG vector graphics or high-definition PNGs.
- **Workflow Template Reuse**: Mature data cleaning and plotting configurations can be saved as templates with one click. When facing new data, applying templates can automatically reproduce and execute the processing flow in batches within seconds.
- **Community & Plugin Ecosystem**: Share and download high-value research resources. Search and install official or community-shared useful plugins, exquisite themes, and highly reusable workflow templates inside the software to promote efficient team collaboration.
- **Research Group Private Cloud Deployment**: Supports research group LAN self-built data server deployment. Facilitates one-click cloud backup, multi-terminal synchronization, and collaborative editing among research group members to ensure experimental data security and privacy.

---

## 3. Where to Download & Safe Execution

> [!IMPORTANT]
> **Only Official Download Channel**
> In order to ensure the purity and security of the software, we have not purchased expensive commercial code signing certificates at this time. **Rest assured, the software itself is completely open source, safe, and virus-free.** Please make sure to obtain the latest installation packages via the official Releases page:
>
> 🔗 **[Click here to go to the official GitHub Releases to download the latest version](https://github.com/TshyGO/NebulaLab-Releases/releases/latest)**

### 1. Bypass Browser Download Block
Due to the lack of a commercial signature, some browsers may pop up download block prompts:
- **Edge Browser**: If it prompts "cannot be downloaded securely", hover over the item in the download list, click **"..." (Show more actions)** on the right -> choose **"Keep"** -> click **"Show details"** -> click **"Keep anyway"**.
- **Chrome Browser**: If the download is blocked, click **"Keep"** -> and click **"Keep dangerous file"** in the secondary confirmation popup to complete the download.

### 2. Bypass System Block on First Run
When running the installation package or `NebulaLab.exe` for the first time on Windows, the system may pop up a blue warning window saying "Windows protected your PC":
1. Click the **"More info"** link in the middle of the window text.
2. The hidden **"Run anyway"** button will appear in the bottom right corner of the window.
3. Click **"Run anyway"** to start normally. Opening this version again in the future will not prompt the block message anymore.

---

## 4. Troubleshooting & Feedback Channels

If you encounter crashes, file parsing failures, or algorithm anomalies during use, you can obtain assistance through the following channels:

### 1. How to Locate Software Logs
Before submitting feedback to us, attaching the log files generated by the software will help the development team locate the problem as quickly as possible:
- The log storage path is located in the `logs/` folder under the software installation directory (or the extraction directory for the portable version).
- The file name is usually the current date, for example `2026-06-01.log`.
- > [!TIP]
  > **Privacy and Desensitization Security**
  > Before sending logs to others, please make sure to open and check the logs. You can manually desensitize sensitive local filenames, folder absolute paths, or personal privacy data (e.g., replacing them with placeholders).

### 2. Official Asynchronous Feedback Channel (GitHub Issues)
If you find a non-confidential public bug or have good feature suggestions, we highly recommend that you submit feedback via GitHub Issues:
- **Submission Address**: [NebulaLab-Releases Issues](https://github.com/TshyGO/NebulaLab-Releases/issues)
- **Submission Specification**:
  1. Please choose the appropriate Issue template (such as "Bug Report" or "Feature Suggestion").
  2. Describe your **expected behavior** and **actual behavior**.
  3. Provide the simplest steps to reproduce the issue.
  4. If possible, upload the simplest desensitized sample data or error screenshots.

### 3. Official Private Support Email
If you have purchased the Pro version, or if your issue involves unpublished sensitive scientific experimental data, or confidential business cooperation within the research group:
- **Private Support Mailbox**: `support@nebulalab.io` *(simulated service email to protect privacy)*
- Dedicated customer service and algorithm experts will contact you via email or a secure direct line to protect your research privacy and information security.
