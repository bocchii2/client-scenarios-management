import { PLACES_DATA } from "./PlacesData";
// import api from "./api";
// simulate a api call
export const getScenarioById = (id) => {
  const scenario = PLACES_DATA.find((place) => place.id === parseInt(id));
  return scenario;

  // api.get("scenario");
};
