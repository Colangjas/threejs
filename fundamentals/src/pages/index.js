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
      camera.position.z = 40;
    
      const scene = new THREE.Scene();
      scene.background = new THREE.Color( 0xAAAAAA );
    
      {
    
        const color = 0xFFFFFF;
        const intensity = 3;
        const light = new THREE.DirectionalLight( color, intensity );
        light.position.set( - 1, 2, 4 );
        scene.add( light );
    
      }
    
      {
    
        const color = 0xFFFFFF;
        const intensity = 3;
        const light = new THREE.DirectionalLight( color, intensity );
        light.position.set( 1, - 2, - 4 );
        scene.add( light );
    
      }
    
      const objects = [];
      const spread = 15;
    
      function addObject( x, y, obj ) {
    
        obj.position.x = x * spread;
        obj.position.y = y * spread;
    
        scene.add( obj );
        objects.push( obj );
    
      }
    
      function createMaterial() {
    
        const material = new THREE.MeshPhongMaterial( {
          side: THREE.DoubleSide,
        } );
    
        const hue = Math.random();
        const saturation = 1;
        const luminance = .5;
        material.color.setHSL( hue, saturation, luminance );
    
        return material;
    
      }
    
      function addSolidGeometry( x, y, geometry ) {
    
        const mesh = new THREE.Mesh( geometry, createMaterial() );
        addObject( x, y, mesh );
    
      }
    
      {
    
        const loader = new FontLoader();
        // promisify font loading
        function loadFont( url ) {
    
          return new Promise( ( resolve, reject ) => {
    
            loader.load( url, resolve, undefined, reject );
    
          } );
    
        }
    
        async function doit() {
    
          const font = await loadFont( 'https://threejs.org/examples/fonts/helvetiker_regular.typeface.json' ); 
          const geometry = new TextGeometry( 'three.js', {
            font: font,
            size: 3.0,
            height: .2,
            curveSegments: 12,
            bevelEnabled: true,
            bevelThickness: 0.15,
            bevelSize: .3,
            bevelSegments: 5,
          } );
    
          addSolidGeometry( - .5, 0, geometry );
    
          const mesh = new THREE.Mesh( geometry, createMaterial() );
          geometry.computeBoundingBox();
          geometry.boundingBox.getCenter( mesh.position ).multiplyScalar( - 1 );
    
          const parent = new THREE.Object3D();
          parent.add( mesh );
    
          addObject( .5, 0, parent );
    
        }
    
        doit();
    
      }
    
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
    
        objects.forEach( ( obj, ndx ) => {
    
          const speed = .5 + ndx * .05;
          const rot = time * speed;
          obj.rotation.x = rot;
          obj.rotation.y = rot;
    
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
