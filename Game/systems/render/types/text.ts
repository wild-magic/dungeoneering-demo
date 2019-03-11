import * as THREE from 'three';
import { EntityState } from 'wild-magic/lib/Entity/types';
import { TEXT } from '../../../components';

function get2DCoords(position, camera): THREE.Vector3 {
  const vector = position.project(camera);
  vector.x = ((vector.x + 1) / 2) * window.innerWidth;
  vector.y = (-(vector.y - 1) / 2) * window.innerHeight;
  return vector;
}

// TODO maybe should return update function?
export default (entity: EntityState): THREE.Object3D => {
  const { text } = entity.components.filter(
    (component: any) => component.name === TEXT
  )[0].data;

  class ThreeText extends THREE.Object3D {
    readonly element: HTMLElement;
    constructor(text: string) {
      super();
      const div = document.createElement('div');
      document.body.appendChild(div);
      div.className = 'text-label';
      div.style.position = 'absolute';
      div.style.width = '100';
      div.style.height = '100';
      div.innerHTML = text;
      div.style.top = '-1000';
      div.style.left = '-1000';
      this.element = div;
    }

    updateText(text) {
      this.element.innerHTML = text;
    }

    updatePosition(camera) {
      if (this.parent) {
        this.position.copy(this.parent.position);
      }

      const coords2d = get2DCoords(this.position, camera);
      this.element.style.left = `${coords2d.x}px`;
      this.element.style.top = `${coords2d.y}px`;
    }
  }

  const threeText = new ThreeText(text);

  const objectContainer = new THREE.Object3D();
  objectContainer.add(threeText);
  return objectContainer;
};
