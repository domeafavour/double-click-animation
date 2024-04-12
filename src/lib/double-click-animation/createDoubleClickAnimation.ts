import { createAnimations } from './createAnimations';

export function createDoubleClickAnimation(
  duration = 300,
  options?: {
    onStart?: () => void;
    onDoubleClick?: () => void;
    onCanceled?: () => void;
    onAnimate?: (progress: number) => void;
    max?: number;
  }
) {
  const {
    onStart,
    onDoubleClick,
    onCanceled,
    max = 600,
    onAnimate,
  } = options || {};

  let isFirstClick = false;

  let willComplete = false;

  let willCancel = false;

  let animation = createAnimations({
    fromValue: 0,
    toValue: max / 2,
    duration,
    onAnimate: (current) => {
      onAnimate?.((current / max) * 100);
    },
    onComplete: () => {
      if (isFirstClick) {
        isFirstClick = false;
        willCancel = true;
        // from current to 0
        animation.reset({ fromValue: animation.getCurrent(), toValue: 0 });
      } else if (willCancel) {
        onCanceled?.();
      } else if (willComplete) {
        onDoubleClick?.();
      }
    },
  });

  function click() {
    if (animation.isRunning()) {
      isFirstClick = false;
      willCancel = false;
      willComplete = true;
      // from current to the end
      animation.reset({ fromValue: animation.getCurrent(), toValue: max });
    } else {
      onStart?.();
      isFirstClick = true;
      willCancel = false;
      willComplete = false;
      // from 0 to 50%
      animation.reset({ fromValue: 0, toValue: max / 2 });
    }
  }

  function isWaiting() {
    return animation.isRunning();
  }

  function cancel() {
    isFirstClick = false;
    willComplete = false;
    willCancel = false;
    animation.cancel();
  }

  return { click, isWaiting, cancel };
}
