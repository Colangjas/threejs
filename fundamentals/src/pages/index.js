import * as React from "react"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import Seo from "../components/seo"
import * as styles from "../components/index.module.css"
import * as THREE from 'three';

const { useEffect } = React;

const IndexPage = () => {
  useEffect(() => {
    console.log('Document is loaded');
    const main = () => {
      const canvas = document.querySelector('#c');
      const renderer = new THREE.WebGLRenderer({ canvas });
      // PerspectiveCamera https://threejs.org/docs/#api/en/cameras/PerspectiveCamera
      const fov = 75;
      // https://threejs.org/manual/en/responsive.html
      const aspect = 2;  // the canvas default
      const near = 0.1;
      const far = 5;
      const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
      camera.position.z = 2;

      // Light https://threejs.org/docs/#api/en/lights/Light
      {
        const color = 0xFFFFFF;
        const intensity = 3;
        const light = new THREE.DirectionalLight(color, intensity);
        light.position.set(-1, 2, 4);
        scene.add(light);
      }

      // Scene https://threejs.org/manual/en/scenegraph.html
      const scene = new THREE.Scene();
      // BoxGeometry
      const boxWidth = 1;
      const boxHeight = 1;
      const boxDepth = 1;
      const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);
      // Material https://threejs.org/docs/#api/en/materials/Material
      const material = new THREE.MeshPhongMaterial({color: 0x44aa88});
      // Mesh https://threejs.org/docs/#api/en/objects/Mesh
      const cube = new THREE.Mesh(geometry, material);
      scene.add(cube);
      // Renderer https://threejs.org/docs/#api/en/renderers/WebGLRenderer
      renderer.render(scene, camera);
      const render = (time) => {
        time *= 0.001;  // convert time to seconds
  
        cube.rotation.x = time;
        cube.rotation.y = time;
  
        renderer.render(scene, camera);
  
        // https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame
        requestAnimationFrame(render);
      }
      requestAnimationFrame(render);
    }
    main();
  }, []);

  return (
  <Layout>
    <canvas id="c"></canvas>
  </Layout>
)}

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = () => <Seo title="Home" />

export default IndexPage
