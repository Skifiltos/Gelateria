import React, { useState } from "react";
import Gelato from "./Gelato";
import axios from "axios";
import data from "../fakeData";

const url = "https://react--course-api.herokuapp.com/api/v1/data/gelateria";

const Menu = () => 
{

  // Loading State for data fetching
  const [isLoading, setIsLoading] = useState(true);

  // Error Handling State
  const [isError, setIsError] = useState(false);

  // Tutti i prodotti
  const [prodotti, setProdotti ] = React.useState();

  // Active BTN Selector
  const [selected, setSelected] = useState(0);

  // Products Filtered from the prodotti state
  const [filterProducts, setFilterProducts] = useState();

  // Categorie di prodotti
  const [categorie, setCategorie] = useState([]);
  
  // const categorie = Array.from(new Set(prodotti.map((el) => el.categoria)));
  // categorie.unshift ("all");

  const filterProdotti = (categoria, index) => 
  {
    setSelected(index);

    if (categoria === "all") 
    {
      setFilterProducts(prodotti);
    }
    else
    {
      setFilterProducts(
        prodotti.filter((el) => (el.categoria === categoria ? el : ""))
      );                                      
    }
  }

  React.useEffect(
    () => 
      {

      // Funzione Eseguita Immediatamente
        (async () => 
            {
                setIsLoading(true);
                setIsError(false);
                try
                {
                  const response = await axios.get(url);
                  setProdotti(response.data.data);
                  setFilterProducts(response.data.data);
                  console.log(response.data.data.default);

                  // Categorie Array
                  const nuoveCategorie = Array.from(
                    new Set(response.data.data.map((el) => el.categoria))
                  );

                  nuoveCategorie.unshift("all");


                  setCategorie(nuoveCategorie);
                  
                  setIsLoading(false);
                  setIsError(false);
                }
                catch (error) 
                {
                  console.log(error);
                  setIsLoading(false);
                  setIsError(true);
                }
            }
        )
        ();
      },[]
    );

  return (
    <div className="container">
     <h4 style={{texalign: "center", textTransform: "uppercase"}}>
      Le nostre scelte
      </h4>
      {
        !isLoading && !isError ? (
          <>
              <div className="lista-categorie">
                {
                  categorie.map((categoria, index) => 
                    {
                      return (
                          <button 
                            key={index} 
                            onClick={() => filterProdotti(categoria, index)}
                            className=
                            {
                              `btn btn-selector $
                              {
                                index === selected && "active"
                              }`
                            }
                          >
                          {categoria}
                        </button>
                      );
                    }
                  )
                
                }
              </div>
              <div className="vetrina">
              {
                filterProducts.map((el) => (
                    <Gelato key={el.id} {...el} />
                  )
                )
              }
            </div>
          </>
        ) : !isLoading && isError  ? (
          <h4
            style=
            {
              {
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)"
              } 
            }
          >
          Error...
          </h4> 
        ) : (
          <h4 
            style=
            {
              {
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)"
              }
            }
          >
          Loading...
          </h4>
        )
      }
  </div>
  );
};


export default Menu;
