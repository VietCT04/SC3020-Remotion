import React from 'react';
import { Composition, Sequence } from 'remotion';
import { sceneComponents } from './scenes/Scenes';
import { EditMarker } from './components/Visuals';
import { EDIT_MARKER_SECONDS, editPoints, FPS, HEIGHT, masterDurationSeconds, scenes, WIDTH } from './data/timeline';

export const MasterVideo: React.FC = () => {
  let cursor = 0;
  return <>
    {scenes.map((scene) => {
      const Component = sceneComponents[scene.id];
      const start = cursor;
      cursor += scene.durationSeconds * FPS;
      const editPointIndex = editPoints.findIndex((point) => point.after === scene.id);
      const editPoint = editPoints[editPointIndex];
      const section = <Sequence key={scene.id} from={start} durationInFrames={scene.durationSeconds * FPS} name={scene.title}><Component /></Sequence>;
      if (!editPoint) return section;
      const marker = <Sequence key={`edit-${editPointIndex}`} from={cursor} durationInFrames={EDIT_MARKER_SECONDS * FPS} name={`Edit Point ${String(editPointIndex + 1).padStart(2, '0')}`}><EditMarker number={editPointIndex + 1} insert={editPoint.insert} /></Sequence>;
      cursor += EDIT_MARKER_SECONDS * FPS;
      return <React.Fragment key={`${scene.id}-with-edit`}>{section}{marker}</React.Fragment>;
    })}
  </>;
};

export const RemotionRoot: React.FC = () => <>
  <Composition id="Master" component={MasterVideo} durationInFrames={masterDurationSeconds * FPS} fps={FPS} width={WIDTH} height={HEIGHT} />
  {scenes.map((scene) => {
    const Component = sceneComponents[scene.id];
    return <Composition key={scene.id} id={scene.id} component={Component} durationInFrames={scene.durationSeconds * FPS} fps={FPS} width={WIDTH} height={HEIGHT} />;
  })}
  {([
    { id: 'StorageLayout', sceneId: 'DataBlocks' },
    { id: 'NaiveVsGrouped', sceneId: 'GroupedRetrieval' },
  ] as const).map(({ id, sceneId }) => {
    const scene = scenes.find((candidate) => candidate.id === sceneId)!;
    const Component = sceneComponents[sceneId];
    return <Composition key={id} id={id} component={Component} durationInFrames={scene.durationSeconds * FPS} fps={FPS} width={WIDTH} height={HEIGHT} />;
  })}
</>;
