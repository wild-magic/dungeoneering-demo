import * as THREE from 'three';
import { EntityState } from 'wild-magic/lib/Entity/types';

// save memory by creating these before...
const geometry = new THREE.IcosahedronGeometry(10, 2);
const material = new THREE.MeshPhongMaterial({
  color: new THREE.Color('rgb(226,35,213)'),
  emissive: new THREE.Color('rgb(255,128,64)'),
  specular: new THREE.Color('rgb(255,155,255)'),
  shininess: 10,
  flatShading: true,
  opacity: 1,
});

export default (entity: EntityState): THREE.Object3D => {
  const object = new THREE.Mesh(geometry, material);
  const objectContainer = new THREE.Object3D();

  objectContainer.add(object);
  return objectContainer;
};
