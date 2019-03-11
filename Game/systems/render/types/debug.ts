import * as THREE from 'three';
import { EntityState } from 'wild-magic/lib/Entity/types';
import { Object3D } from 'three';

export default (entity: EntityState): THREE.Object3D => {
  const axesHelper = new THREE.AxesHelper(5);
  const objectContainer = new Object3D();
  objectContainer.add(axesHelper);
  return objectContainer;
};
