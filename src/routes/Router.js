import { useRoutes } from "react-router-dom";
import { routes } from "./routes";

const Router = () => {
  let element = useRoutes(routes);
  return element;
};

export default Router;
