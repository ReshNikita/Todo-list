import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import {
  ErrorPage,
  Login,
  Registration,
  PrivateRoute,
  TodoLayout,
} from "./components/";

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
