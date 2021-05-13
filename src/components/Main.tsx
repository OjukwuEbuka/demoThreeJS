import React, { DOMElement, useContext, useEffect, useRef } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core';
import * as THREE from 'three';
import {DragControls} from 'three/examples/jsm/controls/DragControls';
import Typography from '@material-ui/core/Typography';
import { LayoutContext } from '../context/Layout';
import ObjectsModal from './ObjectsModal';
import { ThreeContext } from '../context/Three';


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
    const { threeObjects } = useContext(ThreeContext);

    useEffect(() => {
      let scene = new THREE.Scene();
      let camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
      let renderer = new THREE.WebGLRenderer();
      
      // console.log(scene)
      renderer.setSize( window.innerWidth - 300 , window.innerHeight - 100 );
      // document.body.appendChild( renderer.domElement );
      // use ref as a mount point of the Three.js scene instead of the document.body
      if(sceneEl.current) {
        if(sceneEl.current.childNodes.length > 0){
          sceneEl.current.childNodes.forEach((nod) => {
            sceneEl.current && sceneEl.current.removeChild(nod)
          })
        }
        sceneEl.current.appendChild(renderer.domElement);
      }
      
      // scene.add( ...[cube, cube2] );
      threeObjects.length > 0 && scene.add( ...threeObjects );
      camera.position.z = 5;
      let animate = function () {
        requestAnimationFrame( animate );
        // cube.rotation.x += 0.01;
        // cube.rotation.y += 0.01;
        renderer.render( scene, camera );
      };
      animate();

      if(threeObjects.length > 0){
        const controls = new DragControls(threeObjects, camera, renderer.domElement);
      }

      
    }, [ threeObjects])

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