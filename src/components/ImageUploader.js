import React, { useState, useCallback } from 'react';
import {useDropzone} from 'react-dropzone';
import { makeStyles } from '@material-ui/core/styles';
import { IconButton } from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import ImageAnnotator from './ImageAnnotator';

const useStyles = makeStyles((theme) => ({
  imgPreviewWrapper: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '5%'
  },
  imgPreviewDiv: {
    display: 'inline-block',
    position: 'relative',
  },
  imgPreview: {
    maxHeight: '50vh',
    maxWidth: '50vh',
    borderRadius: "1%",
  },
  closeImgBtn: {
    position: 'absolute',
    top: '-3%',
    right: '-5%',
    background: theme.palette.white,
    '&:hover': {
      background: theme.palette.white,
      color: "#f00",
   },
  },
  dropzone: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#eeeeee',
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    color: '#bdbdbd',
    outline: 'none',
    transition: 'border .24s ease-in-out',
    "&:hover": {
      cursor: "pointer"
    },
    minHeight: '50vh',
  }
}));


export default function ImageUploader({onLoad}) {
  const classes = useStyles();
  const [image, setImage] = useState(null);

  const onDrop = useCallback(acceptedFiles => {
    console.debug("File received", acceptedFiles);
    const file = acceptedFiles[0];
    const imgURLObj = URL.createObjectURL(file);
    setImage(imgURLObj);
    onLoad(file);
  }, [])
  
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  const clearImgFile = () => {
    setImage(null);
    onLoad(null);
  }

  return (
    <div className="container">
      { !image ? (
        <div className={classes.dropzone} {...getRootProps()}>
          <input {...getInputProps()} />
          <p>Drop Image File Here</p>
        </div>
      ): (
        <div className={classes.imgPreviewWrapper}>
          <div className={classes.imgPreviewDiv}>
            <ImageAnnotator src={image} faceLocations={[[0, 0, 0, 0, 0, 0]]}/>
            {/* <img alt="Preview of user uploaded file" className={classes.imgPreview} src={image} /> */}

            <IconButton onClick={clearImgFile} size="small" className={classes.closeImgBtn}>
              <ClearIcon />
            </IconButton>
          </div>
        </div>
      )}

    </div>
  )
}
