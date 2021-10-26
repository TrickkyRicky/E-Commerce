export const dev = () => {
  const heroku = "https://sense-clothing.herokuapp.com";
  const local = "http://localhost:8080";
  const development = false;

  if (development) {
    return local;
  } else {
    return heroku;
  }
};
