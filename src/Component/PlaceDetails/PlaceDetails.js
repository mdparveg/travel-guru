import React from 'react';
import { useParams } from 'react-router-dom';
import hotelDetails from '../../Fakedata/hotedetails'
import Hotel from '../Hotel/Hotel';

const PlaceDetails = () => {
    const { id } = useParams();
    const hotel = hotelDetails.filter(hd => hd.place === id);
    return (
        <div className="container row">
            <div className="col-md-6">
                {
                    hotel.map(room => <Hotel room={room}></Hotel>)
                }
            </div>
            <div className="col-md-6 map">
                <h1>GOOGle map</h1>
                <iframe
                    width="80%"
                    height="500"
                    scrolling="no"
                    async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAnG9wJ1Fnb99jpHw8V0i21g_N0VPFU4Nk&callback=initMap"                 
                ></iframe>
            </div>
        </div>
    );
};

export default PlaceDetails;