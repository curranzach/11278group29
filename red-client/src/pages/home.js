import React, { Component } from 'react';
import { Map, Circle, Marker, InfoWindow, GoogleApiWrapper } from 'google-maps-react';
// CSS
import './home.css';
// MUI
import { Typography, FormControlLabel, FormGroup, Checkbox } from '@material-ui/core';

const mapStyles = {
    width: '74.8%',
    height: '800px'
  };

class home extends Component {
    render(){
      const coords = { lat: 29.652, lng: -82.325 };
        return(
        <div id = "parent">
            <div class="col">
              <Map
                google={this.props.google}
                zoom={5}
                style={mapStyles}
                initialCenter={{ lat: 38.570, lng: -96.86}}
              >
                <Circle
                  radius={20000}
                  center={coords}
                  onMouseover={() => console.log('mouseover')}
                  onClick={() => console.log('click')}
                  onMouseout={() => console.log('mouseout')}
                  strokeColor='transparent'
                  strokeOpacity={0}
                  strokeWeight={5}
                  fillColor='#FF0000'
                  fillOpacity={0.2}
                />
                <Circle
                  radius={40000}
                  center={{lat: 34.447, lng: -85.328}}
                  onMouseover={() => console.log('mouseover')}
                  onClick={() => console.log('click')}
                  onMouseout={() => console.log('mouseout')}
                  strokeColor='transparent'
                  strokeOpacity={0}
                  strokeWeight={5}
                  fillColor='#0000FF'
                  fillOpacity={0.2}
                />
              </Map>
            </div>
            <div class = "col">
              <Typography>Filter</Typography>
              <FormGroup>
                <FormControlLabel control={<Checkbox color="secondary"/>} label="Solar" />
                <FormControlLabel control={<Checkbox />} label="Wind" />
              </FormGroup>
            </div>
        </div>
        )
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyAsyLGrmG68jX6To64YSvfEkkyJ7oGuuuw'
  })(home);
