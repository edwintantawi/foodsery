import * as React from 'react';
import { Metadata } from 'next';

import { constant } from '~/app/analyze/constant';

export const metadata: Metadata = {
  title: constant.metadata.title,
  description: constant.metadata.description,
  openGraph: {
    title: constant.metadata.title,
    description: constant.metadata.description,
  },
};

interface AnalyzeLayoutProps {
  children?: React.ReactNode;
}

export default function AnalyzeLayout({ children }: AnalyzeLayoutProps) {
  return children;
}
