# Roadmap

This page talks about three things: what Nebula Lab can do now, what is planned next, and the long-term vision.

## Now (v0.8 series)

Currently implemented is the segment "grouped experimental data from instrument to Origin":

- Import instrument data from CSV, TXT, and Excel, and manage them by sample groups.
- Common processing steps (cropping, smoothing, normalization, baseline subtraction...) can be tuned on one sample and applied to other samples in the same group.
- Send the organized group-level data along with Origin graph templates and theme files to Origin to continue plotting.
- Download workflows, Origin templates, and various automation scripts shared by others in the community.

This segment will not undergo major changes. We will continue fixing bugs, refining details, and keeping up with Origin version updates.

## Next: Chain the Experiment Together

Data processing is only the middle part of an experiment. Looking forward, it is about "how this experiment was made"; looking backward, it is about "can the experiments done months ago still be retrieved". I plan to grow step-by-step toward both ends of this link:

> Recipe Calculation → Recipe Saving → Experiment Record → Raw Data Import → Data Processing → Result Writeback to Record → History Search

Each segment is roughly as follows:

- **Recipe Calculation & Saving** — Solve "calculating a recipe and saving it" first. Ratios, target amounts, and addition order can all be reused.
- **Experiment Record** — Bind each experiment to a recipe and a group of samples, recording conditions, operations, and products.
- **Raw Data → Experiment** — Continue using the current processing features, but after connecting to the experiment record, raw files will automatically hang back to the corresponding experiment.
- **Result Return** — Write processed curves, key metrics, and conclusions back to the experiment record so they can be viewed directly when browsing history.
- **History Search** — Search how many times a recipe was run, what samples looked like under a certain condition, and where the raw data corresponding to a result is.

This link is built in phases and will not be pushed all at once.

## After That: The Research Group's Own Experiment Library

The desktop client handles data for a single person. To gather data from a group of people over many years, a private server for the research group is needed:

- **Desktop Client** continues to be responsible for local data processing, plotting, and scripting.
- **Research Group Server** manages accounts, permissions, experiment records, file indexes, sharing, and backups.
- **Database** stores the relationships between recipes, processes, samples, raw data, processing workflows, and conclusions—allowing mutual navigation between them.

Once the research group's data accumulation is sufficient, we can layer features such as material search, data collections, and Q&A based on the group's own data.

## What We Won't Do

- **We will not replace Origin.** Layout and reporting are left to Origin or other plotting software; Nebula Lab is only responsible for the stage leading up to Origin.
- **We will not host data on our cloud.** All data resides locally or on the research group's own server, never on Nebula's public cloud.

## Detailed Release Plan

The specific features for each version are maintained in the GitHub Project:

[Nebula Lab Roadmap](https://github.com/users/TshyGO/projects/1)
