import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { Link, useHistory, useParams } from 'react-router-dom';
import place from '../../Fakedata/place.json';
import './Place.css'

const Place = () => {
    
    const [spot, setSpot] = useState('');
    const { id } = useParams();
    const data = place.find(spot => spot.id.toString() === id)
    const history = useHistory()
    const handleAdd = () => {
        spot && history.push("/hotel/" + data.userId)
    }


    return (
        <div className="home">
            <div className="row container">
                <div className="col-md-6">
                    <h1 className="header">{data.name}</h1>
                    <p className="article">{data.description}</p>
                </div>
                <div className="col-md-6">
                    <form className="form" action="">
                        <label htmlFor="">Origin</label>
                        <Form.Control value={spot} onChange={(e)=> setSpot(e.target.value)} required type="text" />
                        <br />
                        <label htmlFor="">Destination</label>
                        <br />
                        <input placeholder="select your destination" className="form-control" type="text" required />
                        <br />
                        <div className="row">
                            <div className="col-md-6">
                                <label htmlFor="">From</label>
                                <br />
                                <input required type="date" />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="">To</label>
                                <br />
                                <input required type="date" />
                            </div>
                        </div>
                        <br />
                        <button className='button btn btn-warning' onClick={handleAdd} type='submit'>Start Booking</button>
                    </form>
                </div>
            </div>

        </div>
    );
};

export default Place;