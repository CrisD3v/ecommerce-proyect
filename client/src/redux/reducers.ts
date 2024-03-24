import { CLICK_ACTION, ClickAction } from "./actions";
import initialState from "./states";

const reducer = (
  state = initialState,
  action: ClickAction
): typeof initialState => {
  switch (action.type) {
    case CLICK_ACTION:
      return {
        ...state,
        isClicked: !state.isClicked,
      };
    default:
      return state;
  }
};

export default reducer;
