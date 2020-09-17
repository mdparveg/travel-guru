import React from 'react';
import { useParams } from 'react-router-dom';
import hotelDetails from '../../Fakedata/hotedetails'
import Hotel from '../Hotel/Hotel';

const PlaceDetails = () => {
    const {id} = useParams();
    const hotel = hotelDetails.filter(hd => hd.place === id);
    return (
        <div className="container row">
            <div className="col-md-6">
                {
                    hotel.map(room => <Hotel room={room}></Hotel>)
                }
            </div>
            <div className="col-md-6">
                <h1>GOOGle map</h1>
            </div>
        </div>
    );
};

export default PlaceDetails;