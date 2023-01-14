import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import { GameModePage, HomePage } from "@/pages";
import { gameModes } from "@/shared";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<HomePage />} />
      {gameModes.map((gameMode) => (
        <Route
          path={gameMode.replace(" ", "-")}
          element={<GameModePage gameMode={gameMode} />}
        />
      ))}
    </>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
