import * as THREE from 'three';
import cube from './cube';
import moon from './moon';
import tile from './tile';
import debug from './debug';
import room from './room';
import { EntityState } from 'wild-magic/lib/Entity/types';
import text from './text';
import light from './light';
import decal from './decal';

export enum RenderTypes {
  MOON = 'MOON',
  CUBE = 'CUBE',
  TILE = 'TILE',
  DEBUG = 'DEBUG',
  ROOM = 'ROOM',
  TEXT = 'TEXT',
  DECAL = 'DECAL',
  LIGHT = 'LIGHT',
}

export default async (
  renderType: RenderTypes,
  entity: EntityState
): Promise<THREE.Object3D> => {
  try {
    switch (renderType) {
      case RenderTypes.MOON:
        return moon(entity);
      case RenderTypes.TEXT:
        return text(entity);
      case RenderTypes.DEBUG:
        return debug(entity);
      case RenderTypes.ROOM:
        return room(entity);
      case RenderTypes.DECAL:
        return decal(entity);
      case RenderTypes.TILE:
        return tile(entity);
      case RenderTypes.LIGHT:
        return light(entity);
      case RenderTypes.CUBE:
      default:
        return cube(entity);
    }
  } catch (error) {
    console.error(error);
    return cube(entity);
  }
};
