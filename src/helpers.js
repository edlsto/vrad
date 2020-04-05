export const getAllListings = (areasData) => {
  const result = areasData.reduce((allListings, area) => {
    area.listings.forEach((listing) => allListings.push(listing));
    return allListings;
  }, []);
  const promises = result.map((listing) => {
    return fetch("https://vrad-api.herokuapp.com" + listing).then((response) =>
      response.json()
    );
  });
  return Promise.all(promises);
};
