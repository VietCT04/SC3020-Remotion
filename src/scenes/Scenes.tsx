import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';
import { projectData as d } from '../data/projectData';
import {
  ArchitectureDiagram, Arrow, BPlusLeaf, BPlusNode, BenchmarkBar, C, CodeFunctionLabel, ComparisonTable,
  DataBlock, MetricCard, Panel, Pill, RecordLayout, RecordSlot, Reveal, RIDBadge, S, SceneFrame,
  TakeawayCard, TitleCard, smallText,
} from '../components/Visuals';

const TwoColumn = ({ left, right, gap = 28 }: { left: React.ReactNode; right: React.ReactNode; gap?: number }) => <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap, alignItems: 'center', height: '100%' }}>{left}{right}</div>;
export const ProjectTitleScene = () => <SceneFrame section="Project 1 / Introduction" title="SC3020 Database System Principles" accent={C.blue}>
  <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingBottom: 35 }}>
    <Reveal at={5}><TitleCard>
      <div style={{ color: C.muted, fontSize: 25, letterSpacing: 3, fontWeight: 600 }}>PROJECT 1</div>
      <div style={{ fontSize: 62, lineHeight: 1.06, fontWeight: 730, letterSpacing: -2 }}>Disk-Based Storage<br />&amp; B+ Tree Indexing</div>
      <div style={{ color: C.muted, fontSize: 27, marginTop: 5 }}>NBA Games Dataset <span style={{ color: C.dim, padding: '0 12px' }}>·</span> <span style={{ color: C.purple }}>FG_PCT_home</span> Index</div>
    </TitleCard></Reveal>
    <Reveal at={55}><div style={{ display: 'flex', alignItems: 'center', gap: 20, marginTop: 60 }}>
      <Pill color={C.blue}>DATA BLOCKS</Pill><Arrow color={C.muted} /><Pill color={C.amber}>RECORD IDS</Pill><Arrow color={C.muted} /><Pill color={C.purple}>B+ TREE</Pill>
    </div></Reveal>
    <Reveal at={130}><div style={{ color: C.muted, fontSize: 24, marginTop: 54 }}>Storage <span style={{ color: C.dim }}>•</span> Indexing <span style={{ color: C.dim }}>•</span> Retrieval <span style={{ color: C.dim }}>•</span> Deletion</div></Reveal>
  </div>
</SceneFrame>;

export const ArchitectureScene = () => <SceneFrame section="System Design" title="Data and index files stay separate" accent={C.blue}>
  <Reveal at={0}><ArchitectureDiagram nodes={[
    { title: 'games.txt', detail: 'dataset input', color: C.grey },
    { title: 'DatasetParser', detail: 'parse rows', color: C.blue },
    { title: 'Record', detail: '26-byte value', color: C.blue },
    { title: 'StorageManager', detail: 'pack records', color: C.blue },
    { title: 'RecordId', detail: '(block_id, slot_id)', color: C.amber },
  ]} /></Reveal>
  <div style={{ height: 28 }} />
  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 34, height: 415 }}>
    <Reveal at={35}><Panel accent={C.blue} title="Data file" style={{ height: '100%', boxSizing: 'border-box' }}>
      <div style={{ ...S.row, justifyContent: 'space-between', marginBottom: 16 }}><div style={{ fontSize: 30, fontWeight: 700, ...S.mono }}>data_disk.bin</div><Pill color={C.blue}>4 KB BLOCKS</Pill></div>
      <div style={{ display: 'flex', gap: 14, alignItems: 'center', marginTop: 22 }}><DataBlock label="BLOCK 0" slots={8} active={[0, 1, 2, 3, 4, 5, 6]} width={360} /><div style={{ color: C.muted, fontSize: 23 }}>…</div><DataBlock label={`BLOCK ${d.records.dataBlocks - 1}`} slots={8} active={[0, 1, 2, 3]} width={360} /></div>
      <div style={{ marginTop: 22, display: 'flex', alignItems: 'center', gap: 16 }}><RIDBadge block="12" slot="8" /><span style={{ color: C.muted, fontSize: 21 }}>locates one record slot in the heap</span></div>
    </Panel></Reveal>
    <Reveal at={65}><Panel accent={C.purple} title="Index file" style={{ height: '100%', boxSizing: 'border-box' }}>
      <div style={{ ...S.row, justifyContent: 'space-between', marginBottom: 20 }}><div style={{ fontSize: 30, fontWeight: 700, ...S.mono }}>index_disk.bin</div><Pill color={C.purple}>4 KB PAGES</Pill></div>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 12 }}><BPlusNode keys={['0.46', '0.50', '0.56']} width={610} /></div>
      <div style={{ textAlign: 'center', color: C.purple, fontSize: 21, margin: '8px 0 5px' }}>B+ tree internal separators</div>
      <div style={{ display: 'flex', justifyContent: 'center' }}><BPlusLeaf entries={['(0.511, RID)', '(0.524, RID)', '…']} active /></div>
      <div style={{ color: C.muted, fontSize: 21, textAlign: 'center', marginTop: 12 }}><span style={{ color: C.amber }}> (FG_PCT_home, RecordId)</span> · no full record payload</div>
    </Panel></Reveal>
  </div>
  <Reveal at={130}><div style={{ textAlign: 'center', fontSize: 28, fontWeight: 650, marginTop: 26 }}>Data and index remain physically separate. The B+ tree points to records through <span style={{ color: C.amber }}>RecordIds</span>.</div></Reveal>
</SceneFrame>;

export const RecordLayoutScene = () => <SceneFrame section="Task 1 / Serialization" title="A packed, fixed-width record" accent={C.blue}>
  <TwoColumn left={<div><RecordLayout fields={d.records.fields} highlight="fg_pct_home" /><div style={{ display: 'flex', gap: 13, marginTop: 18 }}><Pill color={C.amber}>B+ TREE KEY · FG_PCT_home</Pill><Pill color={C.red}>TOMBSTONE · is_deleted</Pill></div></div>} right={<div style={{ ...S.stack, justifyContent: 'center' }}>
    <Panel accent={C.blue} title="26 bytes · offset map">
      <div style={{ ...S.mono, display: 'flex', height: 100, borderRadius: 10, overflow: 'hidden', border: `1px solid ${C.line}` }}>
        {d.records.fields.map((field) => <div key={field.field} style={{ flex: field.bytes, display: 'grid', placeItems: 'center', background: field.field === 'fg_pct_home' ? C.amber : field.field === 'is_deleted' ? C.red : C.blueSoft, color: field.field === 'fg_pct_home' || field.field === 'is_deleted' ? C.bg : C.text, borderRight: `1px solid ${C.bg}`, fontSize: field.bytes === 1 ? 14 : 16, overflow: 'hidden' }}>{field.offset}</div>)}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', color: C.dim, fontSize: 16, marginTop: 8 }}><span>byte 0</span><span>byte 25</span></div>
      <div style={{ ...smallText, marginTop: 22 }}>Fields are serialized in the displayed order. The record has no alignment padding.</div>
    </Panel>
    <MetricCard label="Serialized record" value={`${d.records.recordBytes} bytes`} note="26 bytes total · packed, no padding" accent={C.green} />
  </div>} />
</SceneFrame>;

export const DataBlocksScene = () => <SceneFrame section="Task 1 / Heap Storage" title="4 KB data-block layout" accent={C.blue}>
  <TwoColumn left={<Panel accent={C.blue} title="ONE DATA BLOCK · 4,096 BYTES" style={{ padding: 30 }}>
    <div style={{ border: `2px solid ${C.blue}`, borderRadius: 13, overflow: 'hidden', marginTop: 8 }}>
      <div style={{ padding: '14px 20px', background: C.blueSoft, fontSize: 21, ...S.mono }}>2-byte record count</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(8,1fr)', gap: 8, padding: 16, background: '#0d1520' }}>
        {['0','1','2','3','…','154','155','156'].map((n, i) => <div key={n + i} style={{ border: `1px solid ${i === 0 ? C.amber : C.blue}88`, background: i === 0 ? `${C.amber}22` : C.blueSoft, borderRadius: 8, height: 66, display: 'grid', placeItems: 'center', color: i === 0 ? C.amber : C.text, ...S.mono, fontSize: 15 }}>{i === 4 ? '…' : `Record ${n}`}<small style={{ fontSize: 13, color: C.muted }}>{i === 4 ? '' : '26 B'}</small></div>)}
      </div>
      <div style={{ padding: '12px 20px', background: '#27303c', color: C.muted, fontSize: 19, ...S.mono }}>12 unused bytes</div>
    </div>
      <div style={{ textAlign: 'center', marginTop: 22, fontSize: 30, fontWeight: 720, ...S.mono }}>⌊({d.records.blockBytes} − {d.records.countBytes}) / {d.records.recordBytes}⌋ = <span style={{ color: C.amber }}>{d.records.recordsPerBlock} records per block</span></div>
  </Panel>} right={<div style={{ ...S.stack }}>
    <MetricCard label="Valid records" value={d.records.valid.toLocaleString('en-US')} note={`${d.records.skipped} malformed rows skipped from ${d.records.input.toLocaleString('en-US')} input rows`} accent={C.blue} />
    <MetricCard label="Heap capacity" value={`${d.records.dataBlocks} blocks`} note={`${d.records.recordsPerBlock} record slots per block`} accent={C.blue} />
    <Panel accent={C.amber} title="A RecordId names one slot">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', gap: 10 }}><DataBlock label="BLOCK 12" slots={8} active={[0,1,2,3,4,5,6,7]} highlight={[5]} width={340} /><Arrow color={C.amber} /><div><RIDBadge block={12} slot={5} color={C.amber} /><div style={{ color: C.muted, fontSize: 18, marginTop: 12 }}>RecordId = (block_id, slot_id)</div></div></div>
    </Panel>
  </div>} />
</SceneFrame>;

export const BPlusTreeScene = () => <SceneFrame section="Task 2 / Index Pages" title="One B+ tree node per 4 KB page" accent={C.purple}>
  <div style={{ display: 'grid', gridTemplateColumns: '660px 1fr', gap: 34, height: '100%' }}>
    <div style={{ ...S.stack }}>
      <Panel accent={C.purple} title="LEAF PAGE CAPACITY">
        <div style={{ display: 'flex', gap: 14, alignItems: 'center', marginBottom: 16 }}><span style={{ ...S.mono, fontSize: 22 }}>{d.bplus.nodeHeaderBytes}-byte node header</span><span style={{ color: C.dim }}>+</span><span style={{ ...S.mono, fontSize: 22, color: C.purple }}>{d.bplus.order} × {d.bplus.leafEntry.totalBytes}-byte entries</span></div>
        <ComparisonTable columns={['Leaf entry field', 'Bytes']} rows={[
          ['key', `${d.bplus.leafEntry.keyBytes} B`], ['block_id', `${d.bplus.leafEntry.blockIdBytes} B`], ['slot_id', `${d.bplus.leafEntry.slotIdBytes} B`], ['Total', `${d.bplus.leafEntry.totalBytes} B / leaf entry`],
        ]} widths="1fr 150px" />
        <div style={{ textAlign: 'center', fontSize: 27, ...S.mono, marginTop: 20 }}>⌊({d.records.blockBytes} − {d.bplus.nodeHeaderBytes}) / {d.bplus.leafEntry.totalBytes}⌋ = <b style={{ color: C.amber }}>{d.bplus.order}</b></div>
        <div style={{ textAlign: 'center', color: C.purple, fontSize: 24, marginTop: 8 }}>B+ tree parameter n = {d.bplus.order}</div>
      </Panel>
      <Panel accent={C.purple} title="Doubly linked leaf chain">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 15 }}><span style={{ color: C.muted, fontSize: 23 }}>previous ←</span><BPlusLeaf entries={['…', '0.500', '0.511']} /><span style={{ color: C.muted, fontSize: 23 }}>→ next</span></div>
      </Panel>
    </div>
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 28 }}>
      <div style={{ ...S.label, color: C.purple }}>INDEX TREE · SIMPLIFIED</div>
      <BPlusNode keys={['0.42', '0.46', '0.50', '…']} width={690} />
      <div style={{ color: C.purple, fontSize: 28 }}>↙　　 ↓　　 ↓　　 ↘</div>
      <div style={{ display: 'flex', gap: 14 }}><BPlusLeaf entries={['0.42', '0.44']} /><BPlusLeaf entries={['0.46', '0.48']} /><BPlusLeaf entries={['0.50', '0.51']} /><BPlusLeaf entries={['…', '0.62']} /></div>
      <div style={{ display: 'flex', gap: 20, marginTop: 12 }}><MetricCard label="Active nodes" value={`${d.bplus.heapNodes}`} accent={C.purple} /><MetricCard label="Levels" value={`${d.bplus.heapLevels}`} accent={C.purple} /><MetricCard label="Leaves" value={`${d.bplus.heapLeaves}`} accent={C.purple} /><MetricCard label="Root separators" value={`${d.bplus.heapRootSeparators}`} accent={C.purple} /></div>
      <div style={{ color: C.muted, fontSize: 19 }}>The root has {d.bplus.heapRootSeparators} separator keys; individual values omitted here.</div>
    </div>
  </div>
</SceneFrame>;

export const DuplicateKeysScene = () => <SceneFrame section="Index Semantics" title="Duplicate keys still identify distinct records" accent={C.purple}>
  <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 28 }}>
    <Panel accent={C.purple} title="Many rows share the same search key">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', gap: 22 }}>
        {d.task3.examples.rids.slice(0, 3).map((rid, index) => <div key={`${rid.block}-${rid.slot}-${index}`} style={{ textAlign: 'center' }}><div style={{ color: C.amber, fontSize: 27, ...S.mono }}>FG_PCT_home = {d.task3.examples.duplicateKey.toFixed(3)}</div><div style={{ color: C.muted, fontSize: 20, marginTop: 9 }}>Record {String.fromCharCode(65 + index)} · RID ({rid.block},{rid.slot})</div></div>)}
      </div>
    </Panel>
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 25 }}><Pill color={C.amber}>{d.task3.examples.duplicateKey.toFixed(3)}</Pill><Arrow color={C.purple} /><Pill color={C.purple}>(key, block_id, slot_id)</Pill></div>
    <div style={{ display: 'flex', gap: 28, alignItems: 'stretch' }}>
      <MetricCard label="Same FG_PCT_home" value="≠" note="same record" accent={C.amber} />
      <Panel accent={C.purple} title="Composite order keeps leaf entries unique" style={{ flex: 2 }}>
        <div style={{ display: 'flex', justifyContent: 'space-around', fontSize: 25, ...S.mono }}>{[[12, 8], [27, 14], [83, 2]].map(([block, slot]) => <span key={block}>(0.500, {block}, {slot})</span>)}</div>
        <div style={{ color: C.muted, fontSize: 19, textAlign: 'center', marginTop: 18 }}>Sorted by key, then by RecordId.</div>
      </Panel>
      <MetricCard label="Targeted delete" value="1 pair" note="remove one (key, RecordId)" accent={C.red} />
    </div>
  </div>
</SceneFrame>;

export const QueryTraversalScene = () => <SceneFrame section="Task 3 / Range Query" title="FG_PCT_home > 0.5" accent={C.amber}>
  <div style={{ display: 'grid', gridTemplateColumns: '1.2fr .8fr', gap: 35, height: '100%' }}>
    <Panel accent={C.purple} title="ROOT SEARCH → BOUNDARY LEAF → FORWARD RANGE SCAN">
      <div style={{ display: 'flex', justifyContent: 'center', margin: '10px 0 14px' }}><BPlusNode keys={['0.46', '0.50', '0.56']} width={700} active /></div>
      <div style={{ textAlign: 'center', color: C.purple, fontSize: 24 }}>↓ root search</div>
      <div style={{ display: 'flex', justifyContent: 'center', margin: '10px 0' }}><BPlusLeaf entries={['0.498','0.500','0.500']} active label="BOUNDARY LEAF NEAR 0.5" /></div>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 16, alignItems: 'center', color: C.muted, fontSize: 20, marginBottom: 16 }}><span>previous ← check earlier duplicate leaves</span><span style={{ color: C.purple }}>→ then follow next links</span></div>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 12 }}><BPlusLeaf entries={['0.500','0.500']} label="SKIP: NOT GREATER" /><span style={{ alignSelf: 'center', color: C.dim, fontSize: 22 }}>→</span><BPlusLeaf entries={['0.511','0.524','0.556']} active label="EMIT: KEY > 0.5" /><span style={{ alignSelf: 'center', color: C.dim, fontSize: 22 }}>→ …</span></div>
      <div style={{ textAlign: 'center', marginTop: 20 }}><CodeFunctionLabel>range_greater_than(0.5)</CodeFunctionLabel></div>
    </Panel>
    <div style={{ ...S.stack, justifyContent: 'center' }}>
      <Panel accent={C.amber} title="MATCHING LEAF ENTRIES EMIT RIDs">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 11, marginTop: 12 }}><Pill color={C.amber}>(0.511, RID)</Pill><Pill color={C.amber}>(0.524, RID)</Pill><Pill color={C.amber}>(0.556, RID)</Pill><Pill color={C.amber}>…</Pill></div>
        <div style={{ color: C.muted, fontSize: 18, marginTop: 18 }}>Only keys strictly greater than 0.5 are collected.</div>
      </Panel>
      <MetricCard label="Matching records" value={d.task3.matches.toLocaleString('en-US')} note={`${d.task3.selectivityPct.toFixed(2)}% selectivity`} accent={C.amber} />
      <MetricCard label="Mean FG_PCT_home" value={d.task3.meanFgPct.toFixed(6)} accent={C.green} />
    </div>
  </div>
</SceneFrame>;

export const NaiveRetrievalScene = () => <SceneFrame section="Task 3 / RID Retrieval" title="Naïve retrieval reads once per RID" accent={C.grey}>
  <div style={{ display: 'grid', gridTemplateColumns: '1fr 450px', gap: 34, height: '100%' }}>
    <Panel accent={C.grey} title="SAME BLOCK CAN BE READ AGAIN">
      <div style={{ display: 'grid', gridTemplateColumns: '180px 1fr 210px', gap: '15px 20px', alignItems: 'center', marginTop: 8 }}>
        {d.task3.examples.rids.map((rid, index) => <Reveal key={`${rid.block}-${rid.slot}-${index}`} at={index * 20} style={{ display: 'grid', gridColumn: '1 / span 3', gridTemplateColumns: '180px 1fr 210px', gap: 20, alignItems: 'center' }}>
          <RIDBadge block={rid.block} slot={rid.slot} color={C.grey} /><Arrow color={C.grey} /><div style={{ fontSize: 22, ...S.mono, color: d.task3.examples.rids.slice(0, index).some((prior) => prior.block === rid.block) ? C.red : C.text }}>READ BLOCK {rid.block}{d.task3.examples.rids.slice(0, index).some((prior) => prior.block === rid.block) ? ' AGAIN' : ''}</div>
        </Reveal>)}
      </div>
      <div style={{ height: 1, background: C.line, margin: '28px 0' }} />
      <div style={{ ...smallText }}>Each returned RecordId triggers an application-level data-block read call in this naïve retrieval path.</div>
    </Panel>
    <div style={{ ...S.stack, justifyContent: 'center' }}>
      <MetricCard label="Range results" value={d.task3.matches.toLocaleString('en-US')} accent={C.amber} />
      <MetricCard label="Application-level data-block read calls" value={d.benchmark.naiveReads.toLocaleString('en-US')} accent={C.grey} />
      <MetricCard label="Median runtime" value={`${d.benchmark.naiveMedianMs.toFixed(3)} ms`} accent={C.red} />
    </div>
  </div>
</SceneFrame>;

export const GroupedRetrievalScene = () => <SceneFrame section="Task 3 / Retrieval Strategy" title="Group RIDs by block before fetching" accent={C.green}>
  <div style={{ display: 'grid', gridTemplateColumns: '1fr 500px', gap: 30, height: '100%' }}>
    <div style={{ ...S.stack }}>
      <Panel accent={C.amber} title="INPUT RIDS · SAME RESULT SET">
        <div style={{ display: 'flex', gap: 15, flexWrap: 'wrap' }}>{d.task3.examples.rids.map((rid, index) => <RIDBadge key={index} block={rid.block} slot={rid.slot} color={C.amber} />)}</div>
      </Panel>
      <div style={{ textAlign: 'center', color: C.green, fontSize: 27, ...S.mono }}>group by block_id ↓</div>
      <Panel accent={C.green} title="GROUPED RECORD IDS">
        <div style={{ display: 'flex', justifyContent: 'center', gap: 65, alignItems: 'center' }}>
          {[...new Set(d.task3.examples.rids.map((rid) => rid.block))].map((block) => <div key={block} style={{ ...S.panel, minWidth: block === 7 ? 330 : 260, borderColor: C.green }}><div style={{ color: C.green, fontSize: 25, fontWeight: 700 }}>Block {block}</div><div style={{ fontSize: 22, marginTop: 12 }}>{d.task3.examples.rids.filter((rid) => rid.block === block).map((rid, index, group) => <div key={rid.slot}>{index === group.length - 1 ? '└──' : '├──'} slot {rid.slot}</div>)}</div><div style={{ color: C.muted, fontSize: 18, marginTop: 13 }}>read once</div></div>)}
        </div>
      </Panel>
      <div style={{ fontSize: 19, color: C.muted, textAlign: 'center' }}>Same B+ tree · Same heap layout · Same query result · Only retrieval strategy changed</div>
    </div>
    <div style={{ ...S.stack, justifyContent: 'center' }}>
      <Panel accent={C.grey} title="NAÏVE → GROUPED">
        <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}><div style={{ textAlign: 'center' }}><div style={{ color: C.grey, fontSize: 40, fontWeight: 750 }}>{d.benchmark.naiveReads.toLocaleString('en-US')}</div><div style={{ color: C.muted, fontSize: 16 }}>calls · {d.benchmark.naiveMedianMs.toFixed(3)} ms</div></div><div style={{ color: C.green, fontSize: 30 }}>→</div><div style={{ textAlign: 'center' }}><div style={{ color: C.green, fontSize: 40, fontWeight: 750 }}>{d.benchmark.groupedReads}</div><div style={{ color: C.muted, fontSize: 16 }}>calls · {d.benchmark.groupedMedianMs.toFixed(3)} ms</div></div></div>
      </Panel>
      <MetricCard label="Fewer application read calls" value={`${d.benchmark.fewerCallsPct.toFixed(2)}%`} accent={C.green} />
      <MetricCard label="Speedup" value={`${d.benchmark.naiveToGrouped.toFixed(2)}× faster`} accent={C.green} />
    </div>
  </div>
</SceneFrame>;

export const LocalityScene = () => <SceneFrame section="Retrieval / Physical Locality" title="Grouping cannot improve heap locality" accent={C.grey}>
  <div style={{ display: 'grid', gridTemplateColumns: '1fr 560px', gap: 35, height: '100%' }}>
    <Panel accent={C.grey} title={`MATCHES SCATTERED ACROSS ALL ${d.records.dataBlocks} HEAP BLOCKS`}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(17, 1fr)', gap: 7, margin: '18px 0' }}>
        {Array.from({ length: d.records.dataBlocks }, (_, i) => { const hit = (i * 7 + Math.floor(i / 5)) % 11 < 3; return <div key={i} style={{ height: 34, borderRadius: 5, background: hit ? `${C.amber}aa` : '#252f3b', border: `1px solid ${hit ? C.amber : C.line}`, display: 'grid', placeItems: 'center', color: hit ? C.bg : C.dim, fontSize: 12, ...S.mono }}>{i + 1}</div>; })}
      </div>
      <div style={{ display: 'flex', gap: 28, color: C.muted, fontSize: 20 }}><span><b style={{ color: C.amber }}>■</b> matching records in block</span><span><b style={{ color: C.dim }}>■</b> other block contents</span></div>
      <div style={{ fontSize: 23, textAlign: 'center', marginTop: 22 }}>{d.task3.selectivityPct.toFixed(2)}% of records match, yet matches appear in all <b style={{ color: C.amber }}>{d.records.dataBlocks} data blocks</b>.</div>
    </Panel>
    <div style={{ ...S.stack, justifyContent: 'center' }}>
      <Panel accent={C.green} title="B+ TREE + GROUPED RETRIEVAL">
        <div style={{ fontSize: 24, fontWeight: 700 }}>Heap layout</div><div style={{ color: C.green, fontSize: 29, marginTop: 8 }}>{d.benchmark.heapUniqueBlocks} unique blocks · {d.benchmark.groupedReads} calls · {d.benchmark.groupedMedianMs.toFixed(3)} ms</div>
      </Panel>
      <Panel accent={C.grey} title="FULL LINEAR SCAN">
        <div style={{ fontSize: 24, fontWeight: 700 }}>Heap layout</div><div style={{ color: C.grey, fontSize: 29, marginTop: 8 }}>{d.benchmark.linearReads} blocks · {d.benchmark.linearReads} calls · {d.benchmark.linearMedianMs.toFixed(3)} ms</div>
      </Panel>
      <div style={{ fontSize: 27, lineHeight: 1.38, fontWeight: 650, color: C.text }}>Grouping removes redundant reads,<br />but it cannot fix poor physical locality.</div>
    </div>
  </div>
</SceneFrame>;

export const HeapVsClusteredScene = () => {
  const frame = useCurrentFrame();
  const reorder = interpolate(frame, [210, 420], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const scattered = new Set([1, 4, 7, 11, 15, 19, 23, 31]);
  return <SceneFrame section="Additional Experiment / Data Organization" title="Reordering records improves range locality" accent={C.green}>
    <div style={{ ...S.stack, height: '100%', justifyContent: 'center' }}>
      <Panel accent={C.grey} title="HEAP · INPUT / DATE ORDER">
        <div style={{ display: 'flex', gap: 8, margin: '8px 0 14px' }}>{Array.from({ length: 34 }, (_, i) => { const hit = scattered.has(i); return <div key={i} style={{ flex: 1, height: 46, borderRadius: 5, border: `1px solid ${hit ? C.amber : C.line}`, background: hit ? `${C.amber}88` : '#252f3b' }} />; })}</div>
        <div style={{ color: C.muted, fontSize: 18 }}>Qualifying records (amber) are scattered through the heap.</div>
        <div style={{ color: C.grey, fontSize: 21, marginTop: 8 }}>Heap: {d.benchmark.heapUniqueBlocks} unique blocks</div>
      </Panel>
      <div style={{ textAlign: 'center', color: C.green, fontSize: 25, ...S.mono }}>reorder physical records by FG_PCT_home ↓</div>
      <Panel accent={C.green} title="B+ TREE OVER FG_PCT_home-CLUSTERED DATA">
        <div style={{ display: 'flex', alignItems: 'center', gap: 22, margin: '8px 0 14px' }}>
          <div style={{ color: C.blue, fontSize: 17 }}>low FG</div>
          <div style={{ flex: 1, position: 'relative', height: 58 }}>{Array.from({ length: 34 }, (_, i) => {
            const startSlot = (i * 13) % 34;
            const position = startSlot + (i - startSlot) * reorder;
            const qualifying = i >= 26;
            return <div key={i} style={{ position: 'absolute', left: `${position / 34 * 100}%`, width: `${100 / 34}%`, height: 52, boxSizing: 'border-box', borderRadius: 5, border: `1px solid ${qualifying ? C.green : C.line}`, background: qualifying ? `${C.green}85` : '#252f3b' }} />;
          })}</div>
          <div style={{ color: C.green, fontSize: 17 }}>high FG</div>
        </div>
        <div style={{ color: C.green, fontSize: 22, marginTop: 8 }}>FG_PCT_home &gt; 0.5 · qualifying range moves into a compact region</div>
      </Panel>
      <div style={{ display: 'flex', gap: 22 }}>
        <MetricCard label="Unique data blocks" value={`${d.benchmark.heapUniqueBlocks} → ${d.benchmark.clusteredUniqueBlocks}`} note={`${((1 - d.benchmark.clusteredUniqueBlocks / d.benchmark.heapUniqueBlocks) * 100).toFixed(2)}% fewer`} accent={C.green} />
        <MetricCard label="Heap B+ grouped" value={`${d.benchmark.groupedMedianMs.toFixed(3)} ms`} accent={C.grey} />
        <MetricCard label="FG_PCT_home-clustered storage · B+ grouped" value={`${d.benchmark.clusteredMedianMs.toFixed(3)} ms`} accent={C.green} />
        <MetricCard label="Speedup" value={`${d.benchmark.groupedToClustered.toFixed(2)}×`} accent={C.green} />
      </div>
      <div style={{ color: C.muted, fontSize: 18, textAlign: 'center' }}>The secondary B+ tree remains separate and stores (key, RecordId); clustered storage is an additional experiment.</div>
    </div>
  </SceneFrame>;
};

export const BenchmarkScene = () => {
  const frame = useCurrentFrame();
  const runtimeOpacity = interpolate(frame, [0, 12, 435, 465], [0, 1, 1, 0], { extrapolateRight: 'clamp' });
  const readsOpacity = interpolate(frame, [435, 465, 1049, 1050], [0, 1, 1, 1], { extrapolateRight: 'clamp' });
  const runtime = [
    ['Heap / Linear', d.benchmark.linearMedianMs, C.grey],
    ['Heap / B+ naïve', d.benchmark.naiveMedianMs, C.purple],
    ['Heap / B+ grouped', d.benchmark.groupedMedianMs, C.green],
    ['FG_PCT_home-clustered data / B+ grouped', d.benchmark.clusteredMedianMs, C.blue],
  ] as const;
  const reads = [
    ['Heap / Linear', d.benchmark.linearReads, C.grey],
    ['Heap / B+ naïve', d.benchmark.naiveReads, C.purple],
    ['Heap / B+ grouped', d.benchmark.groupedReads, C.green],
    ['FG_PCT_home-clustered data / B+ grouped', d.benchmark.clusteredReads, C.blue],
  ] as const;
  return <SceneFrame section="Benchmark / Median Results" title="Four-way comparison" accent={C.blue}>
    <div style={{ position: 'relative', height: '100%' }}>
      <div style={{ position: 'absolute', inset: 0, opacity: runtimeOpacity }}>
        <Panel accent={C.blue} title="A · MEDIAN RUNTIME (LOWER IS BETTER)" style={{ maxWidth: 1500, margin: '0 auto' }}>
          <div style={{ marginTop: 20 }}>{runtime.map(([label, value, color]) => <BenchmarkBar key={label} label={label} value={value} max={5.2} color={color} />)}</div>
          <div style={{ display: 'flex', gap: 18, marginTop: 22 }}><Pill color={C.green}>Naïve → Grouped · {d.benchmark.naiveToGrouped.toFixed(2)}× faster</Pill><Pill color={C.blue}>Heap Grouped → Clustered · {d.benchmark.groupedToClustered.toFixed(2)}× faster</Pill><Pill color={C.amber}>Naïve → Clustered Grouped · {d.benchmark.naiveToClustered.toFixed(2)}× faster</Pill></div>
        </Panel>
        <div style={{ textAlign: 'center', color: C.muted, fontSize: 18, marginTop: 16 }}>Observed medians · OS page cache remains enabled</div>
      </div>
      <div style={{ position: 'absolute', inset: 0, opacity: readsOpacity }}>
        <Panel accent={C.amber} title="B · APPLICATION-LEVEL DATA-BLOCK READ CALLS" style={{ maxWidth: 1500, margin: '0 auto' }}>
          <div style={{ marginTop: 20 }}>{reads.map(([label, value, color]) => <BenchmarkBar key={label} label={label} value={value} max={6100} color={color} suffix="calls" />)}</div>
          <div style={{ display: 'flex', gap: 22, marginTop: 27, justifyContent: 'center' }}><MetricCard label="Naïve → Grouped" value={`${d.benchmark.naiveToGrouped.toFixed(2)}× faster`} accent={C.green} /><MetricCard label="Heap Grouped → Clustered" value={`${d.benchmark.groupedToClustered.toFixed(2)}× faster`} accent={C.blue} /><MetricCard label="Naïve → Clustered Grouped" value={`${d.benchmark.naiveToClustered.toFixed(2)}× faster`} accent={C.amber} /></div>
          <div style={{ textAlign: 'center', color: C.muted, fontSize: 18, marginTop: 18 }}>B+ tree search and heap layout are unchanged in the naïve vs grouped comparison.</div>
        </Panel>
      </div>
    </div>
  </SceneFrame>;
};

export const SelectivityScene = () => {
  const frame = useCurrentFrame();
  const points = d.selectivity;
  const x = (selectivity: number) => 65 + ((90 - selectivity) / 90) * 610;
  const y = (ms: number) => 355 - (ms / 3) * 300;
  const series = [
    { label: 'Linear', color: C.grey, key: 'linearMs' as const },
    { label: 'Heap B+ grouped', color: C.green, key: 'heapGroupedMs' as const },
    { label: 'FG_PCT_home-clustered B+ grouped', color: C.blue, key: 'clusteredGroupedMs' as const },
  ];
  return <SceneFrame section="Benchmark / Query Selectivity" title="Indexed retrieval as selectivity changes" accent={C.amber}>
    <div style={{ display: 'grid', gridTemplateColumns: '760px 1fr', gap: 30, height: '100%' }}>
      <Panel accent={C.amber} title="MEDIAN RETRIEVAL TIME">
        <svg width="700" height="440" viewBox="0 0 700 440" style={{ overflow: 'visible', marginTop: 4 }}>
          {[0,1,2,3].map((tick) => <g key={tick}><line x1="65" y1={y(tick)} x2="675" y2={y(tick)} stroke={C.line} strokeWidth="1" /><text x="50" y={y(tick)+6} fill={C.muted} fontSize="16" textAnchor="end">{tick}</text></g>)}
          <line x1="65" y1="355" x2="675" y2="355" stroke={C.muted} /><line x1="65" y1="55" x2="65" y2="355" stroke={C.muted} />
          {series.map((item, si) => <g key={item.label}>
            <polyline fill="none" stroke={item.color} strokeWidth="4" strokeLinejoin="round" points={points.map((point) => `${x(point.selectivityPct)},${y(point[item.key])}`).join(' ')} opacity={interpolate(frame, [si * 14, si * 14 + 30], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })} />
            {points.map((point, pi) => <circle key={pi} cx={x(point.selectivityPct)} cy={y(point[item.key])} r="5" fill={item.color} opacity={interpolate(frame, [45 + pi * 12, 60 + pi * 12], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })} />)}
          </g>)}
          {['90%','50%','23%','5%','1%'].map((label, i) => <text key={label} x={x(points[i].selectivityPct)} y="385" fill={C.muted} fontSize="14" textAnchor="middle">{label}</text>)}
          <text x="370" y="420" fill={C.muted} fontSize="15" textAnchor="middle">Query selectivity · high → low</text>
          <text x="16" y="210" fill={C.muted} fontSize="15" textAnchor="middle" transform="rotate(-90 16 210)">Median time (ms)</text>
        </svg>
        <div style={{ display: 'flex', gap: 18, flexWrap: 'wrap', marginTop: -3 }}>{series.map((s) => <span key={s.label} style={{ color: s.color, fontSize: 16 }}>● {s.label}</span>)}</div>
      </Panel>
      <div style={{ ...S.stack }}>
        <Panel accent={C.blue} title="OBSERVED MEASUREMENTS · MS">
          <ComparisonTable columns={['Threshold', 'Selectivity', 'Linear', 'Heap grouped', 'Clustered grouped']} rows={points.map((point) => [
            point.threshold.toFixed(3), `${point.selectivityPct.toFixed(2)}%`, `${point.linearMs.toFixed(3)}`, `${point.heapGroupedMs.toFixed(3)}`, `${point.clusteredGroupedMs.toFixed(3)}`,
          ])} widths=".9fr 1.1fr 1fr 1.3fr 1.5fr" />
        </Panel>
        <TakeawayCard number="01" title="Lower selectivity favors indexed access" detail="Observed as fewer records qualify." color={C.amber} />
        <TakeawayCard number="02" title="Clustering moves the crossover earlier" detail="In this dataset and benchmark environment." color={C.blue} />
        <div style={{ color: C.muted, fontSize: 18, textAlign: 'center' }}>Observed on this dataset and benchmark environment.</div>
      </div>
    </div>
  </SceneFrame>;
};

export const DeletionScene = () => {
  const frame = useCurrentFrame();
  const deleted = frame >= 90;
  return <SceneFrame section="Task 3 / Deletion" title="Delete index entries and tombstone heap records" accent={C.red}>
  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 34, height: '100%' }}>
    <Panel accent={C.purple} title="B+ TREE · REMOVE EXACT (KEY, RECORDID) PAIRS">
      <div style={{ textAlign: 'center', color: C.amber, fontSize: 25, ...S.mono, margin: '18px 0' }}>FG_PCT_home &gt; 0.5</div>
      <div style={{ display: 'flex', justifyContent: 'center' }}><BPlusLeaf entries={deleted ? ['0.524','0.556'] : ['0.511','0.524','0.556']} active /></div>
      <div style={{ textAlign: 'center', color: C.purple, fontSize: 24, margin: 20 }}>remove(key, RecordId)</div>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 25, alignItems: 'center' }}><Panel accent={C.purple} style={{ textAlign: 'center', width: 240 }}>underflow</Panel><Arrow color={C.purple} /><Pill color={C.purple}>borrow</Pill><span style={{ color: C.muted, fontSize: 18 }}>or</span><Pill color={C.purple}>merge</Pill></div>
    </Panel>
    <Panel accent={C.red} title="HEAP STORAGE · MARK DELETED">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 30, marginTop: 50 }}><RecordSlot label={`is_deleted: ${deleted ? 1 : 0}`} detail="tombstone byte" color={C.red} active={deleted} /><div style={{ color: C.red, fontSize: 40 }}>0 → 1</div><RecordSlot label="record slot" detail="remains in place" color={C.grey} /></div>
      <div style={{ marginTop: 55, display: 'flex', flexDirection: 'column', gap: 16 }}><TakeawayCard number="01" title="Storage deletion is logical" detail="The record is marked, not compacted." color={C.red} /><TakeawayCard number="02" title="RecordIds remain stable" detail="Physical slot addresses do not shift." color={C.amber} /></div>
      <div style={{ textAlign: 'center', color: C.muted, fontSize: 19, marginTop: 24 }}>No physical compaction is shown.</div>
    </Panel>
  </div>
</SceneFrame>;
};

export const AfterDeletionScene = () => {
  const frame = useCurrentFrame();
  const removal = interpolate(frame, [70, 220], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const leafGrid = { display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 5, margin: '18px auto', maxWidth: 660 } as const;
  return <SceneFrame section="Task 3 / Validation" title="The tree remains balanced after deletion" accent={C.green}>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 30, height: '100%' }}>
      <Panel accent={C.purple} title="BEFORE · 96 LEAVES">
        <div style={leafGrid}>{Array.from({ length: d.bplus.heapLeaves }, (_, i) => <div key={i} style={{ height: 20, border: `1px solid ${C.purple}`, background: `${C.purple}44`, borderRadius: 4 }} />)}</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}><MetricCard label="Active nodes" value={`${d.bplus.heapNodes}`} accent={C.purple} /><MetricCard label="Leaves" value={`${d.bplus.heapLeaves}`} accent={C.purple} /><MetricCard label="Root separators" value={`${d.bplus.heapRootSeparators}`} accent={C.purple} /><MetricCard label="Levels" value={`${d.bplus.heapLevels}`} accent={C.purple} /></div>
      </Panel>
      <Panel accent={C.green} title={`AFTER · ${d.bplus.heapLeaves - d.bplus.afterDeletionLeaves} LEAVES MERGED / REMOVED`}>
        <div style={leafGrid}>{Array.from({ length: d.bplus.heapLeaves }, (_, i) => {
          const removed = i >= d.bplus.afterDeletionLeaves;
          const opacity = removed ? 1 - removal : 1;
          const scale = removed ? 1 - removal : 1;
          return <div key={i} style={{ height: `${20 * scale}px`, opacity, border: `1px solid ${removed ? C.red : C.green}`, background: removed ? `${C.red}66` : `${C.green}55`, borderRadius: 4 }} />;
        })}</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}><MetricCard label="Active nodes" value={`${d.bplus.afterDeletionNodes}`} accent={C.green} /><MetricCard label="Leaves" value={`${d.bplus.afterDeletionLeaves}`} accent={C.green} /><MetricCard label="Root separators" value={`${d.bplus.afterDeletionRootSeparators}`} accent={C.green} /><MetricCard label="Levels" value={`${d.bplus.afterDeletionLevels}`} accent={C.green} /></div>
      </Panel>
      <div style={{ gridColumn: '1 / span 2', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 20, alignItems: 'center' }}>
        <MetricCard label="Records deleted" value={d.task3.matches.toLocaleString('en-US')} accent={C.red} />
        <Panel accent={C.green} style={{ textAlign: 'center' }}><div style={{ color: C.green, fontSize: 28, fontWeight: 700 }}>B+ tree validation: PASSED</div><div style={{ color: C.muted, fontSize: 19, marginTop: 9 }}>0 remaining records with FG_PCT_home &gt; {d.task3.largestRemainingKey.toFixed(1)}</div></Panel>
        <MetricCard label="Largest remaining key" value={d.task3.largestRemainingKey.toFixed(3)} accent={C.amber} />
      </div>
    </div>
  </SceneFrame>;
};

export const ConclusionScene = () => <SceneFrame section="Project 1 / Conclusion" title="Performance depends on search, retrieval, and layout" accent={C.blue}>
  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.05fr', gap: 34, height: '100%' }}>
    <div style={{ ...S.stack, justifyContent: 'center' }}>
      <Reveal at={0}><TakeawayCard number="01" title="B+ tree" detail="Reduces the logical search space." color={C.purple} /></Reveal>
      <Reveal at={25}><TakeawayCard number="02" title="RID grouping" detail="Removes redundant block read calls." color={C.green} /></Reveal>
      <Reveal at={50}><TakeawayCard number="03" title="Physical clustering" detail="Improves data locality for a range." color={C.blue} /></Reveal>
      <Reveal at={75}><TakeawayCard number="04" title="Selectivity" detail="Shapes when indexed retrieval pays off." color={C.amber} /></Reveal>
    </div>
    <div style={{ ...S.stack, justifyContent: 'center' }}>
      <Reveal at={160}><Panel accent={C.blue} title="THE CENTRAL STORY">
        <div style={{ fontSize: 31, lineHeight: 1.38, fontWeight: 680 }}>Performance depends not only on the index, but also on how matching records are retrieved and physically organized on disk.</div>
      </Panel></Reveal>
      <Reveal at={285}><div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 13 }}>
        <MetricCard label="Read calls" value={`${d.benchmark.naiveReads.toLocaleString('en-US')} → ${d.benchmark.groupedReads}`} note="naïve → grouped" accent={C.green} />
        <MetricCard label="Unique blocks" value={`${d.benchmark.heapUniqueBlocks} → ${d.benchmark.clusteredUniqueBlocks}`} note="heap → clustered data" accent={C.blue} />
        <MetricCard label="Median time" value={`${d.benchmark.naiveMedianMs.toFixed(3)} → ${d.benchmark.clusteredMedianMs.toFixed(3)} ms`} note="naïve → clustered experiment" accent={C.amber} />
      </div></Reveal>
      <Reveal at={390}><div style={{ color: C.muted, fontSize: 17, textAlign: 'center' }}>The {d.benchmark.clusteredMedianMs.toFixed(3)} ms result is an additional FG_PCT_home-clustered storage experiment.</div></Reveal>
      <Reveal at={510}><div style={{ textAlign: 'center', borderTop: `1px solid ${C.line}`, paddingTop: 20, fontSize: 30, fontWeight: 700, letterSpacing: 1 }}>SC3020 PROJECT 1 <span style={{ color: C.dim }}>·</span> <span style={{ color: C.blue }}>DISK-BASED STORAGE &amp; B+ TREE</span></div></Reveal>
    </div>
  </div>
</SceneFrame>;

export const sceneComponents = {
  ProjectTitle: ProjectTitleScene,
  Architecture: ArchitectureScene,
  RecordLayout: RecordLayoutScene,
  DataBlocks: DataBlocksScene,
  BPlusTree: BPlusTreeScene,
  DuplicateKeys: DuplicateKeysScene,
  QueryTraversal: QueryTraversalScene,
  NaiveRetrieval: NaiveRetrievalScene,
  GroupedRetrieval: GroupedRetrievalScene,
  Locality: LocalityScene,
  HeapVsClustered: HeapVsClusteredScene,
  Benchmark: BenchmarkScene,
  Selectivity: SelectivityScene,
  Deletion: DeletionScene,
  AfterDeletion: AfterDeletionScene,
  Conclusion: ConclusionScene,
} as const;
