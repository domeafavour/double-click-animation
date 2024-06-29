import { useEffect, useMemo, useRef, useState } from "react";
import { createDoubleClickAnimation } from "./createDoubleClickAnimation";

export type DoubleClickConfirmStatus =
  | "stale"
  | "waiting"
  | "cancelled"
  | "confirmed";

export function useDoubleClickConfirm(onConfirm?: () => void) {
  const latestOnConfirmRef = useRef(onConfirm);
  useEffect(() => {
    latestOnConfirmRef.current = onConfirm;
  });
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<DoubleClickConfirmStatus>("stale");
  const animation = useMemo(
    () =>
      createDoubleClickAnimation(500, {
        onStart: () => setStatus("waiting"),
        onAnimate: setProgress,
        onCancel: () => {
          setStatus("cancelled");
        },
        onConfirm: () => {
          setStatus("confirmed");
          latestOnConfirmRef.current?.();
        },
      }),
    [],
  );
  return [{ progress, status }, animation] as const;
}
