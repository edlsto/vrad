import React from 'react'
import  { render, fireEvent } from '@testing-library/react';
import CardsContainer from './CardsContainer.js';
import '@testing-library/jest-dom'

describe('CardsContainer', () => {
  it('should render', () => {
    const { getByTestId } = render(<CardsContainer areas={[]}/>)

    const container = getByTestId("card-container")
    expect(container).toBeInTheDocument()
  })

  it('should render a card', () => {
    const { getByText } = render(<CardsContainer areas={[
      {area: 'short',
      id: 1,
      about:'About',
      name: 'long',}]}/>)

    const areaDescriptionElement = getByText('About')
    const shortNameElement = getByText('short')
    const longNameElement = getByText('long')
    const buttonElement = getByText('View Listings')

    expect(shortNameElement).toBeInTheDocument()
    expect(longNameElement).toBeInTheDocument()
    expect(areaDescriptionElement).toBeInTheDocument()
    expect(buttonElement).toBeInTheDocument()

    //add image render when this is implemented
  })
})