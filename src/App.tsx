import { Button } from './components/Button';
import { Progress } from './components/Progress';
import { statusText, useDoubleClickAnimation } from './useDoubleClickAnimation';

function App() {
  const [{ progress, status }, animation] = useDoubleClickAnimation(() => {
    console.log('ok');
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
