import { ReactNode } from 'react';

import Header from '@/components/Header';

type Props = {
  children?: ReactNode;
  title: string;
};

export default function PageLayout({ children, title }: Props) {
  return (
    <div className="p-6 font-sans leading-normal">
      <Header />
      <div className="max-w-[510px]">
        <h1>{title}</h1>
        {children}
      </div>
    </div>
  );
}
