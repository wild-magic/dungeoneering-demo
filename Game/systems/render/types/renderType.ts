import * as THREE from 'three';
import cube from './cube';
import moon from './moon';

export enum RenderTypes {
  MOON = 'MOON',
  CUBE = 'CUBE',
}

export default (renderType: RenderTypes): THREE.Object3D => {
  switch (renderType) {
    case RenderTypes.MOON:
      return moon();
    case RenderTypes.CUBE:
    default:
      return cube();
  }
};
