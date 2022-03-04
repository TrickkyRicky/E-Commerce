export const dev = (link) => {
  const heroku = "https://sense-clothing.herokuapp.com";
  const local = "http://localhost:8080";
  const localReact = "http://localhost:3000";
  const development = true;

  if (development) {
    if (link) {
      return localReact;
    } else {
      return local;
    }
  } else {
    return heroku;
  }
};
