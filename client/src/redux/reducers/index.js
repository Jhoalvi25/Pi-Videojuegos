const initialState = {
  allVideogames: [],
  videogames: [],
  genres: [],
  detail: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_VIDEOGAMES":
      return {
        ...state,
        videogames: action.payload,
        allVideogames: action.payload,
      };
    case "GET_VIDEOGAMES_BY_NAME":
      return {
        ...state,
        videogames: action.payload,
      };
    case "GET_GENRES":
      return {
        ...state,
        genres: action.payload,
      };
    case "GET_DETAILS":
      return {
        ...state,
        detail: action.payload,
      };
    case "POST_VIDEOGAME":
      return {
        ...state,
      };
    case "ORDER_ALPHABETICALLY":
      const orderByName =
        action.payload === "asc"
          ? [...state.videogames].sort(function (a, b) {
              if (a.name > b.name) {
                return 1;
              }
              if (b.name > a.name) {
                return -1;
              }
              return 0;
            })
          : [...state.videogames].sort(function (a, b) {
              if (a.name > b.name) {
                return -1;
              }
              if (b.name > a.name) {
                return 1;
              }
              return 0;
            });

      return {
        ...state,
        videogames: orderByName,
      };
    case "FILTER_BY_GENRE":
      const all = state.allVideogames;
      const filterGenres = action.payload === "all" ? all : all.filter((elem) => elem.genres.includes(action.payload));
      return {
        ...state,
        videogames: filterGenres,
      };
    case "FILTER_BY_RATING":
      let sortedByRating = [...state.videogames];
      sortedByRating =
        action.payload === "low"
          ? state.videogames.sort(function (a, b) {
              if (a.rating > b.rating) return 1;
              if (a.rating < b.rating) return -1;
              return 0;
            })
          : state.videogames.sort(function (a, b) {
              if (a.rating < b.rating) return 1;
              if (a.rating > b.rating) return -1;
              return 0;
            });
      return {
        ...state,
        videogames: sortedByRating,
      };
    case "FILTER_CREATED":
      const allVideogamesExisting = state.allVideogames;
      const filterCreated =
        action.payload === "created"
          ? allVideogamesExisting.filter((elem) => elem.createdInDb)
          : allVideogamesExisting.filter((elem) => !elem.createdInDb);

      return {
        ...state,
        videogames:
          action.payload === "All" ? allVideogamesExisting : filterCreated,
      };
    case "CLEAN_DETAIL":
      return {
        ...state,
        detail: [],
      };
    default:
      return { ...state };
  }
}

export default rootReducer;
