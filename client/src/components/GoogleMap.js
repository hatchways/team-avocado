import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper, Circle} from 'google-maps-react';
 
function GoogleMap(props) {

    const style = {
      width: "70%",
      height: "48%",
      position: 'relative'
    }
    const coords={lat:props.location.lat,lng:props.location.lng};
    return (
      <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>

        <Map style={style} google={props.google} zoom={13} center={coords}>
        <Circle
          radius={1200}
          center={{lat:props.location.lat,lng:props.location.lng}}
          strokeColor='transparent'
          strokeOpacity={0}
          strokeWeight={5}
          fillColor='#f44336'
          fillOpacity={0.2}
        />
        <Circle
          radius={50}
          center={{lat:props.location.lat,lng:props.location.lng}}
          strokeColor='transparent'
          strokeOpacity={0}
          strokeWeight={5}
          fillColor='#f44336'
          fillOpacity={0.8}
        />
        </Map>
      </div>
    );
  
}
 
export default GoogleApiWrapper({
  apiKey: "AIzaSyCxK8n6vXbRPszhiEJhbo5x9tNejni4qSU",
})(GoogleMap)



