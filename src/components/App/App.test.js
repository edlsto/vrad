import React from "react";
import { render, fireEvent, cleanup, waitFor } from "@testing-library/react";
import App from "./App";
import "@testing-library/jest-dom";
import { BrowserRouter as Router } from "react-router-dom";

import { getAllListings } from "../../helpers";
jest.mock("../../helpers.js");

afterEach(cleanup);

describe("App", () => {
  it("should render text for login", () => {
    const { getByText, getByPlaceholderText, getByTestId } = render(
      <Router>
        <App />
      </Router>
    );
    const title = getByText("VRAD");
    const subtitle = getByText("Vacation Rentals Around Denver");
    const nameLogin = getByPlaceholderText("Name");
    const emailLogin = getByPlaceholderText("Email");
    const reasonVisit = getByTestId("select");
    const login = getByTestId("header");

    expect(title).toBeInTheDocument();
    expect(subtitle).toBeInTheDocument();
    expect(nameLogin).toBeInTheDocument();
    expect(login).toBeInTheDocument();
    expect(emailLogin).toBeInTheDocument();
    expect(reasonVisit).toBeInTheDocument();
  });

  it("should show Nav Bar after successful login", () => {
    const { getByRole, getByPlaceholderText, getByTestId, getByText } = render(
      <Router>
        <App />
      </Router>
    );

    fireEvent.change(getByPlaceholderText("Name"), {
      target: { value: "Dan" }
    });
    fireEvent.change(getByPlaceholderText("Email"), {
      target: { value: "dreardon1021@gmail.com" }
    });
    fireEvent.change(getByTestId("select"), { target: { value: "business" } });

    fireEvent.click(getByRole("button"));
    const greeting = getByText("Hello, Dan");
    const tripType = getByText("Trip type: business");
    const favoritesBtn = getByText("Favorites (0)");

    expect(greeting).toBeInTheDocument();
    expect(tripType).toBeInTheDocument();
    expect(favoritesBtn).toBeInTheDocument();
  });

  it("should show areas after successful login", async () => {
    const { getByText } = render(
      <Router>
        <App />
      </Router>
    );

    const areaName = await waitFor(() => getByText("RiNo"));
    const rinoText = await waitFor(() =>
      getByText(
        "RiNo is a burgeoning area with new bars, restaurants and event spaces popping up all the time. Explore this thriving area of Denver today!"
      )
    );

    expect(areaName).toBeInTheDocument();
    expect(rinoText).toBeInTheDocument();
  });

  it("should show listings after clicking on area", async () => {
    const { getByTestId, getByText } = render(
      <Router>
        <App />
      </Router>
    );

    getAllListings.mockResolvedValueOnce([
      {
        listing_id: 66,
        area_id: 240,
        name: "Cap Hill Overlook",
        address: {
          street: "925 N Lincoln St",
          zip: 80203
        },
        details: {
          neighborhood_id: 651251,
          superhost: true,
          seller_source: "55ccsa",
          beds: 3,
          baths: 1.75,
          cost_per_night: 400,
          features: ["rooftop", "fireplace", "pool", "leather couch"]
        },
        dev_id: "rcirdo",
        area: "capHill",
        db_connect: 736524
      }
    ]);

    await waitFor(() => getByText("RiNo"));
    fireEvent.click(getByTestId("240"));
    const listing = await waitFor(() => getByText("Cap Hill Overlook"));
    expect(listing).toBeInTheDocument();
  });

  it("should show listing details after clicking on listing", async () => {
    const { getByTestId, getByText } = render(
      <Router>
        <App />
      </Router>
    );

    getAllListings.mockResolvedValueOnce([
      {
        listing_id: 66,
        area_id: 240,
        name: "Cap Hill Overlook",
        address: {
          street: "925 N Lincoln St",
          zip: 80203
        },
        details: {
          neighborhood_id: 651251,
          superhost: true,
          seller_source: "55ccsa",
          beds: 3,
          baths: 1.75,
          cost_per_night: 400,
          features: ["rooftop", "fireplace", "pool", "leather couch"]
        },
        dev_id: "rcirdo",
        area: "capHill",
        db_connect: 736524
      }
    ]);

    await waitFor(() => getByText("Cap Hill Overlook"));
    fireEvent.click(getByTestId("66"));
    const listing = await waitFor(() => getByText("925 N Lincoln St 80203"));
    expect(listing).toBeInTheDocument();
  });
});
