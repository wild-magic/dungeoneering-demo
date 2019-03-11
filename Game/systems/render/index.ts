import { System, Component } from 'wild-magic';
import World from './World';
import { RENDER_DEBUG, RENDERABLE } from '../../components';
import * as THREE from 'three';
import renderType, { RenderTypes } from './types/renderType';

const renderSystem = (canvas: HTMLCanvasElement) =>
  new System<{ world: World }>({
    name: 'renderSystem',
    componentTypes: [RENDERABLE, RENDER_DEBUG],
    onInit: () => {
      console.log('hello world');
      return {
        world: new World(canvas),
      };
    },
    // should it show only the components concerned, or the entire entity?
    onEntityAdded: (entity: any, { world }: any) => {
      entity.components
        .filter((component: any) => component.name === RENDERABLE)
        .forEach((renderMeshData, index) => {
          const object = renderType(renderMeshData.data.mesh, entity);
          const { x, y, z } = renderMeshData.data.position.data;
          object.position.set(x, y, z);
          object.name = `${entity.uuid}-${index}`;

          world.scene.add(object);
        });
    },
    onUpdate: (delta: number, entities, entityActions, { world }: any) => {
      // @ts-ignore
      entities.forEach((entity: any) => {
        entity.components
          .filter((component: any) => component.name === RENDERABLE)
          .forEach((renderMeshData, index) => {
            const { x: rx, y: ry, z: rz } = renderMeshData.data.rotation.data;
            const { x: px, y: py, z: pz } = renderMeshData.data.position.data;
            const worldObj = world.scene.getObjectByName(
              `${entity.uuid}-${index}`
            );
            if (!worldObj) {
              console.warn('world object not found', entity);
              // Something went wrong here, probably.
              return;
            }
            worldObj.rotation.set(rx, ry, rz);
            worldObj.position.set(px, py, pz);

            // special case for text
            if (renderMeshData.data.mesh === RenderTypes.TEXT) {
              worldObj.children[0].updatePosition(world.camera);
            }
          });
      });

      // make sure we update lal the

      world.update();
    },
  });

export default renderSystem;
