import React, { Component } from 'react'
import { Map, GoogleApiWrapper } from 'google-maps-react';

const mapStyles = {
    width: '1000px',
    height: '1000px',
  };

class home extends Component {
    render(){
        return(
            <div>
            <p>Renewable Energy Dashboard</p>
            <Map
                google={this.props.google}
                zoom={8}
                style={mapStyles}
                initialCenter={{ lat: 47.444, lng: -122.176}}
            />
          </div>
        )
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyAsyLGrmG68jX6To64YSvfEkkyJ7oGuuuw'
  })(home);