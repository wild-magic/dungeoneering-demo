import { System, Component } from 'wild-magic';
import * as CANNON from 'cannon';
import { HAS_PHYSICS } from '../../components';

const physicsSystem = () =>
  new System<{ world: CANNON.World }>({
    name: 'physicsSystem',
    componentTypes: [HAS_PHYSICS],
    onInit: () => {
      console.log('hello physics simulation!');
      const world = new CANNON.World();
      world.broadphase = new CANNON.NaiveBroadphase();
      world.gravity = new CANNON.Vec3(0, -9.82, 0); // m/s²
      const groundBody = new CANNON.Body({
        mass: 0, // mass == 0 makes the body static
      });
      const groundShape = new CANNON.Plane();
      groundBody.addShape(groundShape);
      groundBody.quaternion.setFromAxisAngle(
        new CANNON.Vec3(1, 0, 0),
        -Math.PI / 2
      );
      world.addBody(groundBody);
      return {
        world,
      };
    },
    // should it show only the components concerned, or the entire entity?
    onEntityAdded: (entity: any, { world }: any) => {
      const renderMeshData = entity.components.filter(
        (component: any) => component.name === RENDER_MESH
      )[0];
      const { x: rx, y: ry, z: rz } = renderMeshData.data.rotation.data;
      const { x: px, y: py, z: pz } = renderMeshData.data.position.data;
      const mass = 2;
      const radius = 1;
      const boxShape = new CANNON.Box(new CANNON.Vec3(1, 1, 1));
      const boxBody = new CANNON.Body({ mass });
      boxBody.addShape(boxShape);
      boxBody.position.set(px, py, pz);
      boxBody.quaternion.setFromAxisAngle(
        new CANNON.Vec3(rx, ry, rz),
        -Math.PI / 2
      );
      boxBody.id = entity.uuid;
      world.addBody(boxBody);
    },
    onUpdate: (delta: number, entities, entityActions, { world }: any) => {
      // first computer physics changes
      world.step(1 / 60, delta);

      // now dispatch the position and rotation updates to the mesh data
      // so we can render those changes!
      // @ts-ignore
      entities.forEach((entity: any) => {
        const body = world.bodies.find(
          (body: CANNON.Body) => body.id === entity.uuid
        );
        if (!body) {
          // Something went wrong here, probably.
          return;
        }
        const renderMeshData = entity.components.filter(
          (component: any) => component.name === RENDER_MESH
        )[0];
        const { x: rx, y: ry, z: rz } = body.quaternion;
        const { x: px, y: py, z: pz } = body.position;

        entityActions.updateEntity(entity.uuid, RENDER_MESH, {
          ...renderMeshData.data,
          rotation: {
            name: renderMeshData.data.rotation.name,
            data: {
              x: rx,
              y: ry,
              z: rz,
            },
          },
          position: {
            name: renderMeshData.data.position.name,
            data: {
              x: px,
              z: pz,
              y: py,
            },
          },
        });
      });

      // world.update();
    },
  });

export default physicsSystem;
