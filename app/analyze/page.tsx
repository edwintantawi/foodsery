'use client';

import * as React from 'react';

import { analyzeFoodImageAction } from '~/app/analyze/actions';
import { Header } from '~/components/header';
import { Icons } from '~/components/icons';
import { Button } from '~/components/ui/button';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '~/components/ui/sheet';
import { useCanvas } from '~/hooks/use-canvas';
import { useVideoStream } from '~/hooks/use-video-stream';
import { FoodAnalyzeResult } from '~/types/spoonacular/food-analyze';

export default function AnalyzePage() {
  const [result, setResult] = React.useState<FoodAnalyzeResult | null>(null);
  const [isPending, startTransition] = React.useTransition();

  const videoElementRef = useVideoStream();
  const [
    canvasElementRef,
    { drawImageToCanvas, getImageFromCanvas, clearCanvas },
  ] = useCanvas();

  const handleClickAnalyze = async () => {
    if (canvasElementRef.current === null || videoElementRef.current === null) {
      return;
    }

    drawImageToCanvas(
      videoElementRef.current,
      videoElementRef.current.videoWidth,
      videoElementRef.current.videoHeight
    );

    const file = await getImageFromCanvas();

    const formData = new FormData();
    formData.append('file', file);

    startTransition(async () => {
      const result = await analyzeFoodImageAction(formData);

      if (result.error !== null) {
        // TODO: show user friendly error
        alert(result.error);
        return;
      }

      setResult(result.payload);
    });
  };

  const handleClose = () => {
    setResult(null);
    clearCanvas();
  };

  return (
    <main className="container flex flex-1 flex-col justify-stretch">
      <Header
        title="Analyze Food Image"
        subTitle="Get to know your food by taking a photo of it"
      />

      <div className="relative flex-1">
        <video
          ref={videoElementRef}
          className="absolute inset-0 h-full w-full flex-1 rounded-lg border object-cover"
          autoPlay
          muted
        />
        <canvas
          ref={canvasElementRef}
          className="absolute inset-0 h-full w-full rounded-lg border object-cover"
        />
        <div className="absolute inset-x-0 bottom-0 flex flex-col items-center px-4 py-6">
          <Button
            className="gap-2 border border-white"
            onClick={handleClickAnalyze}
            disabled={isPending}
          >
            {isPending ? (
              <Icons.Loader className="animate-spin" size={16} />
            ) : (
              <Icons.Analyze size={16} />
            )}
            Analyze
          </Button>
        </div>

        <Sheet open={result !== null}>
          <SheetContent side="bottom">
            <div className="container p-0">
              <SheetHeader>
                <SheetTitle>Analyze Result</SheetTitle>
                <SheetDescription>
                  From the picture you took it looks like{' '}
                  <span className="font-bold">{result?.category.name}</span>{' '}
                  with{' '}
                  <span className="font-bold">
                    {result?.category.probability.toFixed(2)}
                  </span>{' '}
                  probability
                </SheetDescription>
              </SheetHeader>
              <div className="py-4" />
              <SheetFooter>
                <SheetClose asChild>
                  <Button onClick={handleClose}>Ok and close</Button>
                </SheetClose>
              </SheetFooter>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </main>
  );
}
