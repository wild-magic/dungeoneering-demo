import { Component } from 'wild-magic';

interface XYZ {
  x: number;
  y: number;
  z: number;
}

export const POSITION = 'POSITION';

export const positionComponent = new Component<XYZ>(POSITION, {
  x: 0,
  y: 0,
  z: 0,
});

export const ROTATION = 'ROTATION';

export const rotationComponent = new Component(ROTATION, {
  x: 0,
  y: 0,
  z: 0,
});

export const RENDER_MESH = 'RENDER_MESH';

export const renderableComponent = new Component(RENDER_MESH, {
  mesh: 'Cube',
  material: 'Default',
  position: positionComponent,
  rotation: rotationComponent,
});

export const RENDER_DEBUG = 'RENDER_DEBUG';

export const renderDebugComponent = new Component(RENDER_DEBUG, {});

export const HAS_PHYSICS = 'HAS_PHYSICS';

export const phyisicsComponent = new Component(HAS_PHYSICS, {});
