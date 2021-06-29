import { Box, Grid, makeStyles } from "@material-ui/core";
import React from "react";
import { ViewSideBar } from "./ViewSideBar/ViewSideBar";

const useStyle = makeStyles({
  root:{
    top: 0,
    left: 0,
    position: 'absolute',
    height: '100%',
    width: '100%'

  }
})

export const ViewHome = () => {

  const { root } = useStyle()

  return (
    <>
      <Grid 
        container
        className={root}
      >
        <Box>
          <ViewSideBar />
        </Box>
      </Grid>
    </>
  )
}