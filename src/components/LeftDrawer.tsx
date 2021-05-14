import React, {useContext} from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import AddIcon from '@material-ui/icons/Add';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { LayoutContext } from '../context/Layout'
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

export default function PersistentDrawerLeft() {
  const classes = useStyles();
  const theme = useTheme();
//   const [open, setOpen] = React.useState(true);
  const { leftDrawerOpen, setLeftDrawerOpen, setEditModalOpen, setModalOpen } = useContext(LayoutContext);
  const { threeObjects, setEditObject } = useContext(ThreeContext);
  let boxCount = 0;
  let sphereCount = 0;

  const handleDrawerClose = () => {
    setLeftDrawerOpen(false);
  };

  const handleEditModalOpen = (e: any) => {
    e.target && setEditObject(e.target.parentElement.parentElement.id)
    // console.log(e.target.parentElement.parentElement.id)
    setEditModalOpen(true);
  }
  
  const handleModalOpen = (e: any) => {
    setModalOpen(true);
  }

  return (
    <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={leftDrawerOpen}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem button onClick={handleModalOpen} >
            <ListItemIcon> <AddIcon /> </ListItemIcon>
            <ListItemText primary="Add Object" />
          </ListItem>
        </List>
        <Divider />
        <List>
          {
            threeObjects.length > 0 && threeObjects.map((obj) => {
              let num;
              if(obj.geometry.type === 'BoxGeometry'){num = ++boxCount}
              if(obj.geometry.type === 'SphereGeometry'){num = ++sphereCount}
              return (
              <ListItem button key={obj.uuid} id={obj.uuid} onClick={handleEditModalOpen} >
                <ListItemText primary={obj.geometry.type+' '+num} />
              </ListItem>
            )})
          }
        </List>
      </Drawer>
  );
}
