import React, { CSSProperties, ReactNode } from 'react';
import { interpolate, useCurrentFrame } from 'remotion';

export const C = {
  bg: '#0b1018', panel: '#111a26', panel2: '#172333', line: '#29394d', text: '#eff4fb', muted: '#a1b0c1', dim: '#748399',
  blue: '#5aa9ff', blueSoft: '#1b4670', purple: '#b58cff', purpleSoft: '#38275e', amber: '#ffc45c', amberSoft: '#5e4720',
  green: '#5bd6a4', greenSoft: '#1e4d40', red: '#ff7777', redSoft: '#5c2e35', grey: '#acb7c4',
};

export const S: Record<string, CSSProperties> = {
  row: { display: 'flex', alignItems: 'center', gap: 22 },
  stack: { display: 'flex', flexDirection: 'column', gap: 18 },
  panel: { background: 'linear-gradient(145deg, rgba(20,31,46,.98), rgba(15,24,36,.98))', border: `1px solid ${C.line}`, borderRadius: 18, padding: '26px 30px', boxShadow: '0 16px 44px rgba(0,0,0,.2)' },
  label: { color: C.muted, fontSize: 22, fontWeight: 600, letterSpacing: 1.5, textTransform: 'uppercase' },
  mono: { fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace' },
};

export const SceneFrame = ({ title, section, children, accent = C.blue, footer }: { title: string; section: string; children: ReactNode; accent?: string; footer?: ReactNode }) => {
  const frame = useCurrentFrame();
  const progress = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: 'clamp' });
  return <div style={{ width: 1920, height: 1080, color: C.text, background: `radial-gradient(ellipse at 85% 10%, ${accent}12, transparent 30%), radial-gradient(ellipse at 10% 95%, ${C.blue}0b, transparent 34%), ${C.bg}`, fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Arial, sans-serif', position: 'relative', overflow: 'hidden', padding: '70px 100px', boxSizing: 'border-box' }}>
    <div style={{ position: 'absolute', inset: 0, opacity: .13, backgroundImage: 'linear-gradient(rgba(255,255,255,.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.04) 1px, transparent 1px)', backgroundSize: '64px 64px', maskImage: 'linear-gradient(to bottom, black, transparent 90%)' }} />
    <div style={{ position: 'absolute', top: 0, left: 100, height: 5, width: 1720, background: C.line }}><div style={{ width: `${progress * 100}%`, height: '100%', background: accent }} /></div>
    <div style={{ position: 'relative', zIndex: 1, height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 15, marginBottom: 36 }}>
        <div style={{ width: 10, height: 10, borderRadius: 3, background: accent, boxShadow: `0 0 18px ${accent}88` }} />
        <div style={{ ...S.label, color: accent, fontSize: 18 }}>{section}</div>
        <div style={{ height: 1, flex: 1, background: `linear-gradient(90deg, ${C.line}, transparent)` }} />
        <div style={{ ...S.mono, color: C.dim, fontSize: 17 }}>SC3020 / PROJECT 1</div>
      </div>
      <div style={{ fontSize: 49, fontWeight: 680, letterSpacing: -1.6, lineHeight: 1.12, marginBottom: 34 }}>{title}</div>
      <div style={{ flex: 1, minHeight: 0 }}>{children}</div>
      {footer && <div style={{ paddingTop: 18, fontSize: 20, color: C.muted }}>{footer}</div>}
    </div>
  </div>;
};

export const Reveal = ({ at = 0, children, distance = 18, duration = 18, style }: { at?: number; children: ReactNode; distance?: number; duration?: number; style?: CSSProperties }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [at, at + duration], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const y = interpolate(frame, [at, at + duration], [distance, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  return <div style={{ opacity, transform: `translateY(${y}px)`, ...style }}>{children}</div>;
};

export const Panel = ({ children, style, accent, title }: { children: ReactNode; style?: CSSProperties; accent?: string; title?: string }) => <div style={{ ...S.panel, borderTop: `2px solid ${accent ?? C.line}`, ...style }}>
  {title && <div style={{ ...S.label, fontSize: 18, marginBottom: 18 }}>{title}</div>}{children}
</div>;

export const Pill = ({ children, color = C.blue }: { children: ReactNode; color?: string }) => <span style={{ display: 'inline-flex', alignItems: 'center', border: `1px solid ${color}66`, background: `${color}16`, color, borderRadius: 999, padding: '9px 16px', fontSize: 20, fontWeight: 650, whiteSpace: 'nowrap' }}>{children}</span>;

export const MetricCard = ({ label, value, note, accent = C.blue, style }: { label: string; value: ReactNode; note?: ReactNode; accent?: string; style?: CSSProperties }) => <div style={{ ...S.panel, borderTop: `3px solid ${accent}`, padding: '24px 26px', flex: 1, ...style }}>
  <div style={{ color: C.muted, fontSize: 19, letterSpacing: 1.2, textTransform: 'uppercase', fontWeight: 650 }}>{label}</div>
  <div style={{ color: accent, fontSize: 40, fontWeight: 720, letterSpacing: -1, marginTop: 8 }}>{value}</div>
  {note && <div style={{ color: C.muted, fontSize: 20, marginTop: 5 }}>{note}</div>}
</div>;

export const DataBlock = ({ label = 'DATA BLOCK', slots = 8, active = [1, 4, 6], highlight = [], width = 450, style }: { label?: string; slots?: number; active?: number[]; highlight?: number[]; width?: number; style?: CSSProperties }) => <div style={{ ...S.panel, padding: 20, width, boxSizing: 'border-box', ...style }}>
  <div style={{ ...S.label, fontSize: 16, marginBottom: 12 }}>{label}</div>
  <div style={{ display: 'grid', gridTemplateColumns: `repeat(${Math.min(slots, 8)}, 1fr)`, gap: 7 }}>
    {Array.from({ length: slots }, (_, i) => <Reveal key={i} at={i * 3} distance={7} duration={12}><div style={{ height: 36, borderRadius: 6, background: highlight.includes(i) ? C.amber : active.includes(i) ? C.blueSoft : '#202b39', border: `1px solid ${highlight.includes(i) ? C.amber : active.includes(i) ? C.blue : C.line}`, color: highlight.includes(i) ? C.bg : C.muted, display: 'grid', placeItems: 'center', fontSize: 14, fontFamily: S.mono.fontFamily }}>{i}</div></Reveal>)}
  </div>
</div>;

export const RecordSlot = ({ label, detail, color = C.blue, active = false, width }: { label: string; detail?: string; color?: string; active?: boolean; width?: number }) => <div style={{ minWidth: width ?? 125, background: active ? `${color}1c` : C.panel2, border: `1px solid ${active ? color : C.line}`, borderRadius: 9, padding: '12px 14px', boxSizing: 'border-box' }}>
  <div style={{ ...S.mono, fontSize: 18, color: active ? color : C.text, fontWeight: 700 }}>{label}</div>
  {detail && <div style={{ color: C.muted, fontSize: 15, marginTop: 4 }}>{detail}</div>}
</div>;

export const RIDBadge = ({ block, slot, color = C.blue }: { block: number | string; slot: number | string; color?: string }) => <span style={{ ...S.mono, display: 'inline-block', border: `1px solid ${color}77`, background: `${color}16`, color, borderRadius: 8, padding: '7px 10px', fontSize: 20, whiteSpace: 'nowrap' }}>RID ({block},{slot})</span>;

export const BPlusNode = ({ keys, leaf = false, active = false, width = 470 }: { keys: string[]; leaf?: boolean; active?: boolean; width?: number }) => <div style={{ width, border: `2px solid ${active ? C.amber : C.purple}`, borderRadius: 11, overflow: 'hidden', background: C.panel, boxShadow: active ? `0 0 24px ${C.amber}30` : 'none' }}>
  <div style={{ display: 'grid', gridTemplateColumns: `repeat(${keys.length * 2 + 1}, 1fr)` }}>
    {keys.map((key, i) => <React.Fragment key={`${key}-${i}`}><Reveal at={i * 4} distance={5} duration={12}><div style={{ display: 'grid', placeItems: 'center', height: 58, color: active ? C.amber : C.text, fontSize: 22, fontFamily: S.mono.fontFamily, borderRight: `1px solid ${C.line}` }}>{key}</div></Reveal>{i < keys.length - 1 && <div style={{ height: 58, borderRight: `1px solid ${C.purple}77`, background: `${C.purple}16` }} />}</React.Fragment>)}
    <div style={{ height: 58, background: `${C.purple}16` }} />
  </div>
  {leaf && <div style={{ borderTop: `1px solid ${C.line}`, color: C.muted, padding: '8px 14px', fontSize: 16, textAlign: 'right' }}>leaf entries: key → RecordId</div>}
</div>;

export const BPlusLeaf = ({ entries, active = false, label = 'LEAF' }: { entries: string[]; active?: boolean; label?: string }) => <div style={{ border: `2px solid ${active ? C.amber : C.purple}`, borderRadius: 12, background: C.panel, padding: '12px 16px', minWidth: 260, boxShadow: active ? `0 0 24px ${C.amber}28` : 'none' }}>
  <div style={{ ...S.label, color: C.purple, fontSize: 15, marginBottom: 9 }}>{label}</div>
  <div style={{ display: 'flex', gap: 9 }}>{entries.map((e, i) => <Reveal key={`${e}-${i}`} at={i * 4} distance={6} duration={12}><span style={{ ...S.mono, color: active ? C.amber : C.text, background: `${active ? C.amber : C.purple}16`, borderRadius: 6, padding: '8px 10px', fontSize: 18 }}>{e}</span></Reveal>)}</div>
</div>;

export const Arrow = ({ label, color = C.muted, vertical = false }: { label?: string; color?: string; vertical?: boolean }) => <div style={{ display: 'flex', flexDirection: vertical ? 'column' : 'row', alignItems: 'center', justifyContent: 'center', gap: 7, color, minWidth: vertical ? undefined : 66, minHeight: vertical ? 42 : undefined }}>
  {!vertical && <div style={{ height: 2, flex: 1, minWidth: 34, background: color }} />}{label && <span style={{ fontSize: 17, color, whiteSpace: 'nowrap' }}>{label}</span>}{vertical ? <span style={{ fontSize: 28, lineHeight: .7 }}>↓</span> : <span style={{ fontSize: 26, lineHeight: .7 }}>›</span>}
</div>;

export const BenchmarkBar = ({ label, value, max, color, suffix = 'ms', note }: { label: string; value: number; max: number; color: string; suffix?: string; note?: string }) => {
  const frame = useCurrentFrame();
  const growth = interpolate(frame, [8, 38], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  return <div style={{ display: 'grid', gridTemplateColumns: '345px 1fr 155px', alignItems: 'center', gap: 18, margin: '17px 0' }}>
  <div style={{ color: C.text, fontSize: 20 }}>{label}</div>
  <div style={{ height: 27, background: '#202b39', borderRadius: 7, overflow: 'hidden' }}><div style={{ width: `${Math.max(1.2, value / max * 100 * growth)}%`, height: '100%', background: `linear-gradient(90deg, ${color}99, ${color})`, borderRadius: 7 }} /></div>
  <div style={{ ...S.mono, color, fontSize: 20, textAlign: 'right' }}>{value} {suffix}{note ? ` · ${note}` : ''}</div>
  </div>;
};

export const ComparisonTable = ({ columns, rows, widths }: { columns: string[]; rows: ReactNode[][]; widths?: string }) => <div style={{ display: 'grid', gridTemplateColumns: widths ?? `repeat(${columns.length}, 1fr)`, border: `1px solid ${C.line}`, borderRadius: 12, overflow: 'hidden' }}>
  {columns.map((column, index) => <div key={column} style={{ background: C.panel2, padding: '14px 16px', borderBottom: `1px solid ${C.line}`, borderRight: index < columns.length - 1 ? `1px solid ${C.line}` : undefined, color: C.muted, fontSize: 17, fontWeight: 700 }}>{column}</div>)}
  {rows.flatMap((row, ri) => row.map((cell, ci) => <div key={`${ri}-${ci}`} style={{ padding: '14px 16px', background: ri % 2 ? '#0e1722' : '#111a26', borderRight: ci < columns.length - 1 ? `1px solid ${C.line}` : undefined, borderBottom: ri < rows.length - 1 ? `1px solid ${C.line}` : undefined, color: C.text, fontSize: 19 }}>{cell}</div>))}
</div>;

export const CodeFunctionLabel = ({ children, color = C.purple }: { children: ReactNode; color?: string }) => <span style={{ ...S.mono, display: 'inline-block', color, background: `${color}18`, border: `1px solid ${color}55`, borderRadius: 8, padding: '9px 13px', fontSize: 22 }}>{children}</span>;

export const TakeawayCard = ({ number, title, detail, color = C.blue }: { number: string; title: string; detail: string; color?: string }) => <div style={{ ...S.panel, display: 'flex', alignItems: 'center', gap: 24, padding: '19px 23px', borderLeft: `4px solid ${color}` }}>
  <div style={{ ...S.mono, color, fontSize: 20, fontWeight: 700 }}>{number}</div>
  <div><div style={{ fontSize: 23, fontWeight: 700 }}>{title}</div><div style={{ color: C.muted, fontSize: 18, marginTop: 4 }}>{detail}</div></div>
</div>;

export const EditMarker = ({ number, insert }: { number: number; insert: string }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 7, 23, 29], [0, 1, 1, .9], { extrapolateRight: 'clamp' });
  return <div style={{ width: 1920, height: 1080, boxSizing: 'border-box', padding: 120, display: 'grid', placeItems: 'center', background: '#070b10', color: C.text, fontFamily: 'Inter, system-ui, sans-serif', opacity }}>
    <div style={{ width: 1280, border: `2px solid ${C.amber}`, background: 'linear-gradient(145deg,#151d28,#0c121b)', padding: '62px 74px', position: 'relative', boxShadow: `0 0 70px ${C.amber}1c` }}>
      <div style={{ position: 'absolute', inset: 0, background: 'repeating-linear-gradient(135deg,transparent 0 28px,#ffc45c08 28px 56px)', pointerEvents: 'none' }} />
      <div style={{ position: 'relative', zIndex: 1, color: C.amber, fontSize: 24, letterSpacing: 5, fontWeight: 800, marginBottom: 28 }}>EDIT POINT {String(number).padStart(2, '0')}</div>
      <div style={{ position: 'relative', zIndex: 1, color: C.muted, fontSize: 20, letterSpacing: 3, marginBottom: 14 }}>INSERT REAL FOOTAGE</div>
      <div style={{ position: 'relative', zIndex: 1, fontSize: 40, lineHeight: 1.3, fontWeight: 650 }}>{insert}</div>
      <div style={{ position: 'relative', zIndex: 1, height: 4, width: `${Math.min(100, frame / 30 * 100)}%`, background: C.amber, marginTop: 38 }} />
    </div>
  </div>;
};

export const TitleCard = ({ children }: { children: ReactNode }) => <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>{children}</div>;

export const SectionTitle = ({ eyebrow, title, color = C.blue }: { eyebrow: string; title: string; color?: string }) => <div style={{ marginBottom: 24 }}><div style={{ ...S.label, color, fontSize: 17 }}>{eyebrow}</div><div style={{ fontSize: 30, fontWeight: 700, marginTop: 5 }}>{title}</div></div>;

export const ArchitectureDiagram = ({ nodes }: { nodes: { title: string; detail: string; color: string }[] }) => <div style={{ display: 'flex', alignItems: 'stretch', gap: 12 }}>{nodes.map((node, i) => <React.Fragment key={node.title}><Reveal at={i * 7} style={{ flex: 1 }}><div style={{ ...S.panel, minWidth: 0, borderTop: `3px solid ${node.color}`, textAlign: 'center', display: 'flex', justifyContent: 'center', flexDirection: 'column', padding: '20px 14px', height: '100%', boxSizing: 'border-box' }}><div style={{ color: node.color, fontSize: 20, fontWeight: 750 }}>{node.title}</div><div style={{ color: C.muted, fontSize: 16, marginTop: 7 }}>{node.detail}</div></div></Reveal>{i < nodes.length - 1 && <Arrow color={C.dim} />}</React.Fragment>)}</div>;

export const RecordLayout = ({ fields, highlight }: { fields: readonly { offset: number; field: string; type: string; bytes: number }[]; highlight?: string }) => <div style={{ border: `1px solid ${C.line}`, borderRadius: 12, overflow: 'hidden' }}>
  <div style={{ display: 'grid', gridTemplateColumns: '100px 1fr 180px 120px', padding: '13px 18px', background: C.panel2, color: C.muted, fontSize: 16, fontWeight: 700 }}><span>OFFSET</span><span>FIELD</span><span>TYPE</span><span>BYTES</span></div>
  {fields.map((field, index) => { const selected = field.field === highlight; const tombstone = field.field === 'is_deleted'; const color = tombstone ? C.red : selected ? C.amber : C.text; return <Reveal key={field.field} at={index * 5}><div style={{ display: 'grid', gridTemplateColumns: '100px 1fr 180px 120px', padding: '10px 18px', background: selected ? `${C.amber}12` : tombstone ? `${C.red}0d` : '#101925', color, borderTop: `1px solid ${C.line}`, fontSize: 18, fontFamily: S.mono.fontFamily }}><span>{field.offset}</span><span>{field.field}</span><span>{field.type}</span><span>{field.bytes} B</span></div></Reveal>; })}
</div>;

export const smallText = { color: C.muted, fontSize: 20, lineHeight: 1.4 } as const;
