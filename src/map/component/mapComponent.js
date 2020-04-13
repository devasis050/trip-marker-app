import React from 'react';
// import {Map, GoogleApiWrapper, Marker} from 'google-maps-react';
import { connect } from 'react-redux';
import GoogleMapReact from 'google-map-react';
import Axios from 'axios';
import { getApiKeyUrl } from '../../util/url';
import { createAddApiKeyAction } from '../action/markerAction';
// import MarkerComponent from './markerComponent';

class MapComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.markers = [];
        this.routes = [];
    }

    componentDidMount() {
        Axios.post(getApiKeyUrl()).then(res => {
            this.props.dispatch(createAddApiKeyAction(res.data));
        });
    }

    loadDirection() {

        const {maps, map} = this.state;
        let directionsService = new maps.DirectionsService();
        const fromId = this.props.direction.fromId;
        const toId = this.props.direction.toId;
        let fromPlace = this.props.markerPlaces.find(markerPlace => markerPlace.placeId === fromId);
        let toPlace = this.props.markerPlaces.find(markerPlace => markerPlace.placeId === toId);

        if (fromPlace && toPlace) {
            directionsService.route({
                origin: fromPlace.location,
                destination: toPlace.location,
                travelMode: maps.TravelMode.DRIVING
            }, (response, status) => {
                if (status === 'OK') {
                    const route = new google.maps.Polyline({
                        path: response.routes[0].overview_path,
                        strokeWeight: 5,
                        strokeOpacity: 0.5,
                        strokeColor: 'blue',
                    });
                    route.setMap(map);
                    this.routes.push(route);
                } else {
                    console.log('Directions request failed due to ' + status);
                }
            });
        }

    }

    componentDidUpdate() {
        if(this.state.maps && this.props.markerPlaces.length > 0) {
            this.onMapLoaded();
            this.loadDirection();
        }
    }

    onMapLoaded() {
        const {maps, map} = this.state;
        this.props.markerPlaces.map((markerPlace, index) => {
            this.markers.push(new google.maps.Marker({
                position: markerPlace.location,
                map: map,
                title: ''+index,
                label: ''+index
            }));
        });
        const bounds = new maps.LatLngBounds();
        this.props.markerPlaces.map(markerPlace => {
            bounds.extend(markerPlace.location);
        });
        map.fitBounds(bounds)
    }

    clearMarker() {
        this.markers.forEach(marker=> marker.setMap(null));
        this.markers = [];
        this.routes.forEach(route=> route.setMap(null));
        this.routes = [];
    }

    render() {
        const mapStyles = {
            width: '95%',
            height: '95%',
          };

        this.clearMarker();
        
        return (
            this.props.API_KEY ? (<div>
                <GoogleMapReact
                    bootstrapURLKeys={{
                        key: this.props.API_KEY, 
                        language: 'en'
                    }}
                    style= {mapStyles}
                    defaultCenter ={{lat: 12.9716, lng: 77.5946}}
                    zoom={5}
                    yesIWantToUseGoogleMapApiInternals={true}
                    onGoogleApiLoaded={({maps, map})=> this.setState({maps, map})}
                >
                    
                </GoogleMapReact>
            </div>) : (<div style={mapStyles} className='text-center pt-5'>Map loading..</div>)
        )
    }
}

function mapStateToProps(state) {
    return {
        markerPlaces: state.markers, 
        direction: state.direction,
        API_KEY: state.apiKey
    }
}

const ConnectedMapComponent = connect(mapStateToProps)(MapComponent)

export default ConnectedMapComponent;
