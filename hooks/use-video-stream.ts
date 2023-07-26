import * as React from 'react';

export function useVideoStream() {
  const videoElementRef = React.useRef<HTMLVideoElement>(null);
  const [error, setError] = React.useState<Error | null>(null);
  const [retryCount, setRetryCount] = React.useState<number>(0);

  React.useEffect(() => {
    async function startVideo() {
      if (videoElementRef.current === null) return;

      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: 'environment',
          },
          audio: false,
        });

        videoElementRef.current.srcObject = mediaStream;

        setError(null);
      } catch (error) {
        if (error instanceof Error) {
          setError(error);
        }
        console.error(error);
      }
    }

    startVideo();
  }, [retryCount]);

  const retry = () => {
    setError(null);
    setRetryCount((count) => count + 1);
  };

  return [videoElementRef, { error, retry }] as const;
}
