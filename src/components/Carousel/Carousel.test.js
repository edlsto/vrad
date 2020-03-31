import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel.js";
import "@testing-library/jest-dom";
import { BrowserRouter as Router } from "react-router-dom";

describe("Carousel", () => {
  it("should render text and image we expect", () => {
    const { getByText, getByAltText } = render(
      <Router>
        <Carousel listing_id={66} />
      </Router>
    );

    const imageText = getByText("Photo 1 of 3");
    const image = getByAltText("66_A");
    expect(imageText).toBeInTheDocument();
    expect(image).toBeInTheDocument();
  });

  it("should change photos and text when arrow clicked", () => {
    const { getByText, getByAltText } = render(
      <Router>
        <Carousel listing_id={66} />
      </Router>
    );
    const rightArrow = getByAltText("right-arrow");
    fireEvent.click(rightArrow);
    const imageText = getByText("Photo 2 of 3");
    const image = getByAltText("66_B");
    expect(image).toBeInTheDocument();
    expect(imageText).toBeInTheDocument();
  });
});
