import React from "react";
import { render, fireEvent } from "@testing-library/react";
import ListingsContainer from "./ListingsContainer.js";
import "@testing-library/jest-dom";
import { BrowserRouter as Router } from "react-router-dom";

describe("ListingsContainer", () => {
  it("should render the container and cards", () => {
    const { getByTestId, getByText, getByAltText } = render(
      <Router>
        <ListingsContainer
          listingsData={[
            {
              name: "Eds Place",
              id: 1000,
              address: {
                street: "2250 Lawrence St",
                zip: "80205"
              }
            }
          ]}
          location={{
            pathname: 590
          }}
          pathname="/listings"
          favorites={[]}
        />
      </Router>
    );
    const containerEl = getByTestId("listing-container");
    const ListingsContainerHeaderEl = getByText("Listings");
    const listingCardEl = getByTestId("listing-card");
    const listingCardHeaderEl = getByText("Eds Place");
    const cardButtonEl = getByText("View");
    const cardImageEl = getByAltText("Eds Place");
    expect(containerEl).toBeInTheDocument();
    expect(ListingsContainerHeaderEl).toBeInTheDocument();
    expect(listingCardEl).toBeInTheDocument();
    expect(listingCardHeaderEl).toBeInTheDocument();
    expect(cardButtonEl).toBeInTheDocument();
    expect(cardImageEl).toBeInTheDocument();
  });
  it("should be able to render favorites", () => {
    const { getByText, getByAltText } = render(
      <Router>
        <ListingsContainer
          listingsData={[
            {
              name: "Eds Place",
              id: 1000,
              address: {
                street: "2250 Lawrence St",
                zip: "80205"
              }
            }
          ]}
          location={{
            pathname: 590
          }}
          pathname="/favorites"
          favorites={[1000]}
        />
      </Router>
    );
    const favoritesHeaderEl = getByText("Favorites");
    const cardNameEl = getByText("Eds Place");
    const viewButton = getByText("View");
    const imageEl = getByAltText("Eds Place");
    expect(favoritesHeaderEl).toBeInTheDocument();
    expect(cardNameEl).toBeInTheDocument();
    expect(viewButton).toBeInTheDocument();
    expect(imageEl).toBeInTheDocument();
  });
  it("should have clickable buttons on a card", () => {
    const mockAddDeleteFavorites = jest.fn();
    const { getByTestId, getByText, getByAltText } = render(
      <Router>
        <ListingsContainer
          listingsData={[
            {
              name: "Eds Place",
              id: 1000,
              address: {
                street: "2250 Lawrence St",
                zip: "80205"
              }
            }
          ]}
          location={{
            pathname: 590
          }}
          pathname="/favorites"
          favorites={[1000]}
          addDeleteFavorite={mockAddDeleteFavorites}
        />
      </Router>
    );
    fireEvent.click(getByTestId("favorite-btn"));
    fireEvent.click(getByText("View"));
  });
});
