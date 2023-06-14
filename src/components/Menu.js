import React, { useState } from "react";
import Gelato from "./Gelato";
import axios from "axios";
import data from "../fakeData";

const url = "https://react--course-api.herokuapp.com/api/v1/data/gelateria";

const Menu = () => {

  const [prodotti, setProdotti ] = React.useState(data);
  
  const categorie = Array.from(new Set(prodotti.map((el) => el.categoria)));

  categorie.unshift ("all");

  return <div className="container">
    <h4 style={{texalign: "center", textTransform: "uppercase"}}>
      Le nostre scelte
    </h4>
    <div className="lista-categorie">
      {
        categorie.map((categoria, index) => {
          return <button key={index} className="btn btn-selector">
            {categoria}
          </button>
        })
      }
    </div>

    <div className="vetrina">
      {
        prodotti.map((el) => (
          <Gelato key={el.id} {...el} />
        ))
      }
    </div>

  </div>;
};

export default Menu;
