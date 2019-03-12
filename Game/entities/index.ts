import { Entity, Component } from 'wild-magic';
import {
  renderableComponent,
  renderDebugComponent,
  POSITION,
  phyisicsComponent,
  tileComponent,
  positionComponent,
} from '../components';
import { EntitiesState } from 'wild-magic/lib/Engine/types';
import { getRandomFloat } from '../../lib/utils';
import { RenderTypes } from '../systems/render/types/renderType';
import { Vector2 } from 'three';

export const makeMoon = () =>
  new Entity({
    name: 'Moon',
    components: [
      renderableComponent({
        mesh: RenderTypes.MOON,
      }),
    ],
  });

export const makeTile = (
  name,
  type = 'floor',
  position: { x: number; y: number; z: number }
) =>
  new Entity({
    name: name || 'tile',
    components: [
      renderableComponent({
        mesh: RenderTypes.TILE,
        position: positionComponent(position),
      }),
      tileComponent({
        type,
      }),
    ],
  });

export const makeBox = () =>
  new Entity({
    name: 'another mrBox 🦄',
    components: [
      renderableComponent({
        mesh: RenderTypes.CUBE,
        position: new Component(POSITION, {
          x: getRandomFloat(-10, 10),
          y: getRandomFloat(5, 20),
          z: getRandomFloat(-10, 10),
        }),
      }),
      phyisicsComponent(),
    ],
  });

export const littleBox = new Entity({
  name: 'mr. Box 🦄',
  components: [
    renderableComponent(),
    renderDebugComponent(),
    phyisicsComponent(),
  ],
});

export default [].reduce((memo: EntitiesState, entity) => {
  memo[entity.uuid] = JSON.parse(JSON.stringify(entity));
  return memo;
}, {});
