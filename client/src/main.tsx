import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AppContextProvider } from "./contexts/";
import App from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import { store, persistor } from "./store";
import { PersistGate } from "redux-persist/integration/react";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppContextProvider>
          <App />
        </AppContextProvider>
      </PersistGate>
    </Provider>
  </BrowserRouter>
);
