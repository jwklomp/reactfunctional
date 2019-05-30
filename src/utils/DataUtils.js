import { map, pick, pathOr } from 'ramda';
import { Future } from 'ramda-fantasy'
/**
 * Desired data fields per Star Wars Subject. See https://swapi.co/documentation
 */
export const fieldsPerSubjectMap = new Map()
  .set("people", ["name", "gender", "mass", "birth_year"])
  .set("planets", ["name", "population", "terrain", "diameter"])
  .set("films", ["title", "episode_id", "director", "producer"])
  .set("starships", ["name", "model", "manufacturer", "crew"])
  .set("vehicles", ["name", "model", "manufacturer", "crew"])
  .set("species", ["name", "language", "average_height", "average_lifespan"]);

/**
 * Subject in the Star Wars API. Key is the string to be used in the Star Wars API, value the display value.
 * See https://swapi.co/documentation
 */
export const subjects = [
  {
    key: "films",
    value: "Movies"
  },
  {
    key: "people",
    value: "People"
  },
  {
    key: "planets",
    value: "Planets"
  },
  {
    key: "species",
    value: "Species"
  },
  {
    key: "starships",
    value: "Starships"
  },
  {
    key: "vehicles",
    value: "Vehicles"
  }
]

const resultMapper = subject => {
  const fieldsOfSubject = fieldsPerSubjectMap.get(subject);
  return map(entry => pick(fieldsOfSubject, entry))
}

/**
 * Get data from Star Wars Api. See https://swapi.co/documentation
 * @param {string} subject - search subject eg "people"
 * @param {string} searchTerm - search term eg "Luke"
 * @param {function} onSuccess 
 * @param {function} onError
 */
export const getStarWarsData = (subject, searchTerm, onSuccess, onError) =>
  fetchStarWarsData(subject, searchTerm)
    .map(result =>
      onSuccess(resultMapper(subject)(pathOr([], ["results"], result)))
    )
    .fork(e => onError(e), r => r);

const fetchStarWarsData = (subject, searchTerm) =>
  Future((reject, resolve) => {
    fetch(`https://swapi.co/api/${subject}/?search=${searchTerm}`)
      .then(r => r.status === 200 ? r.json().then(json => resolve(json)) : reject(r))
      .catch(e => reject(e))
  });