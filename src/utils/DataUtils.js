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

/**
 * Picks the properties from an object, based on an array of keys, and returns a new object containing only those keys
 * @param {object} obj the object to 
 * @param {array} keys array of the object keys that are desired
 * @returns {object} 
 */
const pick = (obj, keys) =>
  keys.map(k => k in obj ? { [k]: obj[k] } : {})
    .reduce((res, o) => Object.assign(res, o), {});

/**
 * Take an array of objects and depending on the subject, pick the propierties that are desired. Returns a new array. 
 * @param {string} subject 
 * @param {array} input
 * @returns {array} 
 */
const mapResult = (subject, input = []) => {
  const fieldsOfSubject = fieldsPerSubjectMap.get(subject);
  return input.map(entry => pick(entry, fieldsOfSubject))
}

/**
 * Get data from Star Wars Api. See https://swapi.co/documentation
 * @param {string} subject - search subject eg "people"
 * @param {string} searchTerm - search term eg "Luke"
 * @param {function} onSuccess 
 * @param {function} onError
 */
export const getStarWarsData = (subject, searchTerm, onSuccess, onError) =>
  fetch(`https://swapi.co/api/${subject}/?search=${searchTerm}`)
    .then(res => res.json())
    .then(
      result => onSuccess(mapResult(subject, result.results)),
      error => onError(error)
    );

