import { Avatar, Box, Grid, makeStyles, Tab, Tabs, Typography } from "@material-ui/core";
import { grey, teal } from "@material-ui/core/colors";
import React from "react";
import { variables } from "../../../utils/config";
import { ViewBooks } from "../ViewMain/ViewBooks/ViewBooks";
import { ViewReviews } from "../ViewMain/ViewReviews/ViewReviews";
import { ViewSettings } from "../ViewMain/ViewSettings/ViewSettings";


const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    backgroundColor: grey[200],
    display: 'flex',
    height: '100%',
    width: '100%',
    position: 'absolute'
    
  },
  tabs: {
    // borderRight: `1px solid ${orange[500]}`,
    backgroundColor: teal[200], 
    width: '270px', 
    height: 'calc(100% - 180px)', 
  },
  tab:{
    '&.MuiTab-root:nth-of-type(1)': { 
      marginTop: '30px'
    },
    '&.MuiTab-root': {
      fontSize: '16px'
    }
  },
  avatar:{
    margin: 'auto',
    height: '100px',
    width: '100px'
  }, 
  // '@global': {
  //   '.MuiGrid-root': {
  //     position: 'fixed', 
  //     height: '100%'
  //   }
  //}
});

interface TabPanelProps {
  children?: React.ReactNode;
  value: any;
  index: any
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
      style={{width: '100%'}}
    >
      {
        index === 0
        ?
        <ViewBooks />
        :
        index === 1
        ? 
        <ViewReviews />
        :
        index === 2
        ? 
        <ViewSettings />
        :
        <></>
      }
      
      
      
      
      
    </div>
  );
}

function a11yProps(index: any) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export const ViewSideBar = (params) => {
  const { tabs, root, tab, avatar } = useStyles();
  const { booksLabel, reviewsLabel, settingsLabel} = variables  


  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return(
    <div className={root}>        
      <Grid
        direction='row'
      >
        <Box style={{position: 'fixed', height: '100%'}}>
          <Box style={{height:'180px', width: '270px', backgroundColor: teal[200]}}>
            <Box style={{paddingTop: '50px'}}>
              <Avatar className={avatar}>
                <Typography variant='h3'>
                  NZ
                </Typography>
              
              </Avatar>
            </Box>
          </Box>
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={value}
            onChange={handleChange}
            aria-label="Vertical tabs example"
            className={tabs}
          >
            <Tab className={tab} label={booksLabel} {...a11yProps(0)} />
            <Tab className={tab} label={reviewsLabel} {...a11yProps(1)} />
            <Tab className={tab} label={settingsLabel} {...a11yProps(2)} />
          </Tabs>
        </Box>
      </Grid>
      <TabPanel value={value} index={0}>
        {booksLabel}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {reviewsLabel}
      </TabPanel>
      <TabPanel value={value} index={2}>
        {settingsLabel}
      </TabPanel>

     
    </div>
  )
};
