import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import { InputLabel } from '@material-ui/core';
import ColorPicker from 'material-ui-color-picker';
import { ThreeContext } from '../context/Three';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
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

export default function PersistentDrawerRight() {
  const classes = useStyles();
  const { editObject, threeObjects } = useContext(ThreeContext);

  // const handleChangeColor = (newColor: any) => {
  //   setColor(newColor)
  //   console.log(color)
  // }

  const handleSubmitColor = (color:any) => {
    threeObjects.find((ob) => ob.uuid === editObject)?.material.color.set(color)
    // setEditModalOpen(false);
  }
  return (
    <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="right"
        open={true}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <List>
        <div>
          <InputLabel>Click to select color</InputLabel>
            {/* <Input autoFocus type="text" onChange={handleChangeColor} value={color} name="color" /> */}
          <ColorPicker
            defaultValue="#000"
            onChange={handleSubmitColor}
          />
        </div>
        </List>
      </Drawer>
  );
}
