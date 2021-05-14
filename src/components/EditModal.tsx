import React, { useContext, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Divider, Input, InputLabel, Button } from '@material-ui/core';


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
  button: {
      backgroundColor: "#76e276",
      marginTop: '5px',
      marginRight: "auto"
  }
}));

export default function SimpleModal() {
  const classes = useStyles();
  const [color, setColor] = useState('')
  const { editModalOpen, setEditModalOpen } = useContext(LayoutContext);
  const { editObject, threeObjects } = useContext(ThreeContext);

  const handleClose = () => {
    setEditModalOpen(false);
  };

  const handleChangeColor = (e: any) => {
    setColor(e.target.value)
  }

  const handleSubmitColor = (e:any) => {
      e.preventDefault();
    threeObjects.find((ob) => ob.uuid === editObject).material.color.set(color)
    setEditModalOpen(false);
    setColor('')
  }

  const body = (
    <div className={classes.paper}>
      <h2 id="editModalTitle">Edit an Object</h2>
      <Divider />
      <form onSubmit={handleSubmitColor}>
        <div>
            <InputLabel>Enter Color</InputLabel>
            <Input autoFocus type="text" onChange={handleChangeColor} value={color} name="color" />
        </div>
        <Button className={classes.button} type='submit'>Change</Button>
        </form>
    </div>
  );

  return (
      <Modal
        open={editModalOpen}
        onClose={handleClose}
        aria-labelledby="editModalTitle"
        aria-describedby="simple-modal"
      >
        {body}
      </Modal>
  );
}
