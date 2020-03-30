import React, { Component } from "react";
import "./Carousel.css";
import left from "../../assets/left.png";
import right from "../../assets/right.png";

class Carousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentImageIndex: 0
    };
  }

  mod(n, m) {
    return ((n % m) + m) % m;
  }

  changeImage(e) {
    let { name } = e.target;
    console.log(name);
    const newIndex =
      name === "right"
        ? this.mod(this.state.currentImageIndex + 1, 3)
        : this.mod(this.state.currentImageIndex - 1, 3);
    this.setState({
      currentImageIndex: newIndex
    });
  }

  render() {
    const imageIds = ["A", "B", "C"];
    return (
      <section className="carousel">
        <img
          src={
            "../../../images/" +
            this.props.listing_id +
            "_" +
            imageIds[this.state.currentImageIndex] +
            ".jpg"
          }
          className="details-img"
          alt="A"
        />
        <div className="carousel-control">
          <div className="carousel-back" onClick={e => this.changeImage(e)}>
            <img
              src={left}
              alt=""
              className="control-item"
              name="left"
              onClick={e => this.changeImage(e)}
            />
          </div>
          <div>
            <p className="image-number">
              Photo {this.state.currentImageIndex + 1} of 3
            </p>
          </div>
          <div className="carousel-forward" onClick={e => this.changeImage(e)}>
            <img src={right} alt="" className="control-item" name="right" />
          </div>
        </div>
      </section>
    );
  }
}

export default Carousel;
