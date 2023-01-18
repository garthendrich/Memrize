import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import { GameModePage, GamePage, HomePage } from "@/pages";
import { gameModes } from "@/shared";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<HomePage />} />

      {gameModes.map((gameMode) => (
        <Route
          key={gameMode}
          path={gameMode.replace(" ", "-")}
          element={<GameModePage gameMode={gameMode} />}
        />
      ))}

      <Route path="/game">
        {gameModes.map((gameMode) => (
          <Route
            key={gameMode}
            path={gameMode.replace(" ", "-")}
            element={<GamePage gameMode={gameMode} />}
          />
        ))}
      </Route>
    </>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
