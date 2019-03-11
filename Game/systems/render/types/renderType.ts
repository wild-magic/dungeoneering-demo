import * as THREE from 'three';
import cube from './cube';
import moon from './moon';
import tile from './tile';
import debug from './debug';
import room from './room';
import { EntityState } from 'wild-magic/lib/Entity/types';
import text from './text';

export enum RenderTypes {
  MOON = 'MOON',
  CUBE = 'CUBE',
  TILE = 'TILE',
  DEBUG = 'DEBUG',
  ROOM = 'ROOM',
  TEXT = 'TEXT',
}

export default (
  renderType: RenderTypes,
  entity: EntityState
): THREE.Object3D => {
  switch (renderType) {
    case RenderTypes.MOON:
      return moon(entity);
    case RenderTypes.TEXT:
      return text(entity);
    case RenderTypes.DEBUG:
      return debug(entity);
    case RenderTypes.ROOM:
      return room(entity);
    case RenderTypes.TILE:
      return tile(entity);
    case RenderTypes.CUBE:
    default:
      return cube(entity);
  }
};
