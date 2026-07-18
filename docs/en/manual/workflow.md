# Data Processing Workflow & Plotting

After standardizing and organizing the experimental data in the data preparation phase, you can enter the most core phase of NebulaLab: data streaming processing and scientific plotting.

---

## 1. Data Processing Workflow

NebulaLab provides a **non-destructive**, **traceable** pipeline data processing engine. You can add, sort, and fine-tune preprocessing algorithms for data like building blocks.

### 1. Build a Data Processing Pipeline
1. **Select Data Columns**: Right-click the column header in the table area, or specify the data columns on the right data processing panel that need to be used as independent variables (X-axis, e.g., wavelength, time) and dependent variables (Y-axis, e.g., absorbance, luminescence intensity).
2. **Add Atomic Processing Operations**: In the data processing workflow panel, click the "Add Operation" button. You can freely choose and stack the following common algorithm steps:
   * **Data Cropping (Crop)**: Set the start and end range of the X-axis to quickly filter out invalid start and end edge data from instrument response, focusing on the key feature areas.
   * **Smoothing & Noise Reduction (Smooth)**: Use the built-in **Savitzky-Golay (SG) filter** (supporting adjustment of polynomial order and window size), or install community plugins to introduce more advanced noise reduction algorithms, filtering out high-frequency messy noise in seconds.
   * **Baseline Correction**: Provide adaptive polynomial fitting or click-point baseline subtraction to remove overall baseline deviations caused by electrical signal drift or environmental background.
   * **Normalization (Normalize)**: Support normalizing Y-axis data according to "set maximum to 1" or "area normalization", making it easy to qualitatively compare curve shapes between samples of different concentrations and batches.

### 2. One-Click Templating (Template)
Once you have tuned a perfect processing pipeline for specific experimental data of an instrument:
1. Click **"Save as Template"** at the bottom of the processing panel.
2. For subsequent newly imported data of the same type, just click **"Import Template"** with one click, and all cropping, smoothing, and normalization operations will be automatically executed in stream on tens of thousands of rows of raw data within 2 seconds.
3. You can also share the template file with other colleagues in the research group to unify the team's data processing standards.

---

## 2. Scientific Plotting Dashboard

Properly processed data will be visualized in high definition directly in the scientific plotting workspace.

* **On-Screen Multi-Curve Comparison of Samples**: In the sample tree on the left, directly check any number of data samples you want to compare. The plotting dashboard will immediately use visually optimized exclusive color schemes to plot multi-color curve comparison graphs on the same screen in the main viewport.
* **Refining Physical Axis Labels**: In the plotting settings panel on the right, you can freely adjust the axis label text (e.g., input physical quantity symbols and units containing Greek letters or academic subscripts/superscripts, such as `λ (nm)` or `A (a.u.)`).
* **Curve & Legend Customization**: Support independent fine-tuning of the thickness, line style (solid line, dashed line, dash-dot line) of each curve, as well as data marker symbols. You can hold and drag the legend box directly in the graph area to any blank space to prevent covering key spectral peaks.
* **Physical Axis Range & Grid Lines**: Manually lock the display limits of the X/Y axes, or fine-tune the density of major/minor grid lines to ensure beautiful graphs.

---

## 3. High-Quality Lossless Export

After fine-tuning, NebulaLab provides rich export options for academic publication:

1. **One-Click Export SVG Vector Graphic**: **(Highly Recommended)**
   * Click "Export as SVG" above the drawing area.
   * The exported vector graphic can be zoomed infinitely in Word, LaTeX, or Adobe Illustrator. The text and lines are absolutely lossless and non-blurry, fully complying with the typesetting pixel requirements of top international journals (such as Nature, Science series).
2. **Export High-Definition PNG**:
   * Suitable for directly copying and inserting into PPT presentation slides or daily experimental record logs.
3. **One-Click Send to Origin for Deep Refining**:
   * If you need to use OriginPro's 3D surface graphs or high-end 3D rendering, just right-click in the sample tree and select "Send to Origin".
   * NebulaLab will silently call your locally installed Origin software in the background and automatically stream the processed data over, eliminating the redundant steps of manually exporting CSV and importing to Origin and having to reset the axis labels.
