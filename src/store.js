import React, { createContext, useReducer } from "react";

// https://blog.logrocket.com/react-hooks-context-redux-state-management/

const initialState = {};
const store = createContext(initialState);
const { Provider } = store;

const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case "test":
        const newState = 4;
        console.log("test");
        // do something with the action
        return newState;
      case "test2":
        const newState2 = 5;
        console.log("test2");
        // do something with the action
        return newState2;
      default:
        throw new Error();
    }
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider };
