import { BrowserRouter } from "react-router-dom";
import Router from "./routes/Router";
import { AuthProvider } from "./state/context/AuthProvider";
import { Provider } from "react-redux";
import { store } from "./state/redux/store";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Provider store={store}>
          <Router />
        </Provider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
