import React from 'react';
import star from '../Resource/Icon/star_1_.png'

const Hotel = (props) => {
    const {name, cost, rattingNumber, description, comfort, bed, bedrooms, bathrooms, image, guests, ratting} = props.room
    return (
        
        <div className=" container row mb-4">
            <div className="col-md-6">
               <img style={{width: '200px', height: '200px', borderRadius: '10px'}} src={image} alt=""/>
            </div>
            <div className="col-md-6">
               <h5>{name}</h5>
               <p>{guests} guests {bed} beds {bedrooms} bedrooms {bathrooms} baths</p>
               <p><small>{description}</small></p>
               <p><small>{comfort}</small></p>
               <h6>Cancellation fexibility availiable</h6>
               <div className="row">
                   <div className="col-md-6" style={{display: 'flex'}}>
                       
                       <img style={{width: '18px', height: '18px'}} src={star} alt=""/>
                       
                       <h6 className="ml-2">{ratting} (<span>{rattingNumber}</span>)</h6>
                   </div>
                   <div className="col-md-6">
                       <p>${cost} / <small>night</small></p>
                   </div>
               </div>
            </div>
        </div>

 
    );
};

export default Hotel;