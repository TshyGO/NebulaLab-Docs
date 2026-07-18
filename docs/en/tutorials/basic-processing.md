# Hands-On Tutorial: Complete Basic Data Processing

Without memorizing complex concepts, follow these 5 concrete operational steps to quickly complete the entire process from "importing raw instrument data" to "plotting and exporting".

---

## 1. Enter the Data Prep Workspace & Import Files

After starting the NebulaLab software, you will enter the core "Data Preparation" workspace directly. This is your first step in data processing and cleaning.
* **Locate the Import Button**: At the top right of the "Raw Data Management" panel on the left, find and click the highlighted "Import File" button.
* **Select or Drag Files**: Select the raw instrument CSV, Excel (XLSX), TXT, or DAT files you need to analyze in the popup file browser. You can also drag and drop these files from your computer folder directly into the blank area on the left for silent loading.
* **Understand the Layout**: The large central area is the "Table Workspace", where the data will be expanded after import. The right side is for status monitoring and the "Data Processing Workflow" manager.

---

## 2. Configure Parsing & Check Data Preview

After importing files, the software will automatically pop up a smart "File Import Parsing Configuration" dialog. You need to ensure that the instrument data is correctly interpreted as a two-dimensional data table here.
* **Smart Preview Top Rows**: Observe the data format in the "Lightweight Preview (first 5 rows)" at the bottom of the dialog to confirm if the header physical quantities and numerical rows are aligned and not misplaced.
* **Set Skip & Header**: Adjust "Skip Lines" to bypass the instrument's environmental description metadata. Manually specify the "Header Line" to perfectly align with your physical variable column names (such as "wavelength", "time").
* **Set Sample Grouping**: You can choose to merge this batch of data and import it as a single "Sample Group", or create an independent group for each file. They will be displayed as a clear tree structure hanging in the sample tree on the left.

---

## 3. Physical Axis Mapping & Data Preprocessing

After the data is correctly parsed into a table, you need to map physical coordinate axes for it and build an automatic data cleaning pipeline.
* **Map Physical Coordinate Axes**: In the central "Table Workspace", right-click the column name you want to use as the independent variable and set it as the **X-axis**. Right-click the column name you need to use as the dependent variable and set it as the **Y-axis**.
* **Filter Physical Noise Outliers**: If there are sudden bad points at certain positions due to transient power outages or instrument bubbles, you can double-click the cell to manually modify or clear the obvious anomaly.
* **Build a Processing Pipeline**: In the "Data Processing Workflow" panel in the bottom right corner, click "Add Operation" to chain multiple cleaning steps together, such as: data cropping (filtering out invalid start/end response areas), smoothing filter (SG) (Savitzky-Golay algorithm to smoothly remove high-frequency noise), and adaptive baseline subtraction.

---

## 4. On-Screen Sample Checking Comparison & Plotting Fine-Tuning

After the data is properly processed, go to the plotting dashboard and check the samples from the same or different batches to perform intuitive on-screen comparisons.
* **Plot Multiple Samples on One Screen**: In the tree sample list on the left, check any number of data samples you want to compare. The software will immediately draw them on the viewport of the plotting dashboard using visually optimized exclusive color schemes.
* **Refining Axis Labels**: In the plotting properties panel on the right, you can adjust the physical axis label text freely (e.g., input physical quantity symbols and units containing Greek letters or subscripts/superscripts, such as `λ (nm)` or `A (a.u.)`).
* **Line & Legend Customization**: You can independently fine-tune the thickness and line style (solid, dashed) of each curve, as well as data marker symbols. Hold and drag the legend box directly to move it anywhere in the graph area to avoid covering key spectral peaks.

---

## 5. One-Click Export Lossless Chart & Workflow Templating

After completing the fine-tuning of the image, you can export it as a high-definition illustration for academic publication, or send the data to Origin, and save it as a reusable template.
* **Export Academic Publication Illustrations**: Click "Export Image" above the plotting area to export directly as a **SVG vector graphic** (which can be scaled infinitely in Word or LaTeX layouts without loss or blur) or a high-resolution PNG chart.
* **Stream to Origin for Deep Refining**: If you need to use Origin's advanced 3D rendering features, right-click the sample in the left sample tree and select "Send to Origin". NebulaLab will call your locally installed Origin software in the background and automatically stream the processed data over, saving you from manual copy-pasting.
* **Establish Workflow Templates**: If you need to process similar data produced by this instrument daily, please click "Save as Data Processing Workflow Template" in the bottom right corner. Next time, just click "Import Template" to complete automatic cleaning and high-precision plotting of tens of thousands of rows of raw data in 2 seconds, freeing you from repetitive labor!
