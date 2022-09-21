import React from "react";

export default function Card({ name, image, types }) {
   return (
      <div>
         <div>
            <h4>{name}</h4>
         </div>
         <div>
            <img src={image} alt="flag" />
         </div>
         <h1>{types}</h1>
      </div>
   );
}