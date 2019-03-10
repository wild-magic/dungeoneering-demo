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

    // lights
    const L1 = new THREE.PointLight(0xffffff, 1);
    L1.position.z = 100;
    L1.position.y = 100;
    L1.position.x = 100;
    this.scene.add(L1);

    const L2 = new THREE.PointLight(0xffffff, 0.8);
    L2.position.z = 200;
    L2.position.y = 50;
    L2.position.x = -100;
    this.scene.add(L2);
  }

  update() {
    this.renderer.render(this.scene, this.camera);
  }
}
