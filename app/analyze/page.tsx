'use client';

import * as React from 'react';
import Link from 'next/link';

import { Balancer } from 'react-wrap-balancer';

import { analyzeFoodImageAction } from '~/app/analyze/actions';
import { Header } from '~/components/header';
import { Icons } from '~/components/icons';
import { RecipeCard } from '~/components/recipe-card';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '~/components/ui/alert-dialog';
import { Button } from '~/components/ui/button';
import { ScrollArea, ScrollBar } from '~/components/ui/scroll-area';
import { Separator } from '~/components/ui/separator';
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
import { getRecipeImageById } from '~/lib/utils';
import { FoodAnalyzeResult } from '~/types/spoonacular/food-analyze';

export default function AnalyzePage() {
  const [result, setResult] = React.useState<FoodAnalyzeResult | null>(null);
  const [isPending, startTransition] = React.useTransition();

  const [
    videoElementRef,
    { error: videoStreamError, retry: retryVideoStream },
  ] = useVideoStream();

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
      setResult(result);
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
          className="absolute inset-0 h-full w-full flex-1 rounded-lg border bg-muted object-cover"
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
          <SheetContent side="bottom" className="rounded-t-3xl">
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
              <Separator className="my-4" />
              <div className="mb-4">
                <ul className="space-y-1 text-sm">
                  <li className="flex items-center justify-between">
                    <span className="font-bold">Calories</span>
                    <span className="text-muted-foreground">
                      {result?.nutrition.calories.value}{' '}
                      {result?.nutrition.calories.unit}
                    </span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="font-bold">Carbohydrates</span>
                    <span className="text-muted-foreground">
                      {result?.nutrition.carbs.value}{' '}
                      {result?.nutrition.carbs.unit}
                    </span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="font-bold">Fat</span>
                    <span className="text-muted-foreground">
                      {result?.nutrition.fat.value} {result?.nutrition.fat.unit}
                    </span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="font-bold">Protein</span>
                    <span className="text-muted-foreground">
                      {result?.nutrition.protein.value}{' '}
                      {result?.nutrition.protein.unit}
                    </span>
                  </li>
                </ul>
                <Separator className="my-4" />
                <ScrollArea>
                  <ul className="flex gap-1">
                    {result?.recipes.map((recipe) => (
                      <li key={recipe.id}>
                        <RecipeCard
                          openInNewTab
                          id={recipe.id}
                          title={recipe.title}
                          image={getRecipeImageById(recipe.id)}
                        />
                      </li>
                    ))}
                  </ul>
                  <ScrollBar orientation="horizontal" />
                </ScrollArea>
              </div>
              <SheetFooter>
                <SheetClose asChild>
                  <Button onClick={handleClose}>Ok and close</Button>
                </SheetClose>
              </SheetFooter>
            </div>
          </SheetContent>
        </Sheet>

        <AlertDialog open={videoStreamError !== null}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                <Balancer>Failed to Access Device Camera!</Balancer>
              </AlertDialogTitle>
              <AlertDialogDescription>
                Please make sure you have granted access to your device camera
                and try again
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel asChild>
                <Link href="/">Back</Link>
              </AlertDialogCancel>
              <AlertDialogAction onClick={retryVideoStream}>
                Try again
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </main>
  );
}
