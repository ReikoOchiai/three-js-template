import * as THREE from "three";

// src
import Experience from "./Experience.ts";
import Camera from "./Camera.ts";

// utils
import Sizes from "./utils/Sizes.ts";

export default class Renderer {
  experience: Experience;
  sizes: Sizes;
  scene: THREE.Scene;
  canvas: HTMLElement | null;
  camera: Camera;
  webglRenderer: THREE.WebGLRenderer;

  constructor() {
    this.experience = new Experience();
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;
    this.canvas = this.experience.canvas;
    this.camera = this.experience.camera;

    this.setRenderer();
  }

  setRenderer() {
    this.webglRenderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      alpha: true,
    });

    this.webglRenderer.outputColorSpace = THREE.SRGBColorSpace;
    this.webglRenderer.toneMapping = THREE.CineonToneMapping;
    this.webglRenderer.toneMappingExposure = 1.75;
    this.webglRenderer.shadowMap.enabled = true;
    this.webglRenderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.webglRenderer.setSize(this.sizes.width, this.sizes.height);
    this.webglRenderer.setPixelRatio(this.sizes.pixelRatio);
  }

  resize() {
    this.webglRenderer.setSize(this.sizes.width, this.sizes.height);
    this.webglRenderer.setPixelRatio(this.sizes.pixelRatio);
  }

  update() {
    this.webglRenderer.render(this.scene, this.camera.perspectiveCamera);
  }
}