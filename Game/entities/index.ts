import { Entity, Component } from 'wild-magic';
import {
  renderableComponent,
  renderDebugComponent,
  RENDER_MESH,
  rotationComponent,
  POSITION,
  phyisicsComponent,
  positionComponent,
} from '../components';
import { EntitiesState } from 'wild-magic/lib/Engine/types';
import { getRandomFloat } from '../../lib/utils';

export const makeMoon = () =>
  new Entity({
    name: 'Moon',
    components: [
      new Component(RENDER_MESH, {
        mesh: 'Moon',
        material: 'Default',
        position: positionComponent,
        rotation: rotationComponent,
      }),
    ],
  });

export const makeBox = () =>
  new Entity({
    name: 'another mrBox 🦄',
    components: [
      new Component(RENDER_MESH, {
        mesh: 'Cube',
        material: 'Default',
        position: new Component(POSITION, {
          x: getRandomFloat(-10, 10),
          y: getRandomFloat(5, 20),
          z: getRandomFloat(-10, 10),
        }),
        rotation: rotationComponent,
      }),
      phyisicsComponent,
    ],
  });

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

export default [makeMoon()].reduce((memo: EntitiesState, entity) => {
  memo[entity.uuid] = JSON.parse(JSON.stringify(entity));
  return memo;
}, {});
