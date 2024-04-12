import { useMemo, useState } from 'react';
import { createDoubleClickAnimation } from './lib/double-click-animation';

export type Status = 'pending' | 'waiting' | 'canceled' | 'done';

export const statusText: Record<Status, string> = {
  pending: 'Waiting for the first click',
  waiting: 'Waiting for the second click',
  canceled: 'Canceled',
  done: 'Done, click to start again',
};

export function useDoubleClickAnimation() {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<Status>('pending');
  const animation = useMemo(
    () =>
      createDoubleClickAnimation(500, {
        onStart: () => setStatus('waiting'),
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
  return [{ progress, status }, animation] as const;
}
