export const initialState = {
    list: null,
    token: null,
    selectedCard: null,
    selectedSong: null,
    selectedArtist: null,
    searchClicked: false,
    userName: null,
    id: null,
    favorites: [],
    searchSong: null,
  };

  const reducer=(state,action)=>{
    switch(action.type){
        case "SET_LIST":
      return { ...state, list: action.payload };
    case "SET_SELECTED_CARD":
      return { ...state, selectedCard: action.payload };
    case "SET_SELECTED_SONG":
      return { ...state, selectedSong: action.payload };
    case "SET_SELECTED_ARTIST":
      return { ...state, selectedArtist: action.payload };
    case "SET_SEARCH_CLICKED":
      return { ...state, searchClicked: action.payload };
    case "SET_TOKEN":
      return { ...state, token: action.payload };
    case "SET_NAME":
      return { ...state, userName: action.payload };
    case "SET_SEARCH_SONG":
      return { ...state, searchSong: action.payload };
    case "ADD_FAVORITE":
      return { ...state, favorites: action.payload };
    

    default:
      return state;
  }
  }
  export default reducer