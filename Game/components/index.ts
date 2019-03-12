import { Component } from 'wild-magic';
import { createComponent } from 'wild-magic/lib/Component';
import { RenderTypes } from '../systems/render/types/renderType';

interface XYZ {
  x: number;
  y: number;
  z: number;
}

export const ROOM = 'ROOM';

export const TILE = 'TILE';
export const DECAL = 'DECAL';

export const roomComponent = createComponent<any>(ROOM, {});
export const tileComponent = createComponent<any>(TILE, {});
export const decalComponent = createComponent<any>(DECAL, {});
export const TEXT = 'TEXT';
export const textComponent = createComponent<{ text: string }>(TEXT, {
  text: 'Hello world!',
});

export const POSITION = 'POSITION';
export const positionComponent = createComponent<{
  x: number;
  y: number;
  z: number;
}>(POSITION, {
  x: 0,
  y: 0,
  z: 0,
});

export const ROTATION = 'ROTATION';
export const rotationComponent = createComponent<{
  x: number;
  y: number;
  z: number;
}>(ROTATION, {
  x: 0,
  y: 0,
  z: 0,
});

export const RENDERABLE = 'RENDERABLE';
export const renderableComponent = createComponent(RENDERABLE, {
  mesh: RenderTypes.CUBE,
  material: 'Default',
  position: positionComponent(),
  rotation: rotationComponent(),
});

export const RENDER_DEBUG = 'RENDER_DEBUG';

export const renderDebugComponent = createComponent(RENDER_DEBUG, {});

export const HAS_PHYSICS = 'HAS_PHYSICS';

export const phyisicsComponent = createComponent(HAS_PHYSICS, {});
