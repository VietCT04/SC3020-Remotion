# SC3020 Project 1 motion graphics

A silent Remotion master composed of 16 technical motion-graphics scenes and seven one-second edit slates. It is intended to be intercut with recorded presenters, voice-over, source walkthroughs, and real task execution; it does not represent the complete assignment presentation.

## Requirements

- Node.js 22.6 or later
- npm

## Install and preview

```bash
npm install
npm run dev
```

Remotion Studio opens the `Master` composition. Individual compositions can also be selected in Studio.

## Render the master

```bash
npm run render
```

This writes:

- `out/sc3020-remotion-master.mp4` — 1920×1080, 30 fps, 6 minutes 40 seconds, silent H.264
- `out/edit-points.txt` — edit-slate timestamps and suggested inserts
- `out/timeline.md` — scene and marker start/end times, durations, purposes, and insert suggestions

The render script regenerates both manifests from `src/data/timeline.ts` before rendering.

## Render a scene by itself

Every master scene has an independent composition. For example:

```bash
npx remotion render src/index.ts Architecture out/architecture.mp4
npx remotion render src/index.ts DataBlocks out/data-blocks.mp4
npx remotion render src/index.ts BPlusTree out/bplus-tree.mp4
npx remotion render src/index.ts QueryTraversal out/query-traversal.mp4
npx remotion render src/index.ts NaiveVsGrouped out/naive-vs-grouped.mp4
npx remotion render src/index.ts HeapVsClustered out/heap-vs-clustered.mp4
npx remotion render src/index.ts Benchmark out/benchmark.mp4
npx remotion render src/index.ts Selectivity out/selectivity.mp4
npx remotion render src/index.ts Deletion out/deletion.mp4
npx remotion render src/index.ts Conclusion out/conclusion.mp4
```

## Project checks

```bash
npm run typecheck
npm run lint
```

Benchmark and record-layout figures live in `src/data/projectData.ts`; scene durations and edit points live in `src/data/timeline.ts`. Graphics use React, SVG, and CSS with system fonts only. No stock or generated imagery, paid assets, synthetic voices, avatars, or music are included.
