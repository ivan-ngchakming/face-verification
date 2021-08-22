import { Button, Container, Grid, Typography } from "@material-ui/core";
import axios from "axios";
import React from "react";
import ImageUploader from './components/ImageUploader';
import Nav from "./components/Nav";
import CircularProgressWithLabel from "./components/CircularProgressWithLabel";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      img1: null,
      img2: null,
      result: null,
    };
  }

  setImage = (img, idx) => {
    if (idx === 0) {
      this.setState({img1: img, result: null})
    } else if (idx == 1) {
      this.setState({img2: img, result: null})
    } else {
      console.error("Set Image index out of range")
    }
  }

  verify = () => {
    const formData = new FormData();
    formData.append("file1", this.state.img1, this.state.img1.name);
    formData.append("file2", this.state.img2, this.state.img2.name);
    axios.post('/api/verify', formData).then(res => {
      console.debug(res.data);
      this.setState({result: res.data})
    }).catch(err => {
      console.error(err)
    })
  }

  render() {
    const { img1, img2, result } = this.state;
    return (
      <React.Fragment>
        <Nav />
        <Container maxWidth="lg" style={{marginTop: '50px'}}>
          <Grid container spacing={3}>
            <Grid item xs={5}>
              <ImageUploader onLoad={(img) => {this.setImage(img, 0)}} />
            </Grid>
            <Grid item xs={2} style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
              <div style={{display: 'inline-flex', flexDirection: 'column', alignItems: 'center'}}>
                { result ? (
                  <React.Fragment>
                    <CircularProgressWithLabel size={70} value={Math.round(result.score * 100)} />

                    <Typography variant="h6" style={{marginTop: '50px'}}>
                      {`${Math.round(result.score * 100)}% Match`}
                    </Typography>
                  </React.Fragment>
                ): (
                  <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={this.verify}
                    disabled={ !img1 || !img2 }
                  >
                    Submit
                  </Button>
                )}
                
              </div>
            </Grid>
            <Grid item xs={5}>
              <ImageUploader onLoad={(img) => {this.setImage(img, 1)}} />
            </Grid>
          </Grid>
        </Container>
      </React.Fragment>
    );
  }
}

export default App;
