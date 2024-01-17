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

      // Scene https://threejs.org/manual/en/scenegraph.html
      const scene = new THREE.Scene();

      // Light https://threejs.org/docs/#api/en/lights/Light
      {
        const color = 0xFFFFFF;
        const intensity = 3;
        const light = new THREE.DirectionalLight(color, intensity);
        light.position.set(-1, 2, 4);
        scene.add(light);
      }

      // BoxGeometry
      const boxWidth = 1;
      const boxHeight = 1;
      const boxDepth = 1;
      const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

      // Material https://threejs.org/docs/#api/en/materials/Material
      const makeInstance = (geometry, color, x) => {
        const material = new THREE.MeshPhongMaterial({color});
      
        const cube = new THREE.Mesh(geometry, material);
        scene.add(cube);
      
        cube.position.x = x;
      
        return cube;
      }
      const cubes = [
        makeInstance(geometry, 0x44aa88,  0),
        makeInstance(geometry, 0x8844aa, -2),
        makeInstance(geometry, 0xaa8844,  2),
      ];

      const resizeRendererToDisplaySize = (renderer) => {
        const canvas = renderer.domElement;
        const pixelRatio = window.devicePixelRatio;
        const width = canvas.clientWidth * pixelRatio | 0;
        const height = canvas.clientHeight * pixelRatio | 0;
        const needResize = canvas.width !== width || canvas.height !== height;
        if (needResize) {
          renderer.setSize(width, height, false);
        }
        return needResize;
      }
      const render = (time) => {
        time *= 0.001;  // convert time to seconds

        if(resizeRendererToDisplaySize(renderer)) {
          const canvas = renderer.domElement;
          camera.aspect = canvas.clientWidth / canvas.clientHeight;
          camera.updateProjectionMatrix();
        }
 
        cubes.forEach((cube, ndx) => {
          const speed = 1 + ndx * .1;
          const rot = time * speed;
          cube.rotation.x = rot;
          cube.rotation.y = rot;
        });
  
        // Renderer https://threejs.org/docs/#api/en/renderers/WebGLRenderer
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
    <canvas id="c" className={styles.c}></canvas>
  </Layout>
)}

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = () => <Seo title="Home" />

export default IndexPage
