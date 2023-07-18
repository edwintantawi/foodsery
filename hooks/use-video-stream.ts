import * as React from 'react';

export function useVideoStream() {
  const videoElementRef = React.useRef<HTMLVideoElement>(null);

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
      } catch (error) {
        // TODO: show user friendly error
        console.error(error);
      }
    }

    startVideo();
  }, []);

  return videoElementRef;
}
