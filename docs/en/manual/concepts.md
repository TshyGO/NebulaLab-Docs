# Core Concepts

To help you use NebulaLab efficiently, this chapter will outline the five underlying core concepts of the software, and how they work together to accumulate research data.

---

## 1. Project File (.nebula)

NebulaLab uses a unified project file (with the `.nebula` extension) to save all states of the current workspace.
* **Saved Content**: It not only includes **all raw data tables** you imported, but also fully records your **sample group tree structure**, the **data preprocessing workflow on the right**, and the **custom plotting styles and label states on the graphic dashboard**.
* **Design Intent**: Realize the "complete reproducibility" of the scientific research process. The next time you open the project, you can seamlessly continue your previous analysis and plotting, or share the project file directly with research group colleagues so they can restore and review your complete data processing steps with one click.

---

## 2. Sample & Data Grouping

Each set of imported experimental data is interpreted as a **"Sample"** object and hangs as a tree hierarchy in the sample tree on the left.
* **Organizational Structure**: Supports "Group Tree" management. You can freely establish multi-level groups (e.g., `Batch A/Sample 01`) and move samples between groups by dragging and dropping.
* **Data Structure**: Each sample is essentially a two-dimensional physical data table composed of independent variable columns and dependent variable columns (such as X-axis, Y-axis), supporting manual modification by double-clicking cells in the table workspace.

---

## 3. Data Processing Workflow

The data processing workflow is the soul of NebulaLab. It describes **what physical and mathematical transformations occurred between the raw instrument data and the final plotted data**.
* **Pipeline Combination**: You can chain multiple atomic cleaning and calculation operations like building blocks (e.g., `Data Cropping` -> `SG Smoothing Filter` -> `Polynomial Baseline Correction` -> `Y-axis Maximum Normalization`).
* **Non-Destructive Editing**: All transformations layered in the workflow **do not destroy or modify your raw physical data**. You can adjust the parameters of any step at any time, and the software will automatically recalculate and update the plotting display in milliseconds.

---

## 4. Template

Once you have configured a perfect data processing workflow and plotting style for an instrument (such as a specific model of UV-Vis spectrophotometer or XRD diffractometer), you can save it as a **"Processing Template"**.
* **One-Click Batch Apply**: Facing the same type of experimental data generated on a new day, you only need to apply the template with one click. The software can perform pipeline cleaning, baseline alignment, and normalized plotting on tens of thousands of rows of raw data in 2 seconds, completely eliminating the trouble of manual repetitive configuration.
* **Decoupling of Style & Configuration**: Templates can act solely on data cleaning, or solely on locking plotting attributes such as axis fonts, color schemes, etc., for academic paper illustrations.

---

## 5. Plugin & Community

Since data differences vary greatly across different disciplines and instruments, NebulaLab adopts a fully modular plugin architecture.
* **Feature Extension**: Official and community developers package parser plugins for specific instruments, high-end fitting algorithms (such as specific XRD peak splitting), or exquisite interface themes and release them to the community.
* **Team Collaboration**: Through the built-in community market, research groups can quickly distribute and install custom plugins and workflow templates, achieving seamless unification of team data processing standards.
