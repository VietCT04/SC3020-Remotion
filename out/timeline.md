# Master Video Timeline

Total runtime: 06:40 (400 seconds). Markers are included in the master and each lasts 1 second.

| Scene | Start | End | Duration | Purpose | Suggested real footage after it |
| --- | ---: | ---: | ---: | --- | --- |
| Project Title | 00:00 | 00:08 | 00:08 | Introduce the project and its storage, index, and retrieval themes. | Human project introduction |
| EDIT POINT 01 | 00:08 | 00:09 | 00:01 | Post-production insertion slate | Human project introduction |
| Architecture Overview | 00:09 | 00:34 | 00:25 | Trace records from the input file into separate data and index files. | Explain project architecture / show source directory |
| EDIT POINT 02 | 00:34 | 00:35 | 00:01 | Post-production insertion slate | Explain project architecture / show source directory |
| Record Layout | 00:35 | 00:55 | 00:20 | Show the packed 26-byte record and the key and tombstone fields. | — |
| 4 KB Data Blocks | 00:55 | 01:20 | 00:25 | Explain block capacity, heap pages, and RecordId addressing. | Show Task 1 implementation + run Task 1 |
| EDIT POINT 03 | 01:20 | 01:21 | 00:01 | Post-production insertion slate | Show Task 1 implementation + run Task 1 |
| B+ Tree Page Design | 01:21 | 01:51 | 00:30 | Show the page format, fanout, leaf links, and tree shape. | Show B+ tree node structures, insert/split code, run Task 2 |
| EDIT POINT 04 | 01:51 | 01:52 | 00:01 | Post-production insertion slate | Show B+ tree node structures, insert/split code, run Task 2 |
| Duplicate-Key Handling | 01:52 | 02:12 | 00:20 | Explain unique composite ordering for repeated key values. | — |
| Range-Query Traversal | 02:12 | 02:42 | 00:30 | Trace the greater-than range scan and report its result set. | Show range_greater_than(), collect_range(), leftmost_leaf_for_key() |
| EDIT POINT 05 | 02:42 | 02:43 | 00:01 | Post-production insertion slate | Show range_greater_than(), collect_range(), leftmost_leaf_for_key() |
| Naïve RID Retrieval | 02:43 | 03:03 | 00:20 | Show repeated block reads when each returned RID is fetched independently. | — |
| Grouped RID Retrieval | 03:03 | 03:28 | 00:25 | Compare grouping RIDs by block while holding tree results constant. | Show QueryEngine naïve vs grouped implementation |
| EDIT POINT 06 | 03:28 | 03:29 | 00:01 | Post-production insertion slate | Show QueryEngine naïve vs grouped implementation |
| Why Grouping Is Not Enough | 03:29 | 03:49 | 00:20 | Contrast heap block coverage with a full linear scan. | — |
| Heap vs FG_PCT_home-Clustered Layout | 03:49 | 04:19 | 00:30 | Show how physical record organization affects range retrieval. | — |
| Four-Way Benchmark | 04:19 | 04:54 | 00:35 | Compare runtime and application-level data-block read calls. | — |
| Selectivity Experiment | 04:54 | 05:24 | 00:30 | Compare observed retrieval times across query selectivities. | — |
| Deletion | 05:24 | 05:49 | 00:25 | Separate logical index deletion from storage tombstoning. | — |
| B+ Tree After Deletion | 05:49 | 06:14 | 00:25 | Show the resulting tree shape and validation outcome. | Run real Task 3 deletion and show updated tree output |
| EDIT POINT 07 | 06:14 | 06:15 | 00:01 | Post-production insertion slate | Run real Task 3 deletion and show updated tree output |
| Technical Takeaway | 06:15 | 06:40 | 00:25 | Summarize index search, RID grouping, locality, and selectivity. | — |
