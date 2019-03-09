import * as THREE from 'three';

export default class World {
  private scene: THREE.Scene;
  private renderer: THREE.WebGLRenderer;
  private camera: THREE.PerspectiveCamera;

  constructor(canvas: HTMLCanvasElement) {
    this.scene = new THREE.Scene();
    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
    });
    this.renderer.setSize(canvas.clientWidth, canvas.clientHeight);

    const gridHelper = new THREE.GridHelper(100, 100);
    this.camera = new THREE.PerspectiveCamera(
      45,
      canvas.clientWidth / canvas.clientHeight,
      0.01,
      1000
    );
    this.camera.position.set(0, 5, 20);
    this.scene.add(gridHelper);
  }

  update() {
    this.renderer.render(this.scene, this.camera);
  }
}
