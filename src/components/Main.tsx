import React, { useContext, useEffect, useRef } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core';
import * as THREE from 'three';
import {DragControls} from 'three/examples/jsm/controls/DragControls';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
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
    // padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
    marginRight: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },  
  // drawerHeader: {
  //   display: 'flex',
  //   alignItems: 'center',
  //   padding: theme.spacing(0, 1),
  //   // necessary for content to be below app bar
  //   ...theme.mixins.toolbar,
  //   justifyContent: 'flex-end',
  // },
}));

// const coords = new THREE.Vector2();
// let canvasBounds: any;

const sizes = {
  width: window.innerWidth - 480,
  height: window.innerHeight
}

export default function Main() {
    const classes = useStyles();
    const { leftDrawerOpen } = useContext(LayoutContext);
    const sceneEl = useRef<HTMLDivElement>(null);
    const { threeObjects } = useContext(ThreeContext);

    useEffect(() => {
      if(!leftDrawerOpen){
        sizes.width = window.innerWidth
      } else {
        sizes.width = window.innerWidth - 480
      }
    }, [leftDrawerOpen])

    useEffect(() => {
      let scene = new THREE.Scene();
      let camera = new THREE.PerspectiveCamera( 75, sizes.width / sizes.height, 0.1, 1000 );
      let renderer = new THREE.WebGLRenderer();
      scene.background = new THREE.Color( 0xf0f0f0 );
      let orbitControls = new OrbitControls(camera, renderer.domElement)

      // const raycaster = new THREE.Raycaster();
      // canvasBounds = renderer.domElement.getBoundingClientRect();
      // let INTERSECTED: any;

      // console.log(scene)
      // renderer.setSize( window.innerWidth - 300 , window.innerHeight - 100 );
      renderer.setSize(sizes.width, sizes.height)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

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

      // let plane = new THREE.GridHelper(50, 30);
      let grid = new THREE.Group();

      let grid1 = new THREE.GridHelper( 30, 30, 0x888888, 0x888888 );
      grid.add( grid1 );

      let grid2 = new THREE.GridHelper( 30, 6, 0x222222, 0x222222 );
      grid.add( grid2 );
      scene.add(grid)
      // scene.add( ...[cube, cube2] );
      threeObjects.length > 0 && scene.add( ...threeObjects );
      // camera.position.z = 5;
      camera.position.set(0, 1, 5).setLength(20)
      orbitControls.update()

      if(threeObjects.length > 0){
        new DragControls(threeObjects, camera, renderer.domElement);
      }

      
      window.addEventListener('resize', () =>
      {
          // Update sizes
          sizes.width = window.innerWidth - 480
          sizes.height = window.innerHeight
      
          // Update camera
          camera.aspect = sizes.width / sizes.height
          camera.updateProjectionMatrix()
          orbitControls.update()
      
          // Update renderer
          renderer.setSize(sizes.width, sizes.height)
          renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      })

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
          {/* <div className={classes.drawerHeader} /> */}
          <div ref={sceneEl}></div>
        <ObjectsModal />
        <EditModal />
        </main>
    )
}