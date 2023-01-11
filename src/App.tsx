import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import { HomePage } from "@/pages";
import { GameModePage } from "./pages/GameModePage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<HomePage />} />
      <Route
        path="/classic-words"
        element={<GameModePage gameMode="classic words" />}
      />
    </>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
