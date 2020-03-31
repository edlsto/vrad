export const getAllListings = areasData => {
  const result = areasData.reduce((allListings, area) => {
    area.listings.forEach(listing => allListings.push(listing));
    return allListings;
  }, []);
  const promises = result.map(listing => {
    return fetch("http://localhost:3001" + listing).then(response =>
      response.json()
    );
  });
  return Promise.all(promises);
};
