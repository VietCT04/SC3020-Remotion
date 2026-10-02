export const FPS = 30;
export const WIDTH = 1920;
export const HEIGHT = 1080;
export const EDIT_MARKER_SECONDS = 1;

export const scenes = [
  { id: 'ProjectTitle', title: 'Project Title', durationSeconds: 8, purpose: 'Introduce the project and its storage, index, and retrieval themes.' },
  { id: 'Architecture', title: 'Architecture Overview', durationSeconds: 25, purpose: 'Trace records from the input file into separate data and index files.' },
  { id: 'RecordLayout', title: 'Record Layout', durationSeconds: 20, purpose: 'Show the packed 26-byte record and the key and tombstone fields.' },
  { id: 'DataBlocks', title: '4 KB Data Blocks', durationSeconds: 25, purpose: 'Explain block capacity, heap pages, and RecordId addressing.' },
  { id: 'BPlusTree', title: 'B+ Tree Page Design', durationSeconds: 30, purpose: 'Show the page format, fanout, leaf links, and tree shape.' },
  { id: 'DuplicateKeys', title: 'Duplicate-Key Handling', durationSeconds: 20, purpose: 'Explain unique composite ordering for repeated key values.' },
  { id: 'QueryTraversal', title: 'Range-Query Traversal', durationSeconds: 30, purpose: 'Trace the greater-than range scan and report its result set.' },
  { id: 'NaiveRetrieval', title: 'Naïve RID Retrieval', durationSeconds: 20, purpose: 'Show repeated block reads when each returned RID is fetched independently.' },
  { id: 'GroupedRetrieval', title: 'Grouped RID Retrieval', durationSeconds: 25, purpose: 'Compare grouping RIDs by block while holding tree results constant.' },
  { id: 'Locality', title: 'Why Grouping Is Not Enough', durationSeconds: 20, purpose: 'Contrast heap block coverage with a full linear scan.' },
  { id: 'HeapVsClustered', title: 'Heap vs FG_PCT_home-Clustered Layout', durationSeconds: 30, purpose: 'Show how physical record organization affects range retrieval.' },
  { id: 'Benchmark', title: 'Four-Way Benchmark', durationSeconds: 35, purpose: 'Compare runtime and application-level data-block read calls.' },
  { id: 'Selectivity', title: 'Selectivity Experiment', durationSeconds: 30, purpose: 'Compare observed retrieval times across query selectivities.' },
  { id: 'Deletion', title: 'Deletion', durationSeconds: 25, purpose: 'Separate logical index deletion from storage tombstoning.' },
  { id: 'AfterDeletion', title: 'B+ Tree After Deletion', durationSeconds: 25, purpose: 'Show the resulting tree shape and validation outcome.' },
  { id: 'Conclusion', title: 'Technical Takeaway', durationSeconds: 25, purpose: 'Summarize index search, RID grouping, locality, and selectivity.' },
] as const;

export type SceneId = (typeof scenes)[number]['id'];

export const editPoints = [
  { after: 'ProjectTitle', insert: 'Human project introduction' },
  { after: 'Architecture', insert: 'Explain project architecture / show source directory' },
  { after: 'DataBlocks', insert: 'Show Task 1 implementation + run Task 1' },
  { after: 'BPlusTree', insert: 'Show B+ tree node structures, insert/split code, run Task 2' },
  { after: 'QueryTraversal', insert: 'Show range_greater_than(), collect_range(), leftmost_leaf_for_key()' },
  { after: 'GroupedRetrieval', insert: 'Show QueryEngine naïve vs grouped implementation' },
  { after: 'AfterDeletion', insert: 'Run real Task 3 deletion and show updated tree output' },
] as const;

export const sceneStartSeconds = (index: number) => scenes
  .slice(0, index)
  .reduce((seconds, scene) => seconds + scene.durationSeconds + (editPoints.some((point) => point.after === scene.id) ? EDIT_MARKER_SECONDS : 0), 0);

export const masterDurationSeconds = scenes.reduce(
  (seconds, scene) => seconds + scene.durationSeconds + (editPoints.some((point) => point.after === scene.id) ? EDIT_MARKER_SECONDS : 0),
  0,
);
