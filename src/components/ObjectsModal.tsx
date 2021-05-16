import React, { useContext } from 'react';
import { BoxGeometry, Mesh, MeshBasicMaterial, SphereBufferGeometry } from 'three'
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import AddIcon from '@material-ui/icons/Add'
import { Divider, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';


import { LayoutContext } from '../context/Layout';
import { ThreeContext } from '../context/Three';


const useStyles = makeStyles((theme) => ({
  paper: {
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    margin: 'auto',
  },
}));

export default function SimpleModal() {
  const classes = useStyles();
  const { modalOpen, setModalOpen } = useContext(LayoutContext);
  const { threeObjects, setThreeObjects, setEditObject } = useContext(ThreeContext);

  const handleClose = () => {
    setModalOpen(false);
  };

  const handleAddBox = () => {
      let geometry = new BoxGeometry( 1, 1, 1 );
      let material = new MeshBasicMaterial( { color: 0x00ff00 } );
      let cube = new Mesh( geometry, material );
      // console.log(cube)
      setThreeObjects([...threeObjects, cube]);
      setEditObject(cube.uuid);
      setModalOpen(false);
  }

  const handleAddSphere = () => {
    let geometry = new SphereBufferGeometry( .5, 64, 64);
    let material = new MeshBasicMaterial( { color: 0x00ff00 } );
    let sphere = new Mesh(geometry, material);

    setThreeObjects([...threeObjects, sphere]);
    setEditObject(sphere.uuid);
    setModalOpen(false);    
  }

  const objectsArr = [
    {name: "Box Geometry", fxn: handleAddBox}, 
    {name: "Sphere Geometry", fxn: handleAddSphere}
  ];

  const body = (
    <div className={classes.paper}>
      <h2 id="simple-modal-title">Add Object to Scene</h2>
      <Divider />
        <List>
          {objectsArr.map((obj, i) => (
            <ListItem button key={i} onClick={obj.fxn}>
            <ListItemIcon> <AddIcon /> </ListItemIcon>
            <ListItemText primary={obj.name} />
          </ListItem>
          ))
            }
        </List>
    </div>
  );

  return (
      <Modal
        open={modalOpen}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
  );
}
