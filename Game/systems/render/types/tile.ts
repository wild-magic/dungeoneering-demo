import * as THREE from 'three';
import { EntityState } from 'wild-magic/lib/Entity/types';
import wall from '../../../assets/wall.png';
import floor from '../../../assets/floor.png';
import { degToRad } from '../../../../lib/utils';
import { TILE } from '../../../components';
import loadTextureAsync from '../../../../lib/load-texture';

const wallGeometry = new THREE.BoxBufferGeometry(1, 1);
wallGeometry.translate(1 / 2, 1 / 2, 1 / 2);
const floorGeometry = new THREE.PlaneBufferGeometry(1, 1);
floorGeometry.translate(1 / 2, 1 / 2, 0);

let material = {
  wall: null,
  floor: null,
};
export default async (entity: EntityState): Promise<THREE.Object3D> => {
  const tileset = {
    wall,
    floor,
  };

  const tileData = entity.components.find(
    (component: any) => component.name === TILE
  );

  const type = (tileData && tileData.data && tileData.data.type) || 'floor';

  if (!material[type]) {
    const texture = await loadTextureAsync(tileset[type]);
    texture.magFilter = THREE.NearestFilter;
    material[type] = new THREE.MeshPhongMaterial({
      // color: 0xffff00,
      // roughness: 0.8,
      reflectivity: 0.1,
      map: texture,
      side: THREE.DoubleSide,
    });
  }

  let mesh;
  if (type === 'wall') {
    mesh = new THREE.Mesh(wallGeometry, material[type]);
  } else {
    mesh = new THREE.Mesh(floorGeometry, material[type]);
    mesh.rotation.set(degToRad(90), 0, 0);
  }

  mesh.receiveShadow = true;

  const objectContainer = new THREE.Object3D();

  objectContainer.add(mesh);
  return objectContainer;
};
