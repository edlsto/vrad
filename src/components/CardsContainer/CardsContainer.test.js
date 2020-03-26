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
      {shortName: 'short',
      id: 1,
      about:'About',
      longName: 'long',}]}/>)

    const areaDescriptionElement = getByText('About')
    //shortName and longName arent generating in their respected elements
    expect(areaDescriptionElement).toBeInTheDocument()
  })
})