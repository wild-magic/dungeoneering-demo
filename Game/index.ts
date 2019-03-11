import { Engine } from 'wild-magic';
import renderSystem from './systems/render';
import { EntityActions, EntitiesState } from 'wild-magic/lib/Engine/types';
import physicsSystem from './systems/physics';
import dungeonSystem from './systems/dungeon';

// Maybe we can have the game coordinate between the UI / Input / Engine / Data layers
// Maybe it can be some sort of broker between them?
export default class Game {
  readonly engine: Engine;

  constructor(canvas: HTMLCanvasElement, updateActions: EntityActions) {
    this.engine = new Engine(updateActions);
    this.engine.addSystem(dungeonSystem());
    this.engine.addSystem(physicsSystem());
    this.engine.addSystem(renderSystem(canvas));
    this.start();
  }

  run() {
    this.engine.tick();
    window.requestAnimationFrame(this.run.bind(this));
  }

  setEntities(entities: EntitiesState) {
    this.engine.entities = entities;
  }

  pause() {
    this.engine.stop();
  }

  start() {
    this.engine.start();
  }
}
