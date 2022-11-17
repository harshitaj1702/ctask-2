const initialState = {
  theme: "light",
  color: "#ffffff",
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "CHANGE_THEME":
      state.theme = action.payload[0];
      state.color = action.payload[1];
      return { ...state, theme: state.theme, color: state.color };
    default:
      return state;
  }
}
