import React, { DOMElement, useContext, useEffect, useRef } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core';
import * as THREE from 'three';
import {DragControls} from 'three/examples/jsm/controls/DragControls';
import Typography from '@material-ui/core/Typography';
import { LayoutContext } from '../context/Layout';
import ObjectsModal from './ObjectsModal';


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },  
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },  
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
}));


export default function Main() {
    const classes = useStyles();
    const { leftDrawerOpen } = useContext(LayoutContext);
    const sceneEl = useRef<HTMLDivElement>(null);

    useEffect(() => {
      var scene = new THREE.Scene();
      var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
      var renderer = new THREE.WebGLRenderer();
      
      console.log(scene)
      renderer.setSize( window.innerWidth - 300 , window.innerHeight - 100 );
      // document.body.appendChild( renderer.domElement );
      // use ref as a mount point of the Three.js scene instead of the document.body
      sceneEl.current && sceneEl.current.appendChild( renderer.domElement );
      var geometry = new THREE.BoxGeometry( 1, 1, 1 );
      var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
      var cube = new THREE.Mesh( geometry, material );
      var cube2 = new THREE.Mesh( geometry, material );
      scene.add( ...[cube, cube2] );
      camera.position.z = 5;
      var animate = function () {
        requestAnimationFrame( animate );
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        renderer.render( scene, camera );
      };
      animate();

      const controls = new DragControls([cube, cube2], camera, renderer.domElement);

      
    }, [sceneEl])

    return (
        
        <main
          className={clsx(classes.content, {
            [classes.contentShift]: leftDrawerOpen,
          })}
        >
          <div className={classes.drawerHeader} />
          <div ref={sceneEl}></div>
        <ObjectsModal />
        </main>
    )
}