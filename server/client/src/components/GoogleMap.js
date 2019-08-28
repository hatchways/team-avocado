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

function SimpleMap(props){

    // props.center.lat = props.location.lat;
    return (
      <div style={{ height: '100%', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={props.apikey}
          center={props.location}
          zoom={props.zoom}
        >
          <AnyReactComponent
            lat={props.location.lat}
            lng={props.location.lng}
            
          />
        </GoogleMapReact>
      </div>
    );
  
}

// SimpleMap.defaultProps = {
//   center: {
//     lat: position.lat,
//     lng: position.lng
//   },
//   zoom: 13
// };

export default SimpleMap;
