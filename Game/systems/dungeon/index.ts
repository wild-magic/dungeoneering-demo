import { System, Component, Entity } from 'wild-magic';
import * as CANNON from 'cannon';
import {
  RENDERABLE,
  HAS_PHYSICS,
  roomComponent,
  renderableComponent,
  positionComponent,
  textComponent,
} from '../../components';
import Dungeon from 'dungeon-generator';
import { RenderTypes } from '../render/types/renderType';

const dungeonSystem = () =>
  new System<{ dungeon: Dungeon }>({
    name: 'dungeonSystem',
    componentTypes: [],
    onInit: (entities, entityActions) => {
      console.log('hello dungeon simulation!');

      // @ts-ignore
      const dungeon = new Dungeon({
        size: [50, 50],
        rooms: {
          initial: {
            min_size: [3, 3],
            max_size: [3, 3],
            max_exits: 1,
          },
          any: {
            min_size: [2, 2],
            max_size: [5, 5],
            max_exits: 4,
          },
        },
        max_corridor_length: 6,
        min_corridor_length: 2,
        corridor_density: 0.5,
        symmetric_rooms: false,
        interconnects: 1,
        max_interconnect_length: 10,
        room_count: 5,
      });
      dungeon.generate();
      dungeon.print();

      dungeon.children.forEach(room => {
        // Add Exits
        room.exits.forEach((exit, index) => {
          console.log(exit);
          const [[x, y], angle, connectingRoom] = exit; // local position of exit and piece it exits to
          const [gx, gy] = room.global_pos([x, y]); // [x, y] global pos of the exit

          entityActions.addEntity(
            new Entity({
              name: `room-${room.id}-exit-${index}`,
              components: [
                renderableComponent({
                  mesh: RenderTypes.CUBE,
                  position: positionComponent({
                    x: gx,
                    y: 0,
                    z: gy,
                  }),
                }),
              ],
            })
          );
        });

        // Add Rooms!
        entityActions.addEntity(
          new Entity({
            name: `room-${room.id}`,
            components: [
              roomComponent(room),
              renderableComponent({
                mesh: RenderTypes.ROOM,
                position: positionComponent({
                  x: room.position[0],
                  y: 0,
                  z: room.position[1],
                }),
              }),
              renderableComponent({
                mesh: RenderTypes.DEBUG,
                position: positionComponent({
                  x: room.position[0],
                  y: 0,
                  z: room.position[1],
                }),
              }),
              textComponent({
                text: `room-${room.id} (${room.position[0]} 0 ${
                  room.position[1]
                })`,
              }),
              renderableComponent({
                mesh: RenderTypes.TEXT,
                position: positionComponent({
                  x: room.position[0],
                  y: 5,
                  z: room.position[1],
                }),
              }),
            ],
          })
        );
      });

      entityActions.addEntity(
        new Entity({
          name: `start-position`,
          components: [
            renderableComponent({
              mesh: RenderTypes.CUBE,
              position: positionComponent({
                x: dungeon.start_pos[0],
                y: 0,
                z: dungeon.start_pos[1],
              }),
            }),
            renderableComponent({
              mesh: RenderTypes.DEBUG,
              position: positionComponent({
                x: dungeon.start_pos[0],
                y: 0,
                z: dungeon.start_pos[1],
              }),
            }),
            textComponent({
              text: `START HERE!(${dungeon.start_pos[0]} 0 ${
                dungeon.start_pos[1]
              })`,
            }),
            renderableComponent({
              mesh: RenderTypes.TEXT,
              position: positionComponent({
                x: dungeon.start_pos[0],
                y: 5,
                z: dungeon.start_pos[1],
              }),
            }),
          ],
        })
      );

      console.log(dungeon);

      return dungeon;
    },
    onEntityAdded: (entity: any, { dungeon }: any) => {},
    onUpdate: (delta: number, entities, entityActions, { dungeon }: any) => {},
  });

export default dungeonSystem;
