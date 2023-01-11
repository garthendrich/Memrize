import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import { HomePage } from "@/pages";
import { GameModePage } from "@/pages/GameModePage";
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
