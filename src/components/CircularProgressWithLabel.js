import { Box, Typography } from "@material-ui/core";
import CircularProgress from '@material-ui/core/CircularProgress';
import React, { useState, useEffect } from "react";

export default function CircularProgressWithLabel(props) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      if (value < Math.round(props.value)) {
        setValue((prevValue) => (prevValue + Math.round((props.value - value) / 2)));
      } 
    }, 10)

    return () => {
      clearInterval(timer);
    };
  }, [value])

  useEffect(() => {
    console.debug('props.value', props.value)
    if (value !== Math.round(props.value)) {
      setValue(0);
    }
  }, [props.value])
  
  return (
    <Box position="relative" display="inline-flex">
      <CircularProgress variant="determinate" {...props} value={value} />
      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Typography variant="caption" component="div" color="textSecondary">{`${Math.round(
          value,
        )}%`}</Typography>
      </Box>
    </Box>
  );
}