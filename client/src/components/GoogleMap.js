import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

const K_WIDTH=80;
const K_HEIGHT=80;
const stylesout = {
  position: 'absolute',
  width: K_WIDTH,
  height: K_HEIGHT,
  left: -K_WIDTH / 2,
  top: -K_HEIGHT / 2,

  border: '2px solid #f44336',
  borderRadius: K_HEIGHT,
  backgroundColor: 'rgba(100,45,25,0.3)',
}

const stylesinner = {

  position: 'absolute',
  width: 4,
  height: 4,
  left: -4 / 2,
  top: -4 / 2,

  border: '4px solid #f44336',
  borderRadius: 4,
  backgroundColor: 'rgba(100,45,25,0.3)',

}
const AnyReactComponent = ({ text }) => 
<div>
  <span style={stylesout}></span>
  <span style={stylesinner}></span>
  </div>;

//TODO use an api to get position of specified location.
const position = {
  lat: 43.653225,
  lng: -79.383186
}
const apikey = process.env.CHEF_MENU_GOOGLE_MAP;


class SimpleMap extends Component {

  static defaultProps = {
    center: {
      lat: position.lat,
      lng: position.lng
    },
    zoom: 13
  };
  
  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '100%', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={apikey}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          <AnyReactComponent
            lat={this.props.center.lat}
            lng={this.props.center.lng}
            
          />
        </GoogleMapReact>
      </div>
    );
  }
}

export default SimpleMap;