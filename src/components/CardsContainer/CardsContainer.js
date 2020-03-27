import React, { Component } from "react";
import "./CardsContainer.css";
import Area from "../Area/Area";


class CardsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedArea: ""
    };
  }

  render() {
    return (
      <section className="areas-card-container">
        {this.props.areas.map(area => {
          return <Area
            data-testid="card"
            about={area.about}
            id={area.id}
            key={area.id}
            shortName={area.area}
            longName={area.name}
          />
        })}
      </section>
    );
  }
}

export default CardsContainer;
