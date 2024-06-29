import { getCurrentAnimationValue } from './getCurrentAnimationValue';

type AnimationOptions = {
  fromValue: number;
  toValue: number;
  duration: number;
  onStart?: () => void;
  onAnimate?: (current: number) => void;
  onComplete?: () => void;
};

export function createAnimations(options: AnimationOptions) {
  let running = false;
  let current = 0;
  let rafId: number | null = null;

  let { fromValue, toValue, duration, onStart, onAnimate, onComplete } =
    options;

  function cancel() {
    running = false;
    if (rafId) {
      cancelAnimationFrame(rafId);
    }
    fromValue = current;
  }

  function animate() {
    let start: number | null = null;

    function step(timestamp: number) {
      if (!start) {
        start = timestamp;
      }

      const { progress, value } = getCurrentAnimationValue({
        duration,
        fromValue,
        toValue,
        startTime: start,
        timestamp: timestamp,
      });

      current = value;
      onAnimate?.(current);

      if (progress < 1) {
        rafId = requestAnimationFrame(step);
      } else {
        running = false;
        onComplete?.();
      }
    }

    rafId = requestAnimationFrame(step);
  }

  function run() {
    if (running) {
      return;
    }
    running = true;
    onStart?.();
    animate();
  }

  function getCurrent() {
    return current;
  }

  function isRunning() {
    return running;
  }

  function reset(
    newOptions: Partial<
      Pick<AnimationOptions, 'duration' | 'fromValue' | 'toValue'>
    >
  ) {
    cancel();
    duration = newOptions.duration ?? duration;
    fromValue = newOptions.fromValue ?? fromValue;
    toValue = newOptions.toValue ?? toValue;
    run();
  }

  return { run, getCurrent, isRunning, cancel, reset };
}
