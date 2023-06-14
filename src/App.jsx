// NEw
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import ErrorPage from "./components/ErrorPage";
import Login from "./components/Login/Login";
import Registration from "./components/Registration/Registration";
import PrivateRoute from "./components/PrivateRoute";
import TodoLayout from "./components/TodoLayout";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route index element={<Login />} />
      <Route path="register" element={<Registration />} />
      <Route path="*" element={<ErrorPage />} />
      <Route
        path="/todo"
        element={
          <PrivateRoute>
            <TodoLayout />
          </PrivateRoute>
        }
      />
    </Route>
  )
);

const App = () => <RouterProvider router={router} />;

export default App;
