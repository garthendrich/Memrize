import { Header } from "@/components/Header";
import { MainPanel } from "@/components/MainPanel";
import { useTimer } from "@/hooks";
import { GameMode } from "@/shared";
import { capitalize } from "@/utils";

export interface FocusScreenProps {
  gameMode: GameMode;
  seconds: number;
  onFinish: () => void;
}

export function FocusScreen({ gameMode, seconds, onFinish }: FocusScreenProps) {
  const { timer } = useTimer({ seconds, onFinish, willAutoStart: true });

  return (
    <>
      <Header isFixed>
        <Header.Segment className="justify-center">
          <p className="text-xl font-semibold">{capitalize(gameMode)}</p>
        </Header.Segment>
      </Header>
      <MainPanel className="h-screen justify-center">
        <div className="flex w-screen flex-col items-center justify-center bg-stroke p-12">
          <p className="text-2xl">Game will start in</p>
          <p className="text-9xl font-semibold">{timer}</p>
        </div>
      </MainPanel>
    </>
  );
}
