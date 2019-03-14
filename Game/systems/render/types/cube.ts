import * as THREE from 'three';
import { EntityState } from 'wild-magic/lib/Entity/types';

// save memory by creating these before...
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff6666 });

export default (entity: EntityState): THREE.Object3D => {
  const object = new THREE.Mesh(geometry, material);
  const objectContainer = new THREE.Object3D();

  const light = new THREE.PointLight(0xff0000, 1, 20);
  light.position.set(0, 1, 0);
  light.castShadow = true;
  objectContainer.add(object);
  objectContainer.add(light);
  return objectContainer;
};
