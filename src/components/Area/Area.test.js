import React from 'react'
import  { render, fireEvent } from '@testing-library/react';
import Area from './Area.js';
import '@testing-library/jest-dom'
import { BrowserRouter as Router } from 'react-router-dom'

describe("Area", () => {
  it("should render what we expect", () => {
    const { getByText } = render(
    <Router><Area
    about="about"
    id={2}
    key={2}
    shortName="Eds"
    longName="Eds Place"
  /></Router>)

    const areaShortEl = getByText("Eds");
    const areaLongEl = getByText("Eds Place");
    const aboutEl = getByText("about");
    const linkButtonEl = getByText("View Listings")

    expect(areaShortEl).toBeInTheDocument();
    expect(areaLongEl).toBeInTheDocument();
    expect(aboutEl).toBeInTheDocument();
    expect(linkButtonEl).toBeInTheDocument()
  })

  it('should be able to navigate to listings for area', () => {
   const { getByText, getByTestId } = render(
      <Router><Area
        about="about"
        id={590}
        key={590}
        shortName="Eds"
        longName="Eds Place"
      /></Router>
    )

    fireEvent.click(getByTestId("590"))

    const listingNameEl = getByText("Eds Place")
    
    expect(listingNameEl).toBeInTheDocument()
  })
})