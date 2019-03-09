import { Entity, Component } from 'wild-magic';
import {
  renderableComponent,
  renderDebugComponent,
  RENDER_MESH,
  rotationComponent,
  POSITION,
  phyisicsComponent,
} from '../components';
import { EntitiesState } from 'wild-magic/lib/Engine/types';

export const littleBox = new Entity({
  name: 'mr. Box 🦄',
  components: [renderableComponent, renderDebugComponent, phyisicsComponent],
});

export const weeBox = new Entity({
  name: 'mr. Box 2🦄',
  components: [
    new Component(RENDER_MESH, {
      mesh: 'Cube',
      material: 'Default',
      position: new Component(POSITION, {
        x: 5,
        y: 5,
        z: 5,
      }),
      rotation: rotationComponent,
    }),
    phyisicsComponent,
  ],
});

export default [littleBox, weeBox].reduce((memo: EntitiesState, entity) => {
  memo[entity.uuid] = JSON.parse(JSON.stringify(entity));
  return memo;
}, {});
