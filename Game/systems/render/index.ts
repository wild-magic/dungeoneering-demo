import { System, Component } from 'wild-magic';
import World from './World';
import { RENDER_MESH, RENDER_DEBUG } from '../../components';
import * as THREE from 'three';

const renderSystem = (canvas: HTMLCanvasElement) =>
  new System<{ world: World }>({
    name: 'renderSystem',
    componentTypes: [RENDER_MESH, RENDER_DEBUG],
    onInit: () => {
      console.log('hello world');
      return {
        world: new World(canvas),
      };
    },
    // should it show only the components concerned, or the entire entity?
    onEntityAdded: (entity: any, { world }: any) => {
      const renderMeshData = entity.components.filter(
        (component: any) => component.name === RENDER_MESH
      )[0];

      const makeMesh = renderMeshData => {
        let geometry;
        let material;
        switch (renderMeshData.data.mesh) {
          case 'Moon':
            // material = new THREE.MeshPhongMaterial({
            //   color: new THREE.Color('rgb(226,35,213)'),
            //   emissive: new THREE.Color('rgb(255,128,64)'),
            //   specular: new THREE.Color('rgb(255,155,255)'),
            //   shininess: 10,
            //   flatShading: true,
            //   opacity: 1,
            // });

            material = new THREE.MeshBasicMaterial({ color: 0xff6666 });
            geometry = renderMeshData.mesh === new THREE.BoxGeometry(1, 1, 1);

            const moonMesh = new THREE.Mesh(geometry, material);
            const moonObjectContainer = new THREE.Object3D();
            moonObjectContainer.add(moonMesh);

            return moonObjectContainer;
          case 'Cube':
          default:
            material = new THREE.MeshBasicMaterial({ color: 0xff6666 });
            geometry = renderMeshData.mesh === new THREE.BoxGeometry(1, 1, 1);
            const mesh = new THREE.Mesh(geometry, material);
            const objectContainer = new THREE.Object3D();

            objectContainer.add(mesh);
            return objectContainer;
        }
      };

      const object = makeMesh(renderMeshData);

      const { x, y, z } = renderMeshData.data.position.data;
      object.position.set(x, y, z);
      object.name = entity.uuid;

      const renderDebugData = entity.components.filter(
        (component: any) => component.name === RENDER_DEBUG
      )[0];

      if (renderDebugData) {
        const axesHelper = new THREE.AxesHelper(5);
        object.add(axesHelper);
      }

      world.scene.add(object);
    },
    onUpdate: (delta: number, entities, entityActions, { world }: any) => {
      // @ts-ignore
      entities.forEach((entity: any) => {
        const renderMeshData = entity.components.filter(
          (component: any) => component.name === RENDER_MESH
        )[0];
        const { x: rx, y: ry, z: rz } = renderMeshData.data.rotation.data;
        const { x: px, y: py, z: pz } = renderMeshData.data.position.data;
        const worldObj = world.scene.getObjectByName(entity.uuid);
        if (!worldObj) {
          // Something went wrong here, probably.
          return;
        }
        worldObj.rotation.set(rx, ry, rz);
        worldObj.position.set(px, py, pz);
      });

      world.update();
    },
  });

export default renderSystem;
