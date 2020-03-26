import React from 'react'
import  { render, fireEvent } from '@testing-library/react';
import Nav from './Nav.js';
import '@testing-library/jest-dom'


describe('Nav', () => {
  it('renders the text we expect', () => {
    const { getByText } = render(<Nav/>)

    const headerElement = getByText("VRAD")
    const smallHeaderElement = getByText("Vacation Rentals Around Denver")
    expect(headerElement).toBeInTheDocument()
    expect(smallHeaderElement).toBeInTheDocument()
  })
})