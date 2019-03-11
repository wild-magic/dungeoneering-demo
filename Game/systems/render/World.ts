import * as THREE from 'three';
import OrbitControls from 'three-orbitcontrols';

export default class World {
  private scene: THREE.Scene;
  private renderer: THREE.WebGLRenderer;
  private controls: OrbitControls;
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
    gridHelper.position.set(0, 0, 0);
    this.camera = new THREE.PerspectiveCamera(
      45,
      canvas.clientWidth / canvas.clientHeight,
      0.01,
      1000
    );
    this.camera.position.set(0, 0, 20);
    this.scene.add(gridHelper);

    // lights
    const L1 = new THREE.PointLight(0xffffff, 0.2);
    L1.position.z = 100;
    L1.position.y = 100;
    L1.position.x = 100;
    this.scene.add(L1);

    const L2 = new THREE.PointLight(0xffffff, 0.3);
    L2.position.z = 200;
    L2.position.y = 50;
    L2.position.x = -100;

    const controls = new OrbitControls(this.camera, this.renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.enableZoom = true;
    this.scene.add(L2);
    const axesHelper = new THREE.AxesHelper(5);
    this.scene.add(axesHelper);
  }

  update() {
    this.renderer.render(this.scene, this.camera);
  }
}
