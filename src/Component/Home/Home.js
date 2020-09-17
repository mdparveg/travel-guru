import React, { useEffect, useState } from 'react';
import './Home.css'
import place from '../../Fakedata/place.json'
import { Link } from 'react-router-dom';



const Home = () => {
    const [areaInfo, setAreaInfo] = useState(place);



    return (
        <div className="home">


            <div className="row container body">
                <div className="col-5">
                    <h1>COX'S BAZAR</h1>
                    <p>Cox's Bazar is a city, fishing port, tourism centre and district headquarters in southeastern Bangladesh. It is famous mostly for its long natural sandy beach, and it ...</p>
                   <button className="btn btn-warning">Booking &#8594;</button>
                </div>
                <div className="col-7 p-4 d-flex ">
                    {
                        areaInfo.map(place => {
                            return (
                                <Link to={`/place/${place.id}`} > <div className="card cox" style={{ width: '18rm' }}>

                                <h1>{place.name}</h1>
                              </div></Link>
                            )
                        })
                    }
                {/* <Link to={`/place/${id}}`} > <div className="card cox" style={{ width: '18rm' }}>

                      <h1>COX'S BAZAR</h1>
                    </div></Link>
                    <Link to={`/place/${id}`} >  <div className="card srimangal" style={{ width: '18rm' }}>

                        <h1>Sreemangal</h1>
                    </div></Link>
                    <Link to={`/place/${id}`} >  <div className="card sundorbon" style={{ width: '18rm' }}>
                        <h2>Sundarban</h2>
                    </div></Link> */}
                </div>
            </div>
        </div>
    );
};

export default Home;