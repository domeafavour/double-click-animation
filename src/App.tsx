import { useMemo, useState } from 'react';
import { Button } from './components/Button';
import { Progress } from './components/Progress';
import { createDoubleClickAnimation } from './lib/double-click-animation';

type Status = 'pending' | 'waiting' | 'canceled' | 'done';

const statusText: Record<Status, string> = {
  pending: 'Waiting for the first click',
  waiting: 'Waiting for the second click',
  canceled: 'Canceled',
  done: 'Done, click to start again',
};

function App() {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<Status>('pending');

  const doubleClickAnimation = useMemo(
    () =>
      createDoubleClickAnimation(500, {
        onAnimate: setProgress,
        onCanceled: () => {
          setStatus('canceled');
        },
        onDoubleClick: () => {
          setStatus('done');
        },
      }),
    []
  );

  return (
    <div className="flex flex-col gap-2 p-4">
      <Progress progress={progress} />
      <Button
        type="button"
        onClick={() => {
          setStatus('waiting');
          doubleClickAnimation.click();
        }}
      >
        {statusText[status]}
      </Button>
    </div>
  );
}

export default App;
