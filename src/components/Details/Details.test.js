import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Details from "./Details.js";
import "@testing-library/jest-dom";
import { BrowserRouter as Router } from "react-router-dom";

describe("Details", () => {
  it("should render what we expect", () => {
    const { getByText, getByAltText } = render(
      <Router>
        <Details
          selectedListing={{
            listing_id: 3,
            area_id: 590,
            name: "Hip RiNo Party Spot",
            address: {
              street: "2250 Lawrence St",
              zip: "80205"
            },
            details: {
              neighborhood_id: 5124122,
              superhost: true,
              seller_source: "91jss1",
              beds: 3,
              baths: 2.5,
              cost_per_night: 420,
              features: ["hot tub"]
            },
            dev_id: "u4gh2j",
            area: "rino",
            db_connect: 834470
          }}
          favorites={[]}
        />
      </Router>
    );

    const nameEl = getByText("Hip RiNo Party Spot");
    const addressEl = getByText("2250 Lawrence St 80205");
    const favoriteBtnEl = getByText("Favorite");
    const bedsCountEl = getByText("3");
    const bedsTextEl = getByText("beds");
    const bathscountEl = getByText("2.5");
    const bathTextEl = getByText("baths");
    const costEl = getByText("$420");
    const nightTextEl = getByText("/night");
    const featuresHeaderEl = getByText("Features");
    const getFeatureEl = getByText("Hot tub");
    const imageEl = getByAltText("3_A");

    expect(nameEl).toBeInTheDocument();
    expect(addressEl).toBeInTheDocument();
    expect(favoriteBtnEl).toBeInTheDocument();
    expect(bedsCountEl).toBeInTheDocument();
    expect(bedsTextEl).toBeInTheDocument();
    expect(bathscountEl).toBeInTheDocument();
    expect(bathTextEl).toBeInTheDocument();
    expect(costEl).toBeInTheDocument();
    expect(nightTextEl).toBeInTheDocument();
    expect(featuresHeaderEl).toBeInTheDocument();
    expect(getFeatureEl).toBeInTheDocument();
    expect(imageEl).toBeInTheDocument();
  });

  it("should be able to click andadd to favorites", () => {
    const mockAddDeleteFavorite = jest.fn();

    const { getByText } = render(
      <Router>
        <Details
          addDeleteFavorite={mockAddDeleteFavorite}
          selectedListing={{
            listing_id: 3,
            area_id: 590,
            name: "Hip RiNo Party Spot",
            address: {
              street: "2250 Lawrence St",
              zip: "80205"
            },
            details: {
              neighborhood_id: 5124122,
              superhost: true,
              seller_source: "91jss1",
              beds: 3,
              baths: 2.5,
              cost_per_night: 420,
              features: ["hot tub"]
            },
            dev_id: "u4gh2j",
            area: "rino",
            db_connect: 834470
          }}
          favorites={[]}
        />
      </Router>
    );

    fireEvent.click(getByText("Favorite"));

    expect(mockAddDeleteFavorite).toHaveBeenCalledWith(3);
  });
});
