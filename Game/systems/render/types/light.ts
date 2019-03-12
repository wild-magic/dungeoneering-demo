import * as THREE from 'three';
import { EntityState } from 'wild-magic/lib/Entity/types';

// save memory by creating these before...
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xffc107 });

export default (entity: EntityState): THREE.Object3D => {
  const object = new THREE.Mesh(geometry, material);
  const objectContainer = new THREE.Object3D();
  const light = new THREE.PointLight(0xffc107, 0.8, 10);
  object.scale.set(0.2, 0.5, 0.2);
  light.position.set(0, 1, 0);
  objectContainer.add(object);
  objectContainer.add(light);
  return objectContainer;
};
