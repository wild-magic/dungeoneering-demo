import * as THREE from 'three';
import { EntityState } from 'wild-magic/lib/Entity/types';
import wall from '../../../assets/wall.png';
import floor from '../../../assets/floor.png';
import { degToRad } from '../../../../lib/utils';
import { TILE } from '../../../components';
import loadTextureAsync from '../../../../lib/load-texture';

export default async (entity: EntityState): Promise<THREE.Object3D> => {
  const tileset = {
    wall,
    floor,
  };

  const tileData = entity.components.find(
    (component: any) => component.name === TILE
  );

  const type = (tileData && tileData.data && tileData.data.type) || 'floor';

  const texture = await loadTextureAsync(tileset[type]);
  texture.magFilter = THREE.NearestFilter;
  const geometry = new THREE.PlaneBufferGeometry(1, 1);
  geometry.translate(1 / 2, 1 / 2, 0);
  const material = new THREE.MeshPhysicalMaterial({
    // color: 0xffff00,
    roughness: 0.8,
    reflectivity: 0.1,
    map: texture,
    side: THREE.DoubleSide,
  });
  const plane = new THREE.Mesh(geometry, material);
  plane.rotation.set(degToRad(90), 0, 0);
  const objectContainer = new THREE.Object3D();

  objectContainer.add(plane);
  return objectContainer;
};
