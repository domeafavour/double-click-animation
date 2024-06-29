import { Button } from "./components/Button";
import { Progress } from "./components/Progress";
import {
  type DoubleClickConfirmStatus,
  useDoubleClickConfirm,
} from "react-use-double-click-confirm";

export const statusText: Record<DoubleClickConfirmStatus, string> = {
  stale: "Waiting for the first click",
  waiting: "Waiting for the second click",
  cancelled: "Canceled",
  confirmed: "Done, click to start again",
};

function App() {
  const [{ progress, status }, animation] = useDoubleClickConfirm(() => {
    console.log("ok");
  });

  return (
    <div className="flex flex-col gap-2 p-4">
      <Progress progress={progress} />
      <Button
        type="button"
        onClick={() => {
          animation.click();
        }}
      >
        {statusText[status]}
      </Button>
    </div>
  );
}

export default App;
