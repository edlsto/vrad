import React from 'react'
import  { render, fireEvent } from '@testing-library/react';
import Nav from './Nav.js';
import '@testing-library/jest-dom'


describe('Nav', () => {
  it('renders the text we expect', () => {
    const { getByText } = render(
    <Nav userinfo={
      {name: "Ed",
      email: "email@email.com",
      visitReason: "Vacation",
      favorites: []}}/>);

    const headerElement = getByText("VRAD");
    const smallHeaderElement = getByText("Vacation Rentals Around Denver");
    const nameEl = getByText("Hello, Ed");
    const favroiteButtonEl = getByText("Favorites (0)");
    const LogButtonEl = getByText("Log out");
    expect(headerElement).toBeInTheDocument();
    expect(smallHeaderElement).toBeInTheDocument();
    expect(nameEl).toBeInTheDocument();
    expect(favroiteButtonEl).toBeInTheDocument();
    expect(LogButtonEl).toBeInTheDocument()
  })
})