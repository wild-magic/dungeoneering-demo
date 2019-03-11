import * as THREE from 'three';
import { EntityState } from 'wild-magic/lib/Entity/types';
import { ROOM } from '../../../components';

export default (entity: EntityState): THREE.Object3D => {
  const roomData = entity.components.filter(
    (component: any) => component.name === ROOM
  )[0].data;
  const { room_size: size } = roomData;
  const geometry = new THREE.BoxGeometry(size[0], 1, size[1]);
  geometry.translate(size[0] / 2, 0, size[1] / 2);
  const material = new THREE.MeshBasicMaterial({
    transparent: true,
    opacity: 0.5,
    wireframe: false, // set to false for solid block
    color: Math.random() * 0xffffff,
  });
  const object = new THREE.Mesh(geometry, material);
  const objectContainer = new THREE.Object3D();

  objectContainer.add(object);
  return objectContainer;
};
