import React, { useContext, useEffect, useRef } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core';
import * as THREE from 'three';
import {DragControls} from 'three/examples/jsm/controls/DragControls';
import { LayoutContext } from '../context/Layout';
import ObjectsModal from './ObjectsModal';
import EditModal from './EditModal';
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

// const coords = new THREE.Vector2();
// let canvasBounds: any;

export default function Main() {
    const classes = useStyles();
    const { leftDrawerOpen } = useContext(LayoutContext);
    const sceneEl = useRef<HTMLDivElement>(null);
    const { threeObjects } = useContext(ThreeContext);

    useEffect(() => {
      let scene = new THREE.Scene();
      let camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
      let renderer = new THREE.WebGLRenderer();
      scene.background = new THREE.Color( 0xf0f0f0 );
      // const raycaster = new THREE.Raycaster();
      // canvasBounds = renderer.domElement.getBoundingClientRect();
      // let INTERSECTED: any;

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
      

      if(threeObjects.length > 0){
        new DragControls(threeObjects, camera, renderer.domElement);
      }

      // function render() {

      //   // update the picking ray with the camera and mouse position
      //   raycaster.setFromCamera( coords, camera );

      //   // calculate objects intersecting the picking ray
      //   const intersects: any = raycaster.intersectObjects( scene.children );

      //   if ( intersects.length > 0 ) {

			// 		if ( INTERSECTED !== intersects[ 0 ].object ) {

			// 			// if ( INTERSECTED ) INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );

			// 			INTERSECTED = intersects[ 0 ].object;
      //       console.log(INTERSECTED.uuid)
			// 			// INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex();
			// 			// INTERSECTED.material.emissive.setHex( 0xff0000 );

			// 		}

			// 	} else {

			// 		// if ( INTERSECTED ) INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );

			// 		INTERSECTED = null;

			// 	}

      //   renderer.render( scene, camera );

      // }

      // window.addEventListener( 'mousemove', onMouseMove, false );
      let animate = function () {
        requestAnimationFrame( animate );
        // cube.rotation.x += 0.01;
        // cube.rotation.y += 0.01;
        renderer.render( scene, camera );
        // render()
      };
      animate();
      // window.requestAnimationFrame(render);

      
    })

    

    // const handleMouseEvent = ( event: any ) => {
    //   // calculate mouse position in normalized device coordinates
    //   // (-1 to +1) for both components
    //   event.preventDefault();
    //   coords.x = (( event.target.clientWidth - canvasBounds.left ) / ( canvasBounds.right - canvasBounds.left) ) * 2 - 1;
    //   coords.y = - (( event.target.clientHeight - canvasBounds.top ) / ( canvasBounds.bottom - canvasBounds.top)) * 2 + 1;
    //   // coords.x = (event.nativeEvent.offsetX / event.target.clientWidth) * 2 - 1;
    //   // coords.y = - (event.nativeEvent.offsetY / event.target.clientHeight) * 2 + 1;
    //   console.log(event, coords)
    // }

    return (
        
        <main
          className={clsx(classes.content, {
            [classes.contentShift]: leftDrawerOpen,
          })}
        >
          <div className={classes.drawerHeader} />
          <div ref={sceneEl}></div>
        <ObjectsModal />
        <EditModal />
        </main>
    )
}