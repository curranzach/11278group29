import React, { Component } from 'react';
import axios from 'axios';
import { Map, Circle, Marker, GoogleApiWrapper } from 'google-maps-react';
// CSS
import './home.css';
// MUI
import { Typography, FormControlLabel, FormGroup, Checkbox, CircularProgress, Slider } from '@material-ui/core';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide } from '@material-ui/core';

const mapStyles = {
    width: '70vw',
    height: '700px'
  };

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

class home extends Component {
  _isMounted = false;
  constructor(props){
    super(props);
    this.state = {
      // Initial Loading  
      loading: true,
      loadingWt: true,
      loadingWn: true,
      loadingS: true,
      // Data Arrays
      dataS: null,
      dataWn: null,
      dataWt: null,
      // Toggles
      solar: false,
      wind: false,
      water: false,
      selectedCounty: null,
      // Display Data
      displayS: null,
      displayWn: null,
      displayWt: null,
      // Tutorial
      tutOpen: false
    }
  }
  componentDidMount = () => {
    this._isMounted = true;
    this.setState({ loading: true }, () => {
      axios.get('/getWater')
        .then(response => this.setState({
          loadingWt: false,
          dataWt: [...response.data],
          displayWt: [...response.data]
        }));
      axios.get('/getWind')
        .then(response2 => this.setState({
          loadingWn: false,
          dataWn: [...response2.data],
          displayWn: [...response2.data]
        }));
      axios.get('/getSolar')
        .then(response3 => this.setState({
          loadingS: false,
          dataS: [...response3.data],
          displayS: [...response3.data]
        }));
      })
  }
    componentWillUnmount() {
      this._isMounted = false;
    }
    render(){
      const {loading, dataWt, dataWn, dataS, displayWt, displayWn, displayS, loadingS, loadingWn, loadingWt, selectedCounty} = this.state;
      if(loading) {
        if(!loadingS && !loadingWn && !loadingWt) {
          this.setState({loading: false});
        }
      }
        return(
        <div id = "parent">
            {loading && 
            <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', width: '200vh', height: '50vh'}}>
              <CircularProgress 
                  size={80}
                  color="primary"
              />
            </div>}
            {!loading && <div class="col">
              <Map
                google={this.props.google}
                zoom={5}
                style={mapStyles}
                initialCenter={{ lat: 38.570, lng: -96.86}}
                options={{ 
                  fullscreenControl: false,
                  mapTypeControlOptions: {mapTypeIds: []}
                }}
              >
              { // Water Icons
              displayWt.map(county => (
              <Marker
                icon={'water.png'}
                position={{ lat: county.lat, lng: county.lon }}
                visible={this.state.water}
                onClick={() => {
                  this.setState({selectedCounty: county})
                }}
              />
              ))}
              { // Water Circles
              displayWt.map(county => (
              <Circle
                center={{ lat: county.lat, lng: county.lon }}
                radius={parseFloat(county.area)}
                strokeOpacity={0}
                fillColor={"#0000FF"}
                fillOpacity={.40}
                visible={this.state.water}
              />
              ))}
              { // Wind Icons
              displayWn.map(county => (
              <Marker
                icon={'wind.png'}
                position={{ lat: county.lat, lng: county.lon }}
                visible={this.state.wind}
                onClick={() => {
                  this.setState({selectedCounty: county})
                }}
              />
              ))}
              { // Wind Circles
              displayWn.map(county => (
              <Circle
                center={{ lat: county.lat, lng: county.lon }}
                radius={parseFloat(county.area)}
                strokeOpacity={0}
                fillColor={'#234F1E'}
                fillOpacity={.40}
                visible={this.state.wind}
              />
              ))}
              { // Solar Icons
              displayS.map(county => (
              <Marker
                icon={'solar.png'}
                position={{ lat: county.lat, lng: county.lon }}
                visible={this.state.solar}
                onClick={() => {
                  this.setState({selectedCounty: county})
                }}
              />
              ))}
              { // Solar Circles
              displayS.map(county => (
              <Circle
                center={{ lat: county.lat, lng: county.lon }}
                radius={parseFloat(county.area)}
                strokeOpacity={0}
                fillColor={'#FF0000'}
                fillOpacity={.40}
                visible={this.state.solar}
              />
              ))}
              </Map>
            </div>}
            {!loading && <div class = "col">
            <div>
              <Button variant="outlined" color="secondary" onClick={e=>{this.setState({tutOpen: true})}}>
                Tutorial
              </Button>
              <Dialog
                open={this.state.tutOpen}
                TransitionComponent={Transition}
                keepMounted
                onClose={e=>{this.setState({tutOpen: false})}}
                aria-describedby="alert-dialog-slide-description"
              >
                <DialogTitle>{"Welcome to the Renewable Energy Dashboard!"}</DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-slide-description">
                  This dashboard utilizes historic climate data to predict the best locations for renewable
                  energy plants. Toggle the filter boxes to select the type of renewable energy. Drag the slider
                  to select the number of locations to display per energy type. Click on a marker to see more information
                  about the area.
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={e=>{this.setState({tutOpen: false})}}>Got It</Button>
                </DialogActions>
              </Dialog>
            </div>
            <Typography color="primary">_</Typography>
            <Typography>Filter</Typography>
              <FormGroup>
                <FormControlLabel control={<Checkbox color="secondary"/>} label="Solar" checked={this.state.solar}
                  onChange={e => {
                    this.setState({solar: !this.state.solar});
                  }}
                />
                <FormControlLabel control={<Checkbox />} label="Wind" checked={this.state.wind}
                  onChange={e => {
                    this.setState({wind: !this.state.wind});
                  }}
                />
                <FormControlLabel control={<Checkbox />} label="Water" checked={this.state.water}
                  onChange={e => {
                    this.setState({water: !this.state.water});
                  }}
                />
              </FormGroup>
              <Typography color="primary">_</Typography>
              <Typography># Locations</Typography>
              <Slider
                aria-label="Temperature"
                defaultValue={500}
                valueLabelDisplay="auto"
                step={50}
                marks
                min={50}
                max={500}
                color="secondary"
                onChange={(e, val) => {
                  this.setState({
                    displayS: dataS.slice(0,val),
                    displayWn: dataWn.slice(0,val),
                    displayWt: dataWt.slice(0,val)
                  });
                }}
              />
            {selectedCounty && (this.state.solar||this.state.wind||this.state.water) && <div class="info">
              <p><b>Selected County</b></p>
              <p>
              <b>Name:</b> {selectedCounty.county},{selectedCounty.state}
              </p>
              <p> 
              <b>Population:</b> {selectedCounty.pop}
              </p>
              <p> 
              <b>Windspeed:</b> {selectedCounty.wind}(mph)
              </p>
              <p> 
              <b>DNI:</b> {selectedCounty.solar}
              </p> 
              <p> 
              <b>Water Area:</b> {selectedCounty.water}(sqmi)
              </p>  
            </div>}
            </div>}
        </div>
        )
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyAsyLGrmG68jX6To64YSvfEkkyJ7oGuuuw'
  })(home);
