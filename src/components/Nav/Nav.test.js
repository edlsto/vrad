import React from 'react'
import  { render, fireEvent } from '@testing-library/react';
import Nav from './Nav.js';
import '@testing-library/jest-dom'
import { BrowserRouter as Router } from 'react-router-dom'


describe('Nav', () => {
  it('renders the text we expect', () => {
    const { getByText } = render(
    <Router><Nav userinfo={
      {name: "Ed",
      email: "email@email.com",
      visitReason: "Vacation",
      favorites: []}}/></Router>);

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

  it('should be able to log out', () => {
    const mockLogOutUser = jest.fn()

    const { getByText } = render(
      <Router>
        <Nav
        userinfo={
        {name: "Ed",
        email: "email@email.com",
        visitReason: "Vacation",
        favorites: []}}
        logOutUser={mockLogOutUser}
        /></Router>)

    fireEvent.click(getByText("Log out"));

    expect(mockLogOutUser).toHaveBeenCalled()
  })

  it('should be able to direct user to favorites', () => {
    const { getByText } = render(
      <Router>
        <Nav
        userinfo={
        {name: "Ed",
        email: "email@email.com",
        visitReason: "Vacation",
        favorites: []}}
        /></Router>)

    fireEvent.click(getByText("Favorites (0)"))
    
  })
})