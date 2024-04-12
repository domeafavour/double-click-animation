interface Props {
  progress: number;
}

export type { Props as ProgressProps };

export function Progress({ progress }: Props) {
  return (
    <div
      className="h-4 bg-orange-400 border-2 border-solid border-orange-500 rounded-lg"
      style={{
        width: `${progress}%`,
      }}
    />
  );
}
