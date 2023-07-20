import * as React from 'react';

export function useCanvas() {
  const canvasElementRef = React.useRef<HTMLCanvasElement>(null);

  const drawImageToCanvas = (
    image: CanvasImageSource,
    width: number,
    height: number
  ) => {
    if (canvasElementRef.current === null) return;

    canvasElementRef.current.width = width;
    canvasElementRef.current.height = height;
    const ctx = canvasElementRef.current.getContext('2d');
    ctx?.drawImage(image, 0, 0);
  };

  const getImageFromCanvas = async (): Promise<File> => {
    return new Promise((resolve, reject) => {
      if (canvasElementRef.current === null) return;

      canvasElementRef.current.toBlob((blob) => {
        if (blob === null) {
          return reject('Failed convert canvas to blob, blob is null');
        }

        const file = new File([blob], 'canvas.jpg', { type: 'image/jpeg' });
        resolve(file);
      }, 'image/jpeg');
    });
  };

  const clearCanvas = () => {
    if (canvasElementRef.current === null) return;
    const ctx = canvasElementRef.current.getContext('2d');
    ctx?.clearRect(
      0,
      0,
      canvasElementRef.current.width,
      canvasElementRef.current.height
    );
  };

  const utilities = {
    drawImageToCanvas,
    getImageFromCanvas,
    clearCanvas,
  };

  return [canvasElementRef, utilities] as const;
}
