

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tab from '@material-ui/core/Tab';
import TabContext from '@material-ui/lab/TabContext';
import TabList from '@material-ui/lab/TabList';
import TabPanel from '@material-ui/lab/TabPanel';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function NavTabs() {
    const history=useHistory()
  const classes = useStyles();
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <TabContext value={value}>
        <AppBar position="static">
          <TabList onChange={handleChange} aria-label="simple tabs example">
            <Tab label="Generate ShortUrl" value="1" onClick={()=>{history.push("/homepage")}}/>
            <Tab label="All Urls" value="2" onClick={()=>{history.push("/allUrls")}}/>
            <Tab label="Month Report" value="3" onClick={()=>{history.push("/appUsage")}}/>
            <Button variant="contained" color="secondary" style={{marginLeft:"auto"}} onClick={()=>{history.push("/")}}>
              Logout
            </Button>
          </TabList>
        </AppBar>
      </TabContext>
    </div>
  );
}



