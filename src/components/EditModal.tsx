import React, { useContext, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Divider, Box, InputLabel, Button } from '@material-ui/core';
import ColorPicker from 'material-ui-color-picker'


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
  }
}));

export default function SimpleModal() {
  const classes = useStyles();
  const [color, setColor] = useState("#000");
  const { editModalOpen, setEditModalOpen } = useContext(LayoutContext);
  const { editObject, threeObjects } = useContext(ThreeContext);

  const handleClose = () => {
    setEditModalOpen(false);
  };

  const handleChangeColor = (newColor: any) => {
    setColor(newColor)
    console.log(color)
  }

  const handleSubmitColor = (e:any) => {
    e.preventDefault();
    threeObjects.find((ob) => ob.uuid === editObject)?.material.color.set(color)
    setEditModalOpen(false);
  }

  const body = (
    <div className={classes.paper}>
      <h2 id="editModalTitle">Edit an Object</h2>
      <Divider />
        <div>
          <InputLabel>Click to select color</InputLabel>
            {/* <Input autoFocus type="text" onChange={handleChangeColor} value={color} name="color" /> */}
          <ColorPicker
            defaultValue="#000"
            value={color}
            onChange={handleChangeColor}
          />
        </div>
        <Box display="flex" justifyContent="flex-end">
          <Button className={classes.button}  onClick={handleSubmitColor}>Change</Button>
        </Box>
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
