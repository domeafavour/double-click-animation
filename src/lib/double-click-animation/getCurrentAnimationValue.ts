export function getCurrentAnimationValue({
  duration,
  fromValue,
  timestamp,
  startTime,
  toValue,
}: {
  fromValue: number;
  toValue: number;
  duration: number;
  startTime: number;
  timestamp: number;
}) {
  const progress = Math.min(1, (timestamp - startTime) / duration);
  const value = fromValue + (toValue - fromValue) * progress;
  return { value, progress };
}
