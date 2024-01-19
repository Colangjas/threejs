import * as React from "react"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import Seo from "../components/seo"
import * as styles from "../components/index.module.css"
import * as THREE from 'three';
import { TextGeometry } from 'three-stdlib';
import { FontLoader } from 'three-stdlib';

const { useEffect } = React;

const IndexPage = () => {
  useEffect(() => {
    const main = () => {
      const canvas = document.querySelector( '#c' );
      const renderer = new THREE.WebGLRenderer( { antialias: true, canvas } );
    
      const fov = 40;
      const aspect = 2; // the canvas default
      const near = 0.1;
      const far = 1000;
      const camera = new THREE.PerspectiveCamera( fov, aspect, near, far );
      camera.position.set( 0, 50, 0 );
      camera.up.set( 0, 0, 1 );
      camera.lookAt( 0, 0, 0 );
    
      const scene = new THREE.Scene();
    
      {
    
        const color = 0xFFFFFF;
        const intensity = 500;
        const light = new THREE.PointLight( color, intensity );
        scene.add( light );
    
      }
    
      // an array of objects who's rotation to update
      const objects = [];
    
      const radius = 1;
      const widthSegments = 6;
      const heightSegments = 6;
      const sphereGeometry = new THREE.SphereGeometry(
      radius, widthSegments, heightSegments );

      const solarSystem = new THREE.Object3D();
      scene.add(solarSystem);
      objects.push(solarSystem);
    
      const sunMaterial = new THREE.MeshPhongMaterial( { emissive: 0xFFFF00 } );
      const sunMesh = new THREE.Mesh( sphereGeometry, sunMaterial );
      sunMesh.scale.set( 5, 5, 5 );
      solarSystem.add(sunMesh);
      objects.push( sunMesh );

      const earthOrbit = new THREE.Object3D();
      earthOrbit.position.x = 10;
      solarSystem.add(earthOrbit);
      objects.push(earthOrbit);

      const earthMaterial = new THREE.MeshPhongMaterial({color: 0x2233FF, emissive: 0x112244});
      const earthMesh = new THREE.Mesh(sphereGeometry, earthMaterial);
      earthMesh.position.x = 10;
      earthOrbit.add(earthMesh);
      objects.push(earthMesh);

      const moonOrbit = new THREE.Object3D();
      moonOrbit.position.x = 2;
      earthOrbit.add(moonOrbit);

      const moonMaterial = new THREE.MeshPhongMaterial({color: 0x888888, emissive: 0x222222});
      const moonMesh = new THREE.Mesh(sphereGeometry, moonMaterial);
      moonMesh.scale.set(.5, .5, .5);
      moonOrbit.add(moonMesh);
      objects.push(moonMesh);
    
      function resizeRendererToDisplaySize( renderer ) {
    
        const canvas = renderer.domElement;
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;
        const needResize = canvas.width !== width || canvas.height !== height;
        if ( needResize ) {
    
          renderer.setSize( width, height, false );
    
        }
    
        return needResize;
    
      }
    
      function render( time ) {
    
        time *= 0.001;
    
        if ( resizeRendererToDisplaySize( renderer ) ) {
    
          const canvas = renderer.domElement;
          camera.aspect = canvas.clientWidth / canvas.clientHeight;
          camera.updateProjectionMatrix();
    
        }
    
        objects.forEach( ( obj ) => {
    
          obj.rotation.y = time;
    
        } );
    
        renderer.render( scene, camera );
    
        requestAnimationFrame( render );
    
      }
    
      requestAnimationFrame( render );
    
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
