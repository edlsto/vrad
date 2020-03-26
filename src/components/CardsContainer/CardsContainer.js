import React from "react";
import "./CardsContainer.css";
import Area from "../Area/Area";

const CardsContainer = ({ areas }) => {
  return(
    <section data-testid="card-container" className="page-body">
      <h2>Please Select An Area</h2>
      <section className="card-container">
        {areas.map(area => {
          return <Area
            data-testid={"card"}
            about={area.about}
            id={area.id}
            key={area.id}
            shortName={area.area}
            location={area.location}
            longName={area.name}
            quickSearch={area.quick_search}
            regionCode={area.region_code}
            listings={area.listings}
          />
        })}
      </section>
    </section>
  )
}

export default CardsContainer