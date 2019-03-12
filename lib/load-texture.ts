import * as THREE from 'three';

const loader = new THREE.TextureLoader();

const loadTextureAsync = (url: string): Promise<THREE.Texture> =>
  new Promise((resolve, reject) => {
    loader.load(url, resolve, undefined, reject);
  });

export default loadTextureAsync;
