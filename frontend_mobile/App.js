import * as React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { store, persistor } from "./store/store";
import AppRoutes from "./components/AppRoutes";

export default function App() {
  // const [loggedIn, setLoggedIn] = useState(false);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppRoutes></AppRoutes>
      </PersistGate>
    </Provider>
  );
}
