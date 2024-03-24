import { createStore } from "redux";
import reducer from "./reducers";

export type RootState = ReturnType<typeof reducer>;

const store = createStore(reducer);

export default store;
