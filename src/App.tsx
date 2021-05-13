import React, { useContext, useEffect } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';

import './App.css';
import LeftDrawer from './components/LeftDrawer'
import { LayoutContext, LayoutProvider } from './context/Layout';
import AppBarComponent from './components/AppBar';
import Main from './components/Main';
import { ThreeProvider } from './context/Three';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },  
}));

function App() {
  const classes = useStyles();

  const { leftDrawerOpen } = useContext(LayoutContext)

  // useEffect(() => {
  //   console.log(leftDrawerOpen);
  // })

  return (
    <LayoutProvider>
      <ThreeProvider>
      <div className={classes.root}>
        <CssBaseline />
        <AppBarComponent />      
        <LeftDrawer />
        <Main />
      </div>
      </ThreeProvider>
    </LayoutProvider>
  );
}

export default App;
