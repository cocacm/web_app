import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
//import fetch from "isomorphic-fetch";
import { compose, withProps, lifecycle, withStateHandlers  } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";

import MarkerClusterer from "react-google-maps/lib/components/addons/MarkerClusterer";
const sensors = [
  {sensorId:0, onfire:false, lat:34.399300, long:-118.570800},
  {sensorId:1, onfire:false, lat:34.399350, long:-118.570850},
  {sensorId:2, onfire:false, lat:34.3993900, long:-118.570900}
]
const MapWithAMarkerClusterer = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
}),
  // withStateHandlers(() => ({
  //   isOpen: true
  // })),
  withScriptjs,
  withGoogleMap,
  lifecycle({
    componentWillMount() {
      this.setState({ markers: [] })
    },

    componentDidMount() {
      const url = [
        // Length issue
        `https://gist.githubusercontent.com`,
        `/farrrr/dfda7dd7fccfec5474d3`,
        `/raw/758852bbc1979f6c4522ab4e92d1c92cba8fb0dc/data.json`
      ].join("")
      let i = 0;
      let lastFire = false;
      // fetch(url)
      //   .then(res => res.json())
      //   .then(data => {
      //     this.setState({ markers: data.photos });
      //   });
        window.setInterval( () => {
          sensors[i].onFire = !sensors[i].onFire;
          sensors[i].lastTime = Date.now()
          fetch('sensor-data/'+i, {
            method:'post',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body:JSON.stringify(sensors[i])
          })
          .then( res => res.json() )
          .then(function( data ){})
          lastFire = !lastFire;
          i++
          if(i>2)i=0;
          fetch('sensor-data')
          .then( res => res.json() )
          .then( data => {console.log(data);this.setState({ markers: data });})
        }, 3000)
    }
  })
)(props =>
  <GoogleMap
    defaultZoom={18}
    defaultCenter={{ lat: 34.399350, lng: -118.570800 }}
  >
    <MarkerClusterer
      averageCenter
      enableRetinaIcons
      gridSize={60}
    >
      {props.markers.map(marker => (
        <Marker
          key={marker.sensorId}
          position={{ lat: marker.lat, lng: marker.long }}
          labelStyle={marker.onFire?{color:'#f44336', paddingBottom:'10px'}:{color:'#2196f3', paddingBottom:'10px'}}
        >
        <InfoWindow>
          <p>{marker.onFire ? 'Fire detected on: ' + marker.lastTime : 'Fire extinguished on: ' + marker.lastTime}</p>
        </InfoWindow>
      </Marker>
      ))}
    </MarkerClusterer>
  </GoogleMap>
);

class App extends Component {
  render() {
    return (
      <MapWithAMarkerClusterer />
    );
  }
}

export default App;
