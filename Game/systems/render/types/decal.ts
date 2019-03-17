import * as THREE from 'three';
import { EntityState } from 'wild-magic/lib/Entity/types';
import skull from '../../../assets/skull.png';
import loadTextureAsync from '../../../../lib/load-texture';
import { DECAL } from '../../../components';

let material;

const geometry = new THREE.PlaneBufferGeometry(1, 1);

export default async (entity: EntityState): Promise<THREE.Object3D> => {
  const decalData = entity.components.find(
    (component: any) => component.name === DECAL
  );

  if (!material) {
    const texture = await loadTextureAsync(skull);
    texture.magFilter = THREE.NearestFilter;
    material = new THREE.MeshBasicMaterial({
      // color: 0xffff00,
      // roughness: 0.8,
      // reflectivity: 0.1,
      map: texture,
      transparent: true,
      side: THREE.DoubleSide,
    });
  }
  const plane = new THREE.Mesh(geometry, material);

  const objectContainer = new THREE.Object3D();
  objectContainer.scale.set(0.5, 0.5, 0.5);

  objectContainer.add(plane);
  return objectContainer;
};
