# Data Preparation

Data preparation is the first step when you enter the NebulaLab workspace. The core objective of this step is to normalize various raw output formats from different physical experimental instruments, organize them into a clear "Group → Sample" tree structure, and verify that the table interpretation is correct.

Only after the data is properly organized can you proceed to subsequent plotting, analysis, and export workflows.

---

## 1. Supported Experimental Data Formats

The data preparation panel supports fast silent loading by clicking the "Import File" button at the top of the "Raw Data Management" panel on the left, or directly **dragging and dropping files** into the blank panel on the left. The currently supported formats include:

* **Table and Spreadsheet Data**: `.csv`, `.xlsx`, `.xls`
* **Common Experimental Instrument Text Formats**: `.txt`, `.dat`, `.xy`, `.asc`

---

## 2. Import Parameter Tuning

When importing data, the software will automatically pop up the "Import File Configuration" window. Here, you can fine-tune the header structure output by different instruments to ensure correct data interpretation:

![Import Parse Configuration](/images/import_config.png)

1. **Automatic & Manual Encoding Adjustment**: The system will automatically try to identify file encoding and delimiters (such as comma, tab `\t`, or space). If garbled characters appear in the preview area, you can manually adjust the "Encoding" drop-down box (e.g., switch between `UTF-8` and `GBK`).
2. **Set Skip Rows**: Some physical instruments include dozens or even hundreds of rows of instrument models, researcher information, or environmental metadata at the top of the output text. You can configure "Skip Rows" to directly locate the starting row of numerical data.
3. **Specify Header Line**: Specify which row is used as the data column name (Header Line). Compare with the **"Lightweight Preview (first 5 rows)"** at the bottom of the window to ensure that the header names are aligned one-by-one with the data columns below.

---

## 3. Excel Multi-Sheet Exclusive Parsing

When importing `.xlsx` or `.xls` files with multiple sheets, NebulaLab provides a dedicated preview and splitting mechanism:

* **Real-time Sheet Switching**: You can preview different worksheets within the Excel file in real-time through the "Preview Sheet" drop-down box in the popup import configuration dialog.
* **Flexible Import Range**:
  * **Current Sheet**: Only import the single worksheet currently being previewed as a sample.
  * **All Sheets**: Import all worksheets within the Excel file as independent samples with one click. The software will automatically create a parent group with the same name in the tree on the left, greatly improving batch processing efficiency.

---

## 4. Sample Tree and Table Workspace Interaction

After the data is successfully imported, the main interface layout is shown below. You can manage your sample tree through intuitive gestures or context menus:

![Main Interface Layout and Sample Tree](/images/main_interface.png)

* **Rename and Group Drag-and-Drop**: In the sample tree on the left, right-click a sample to rename or delete it. Dragging a sample to a blank area will automatically create a new group for it; dragging a sample to an existing group node will move the sample.
* **Direct Cell Editing**: In the central "Table Workspace", you can double-click any cell to manually modify or clear obvious instrument noise outliers caused by transient power outages, messy pulse spikes, etc.
* > [!WARNING]
  > **Pay attention to the editing scope (Group vs. Sample)**
  > When you select an entire "Group" in the sample tree on the left, column transformations or data modifications performed on the right will be **synchronously applied to all samples in that group by default**. If you only want to modify a specific sample, please make sure to select it individually in the "Current Sample" drop-down first.

---

## 5. Troubleshooting Common Data Preparation Issues

* **Misaligned Header Parsing in Preview**: This is usually caused by choosing the wrong delimiter or incorrect "Skip Rows" settings. Check the raw text, manually switch the delimiter (e.g., Comma or Tab) in the configuration window, and adjust the skip rows.
* **Import File Blocked or No Response**: Currently, only seven formats (`.csv`, `.txt`, `.xlsx`, `.xls`, `.dat`, `.xy`, `.asc`) are accepted. If your instrument output is in a custom encrypted proprietary format, please export it to a regular TXT or CSV format using the commercial software bundled with the instrument first.

---

## 6. Next Step

After the data is imported and verified, you can proceed to the [Data Processing Workflow](./workflow.md) manual to establish a pipeline cleaning plan for your samples and perform high-quality scientific plotting.
