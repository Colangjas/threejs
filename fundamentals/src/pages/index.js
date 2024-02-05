import * as React from "react"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import Seo from "../components/seo"
import * as styles from "../components/index.module.css"
import * as THREE from 'three';
// import { TextGeometry } from 'three-stdlib';
// import { FontLoader } from 'three-stdlib';
import { GUI } from 'dat.gui';

const { useEffect } = React;

const IndexPage = () => {
  useEffect(() => {
    const main = () => {
      const canvas = document.querySelector( '#c' );
      const renderer = new THREE.WebGLRenderer( { antialias: true, canvas } );

      const material = new THREE.MeshPhongMaterial( { 
        color: 0xff0000,
        flatShading: true,
       } ); // red (can also use a CSS colour string here)

    }
    
    main();
  }, []);

  return (
  <Layout>
    <canvas id="c" className={styles.c}></canvas>
    <p>Material example in code</p>
  </Layout>
)}

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = () => <Seo title="Home" />

export default IndexPage
