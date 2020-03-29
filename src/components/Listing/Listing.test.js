import React from 'react'
import  { render, fireEvent } from '@testing-library/react';
import Listing from './Listing.js';
import '@testing-library/jest-dom';

describe('Listing', () => {
  it('should render elements we expect', () => {
    const { getByText, getByTestId, getByAltText} = render(
    <Listing name={"house"} id={100} />);

    const listingCardEl = getByTestId("listing-card");
    const cardHeaderEl = getByText("house");
    const cardImageEl = getByAltText("house");
    const viewButtonEl = getByText("View");

    expect(listingCardEl).toBeInTheDocument()
    expect(cardHeaderEl).toBeInTheDocument()
    expect(cardImageEl).toBeInTheDocument()
    expect(viewButtonEl).toBeInTheDocument()
  })
})