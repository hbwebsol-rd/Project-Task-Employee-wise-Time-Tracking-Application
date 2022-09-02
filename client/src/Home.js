import React from 'react'
import RenderPage from './components/RenderPage';
import Header from './layout/Header'
import Sidebar from './layout/Sidebar'
import { useStyles } from './views/view-css';


const Home = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
          <aside style={{width:'80px'}} >
            <Sidebar />
          </aside>
          <div className={classes.main} >
            <Header/>
            <RenderPage/>
          </div>
    </div>
  )
}

export default Home