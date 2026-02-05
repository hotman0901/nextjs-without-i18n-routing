import { ReactNode } from 'react';

import Header from '@/components/Header';

type Props = {
  children?: ReactNode;
  title: string;
  code?: string;
};

export default function PageLayout({ children, title, code }: Props) {
  if (code === '404') {
    return (
      <>
        {children}
      </>
    )
  } else {
    return (
      <>
        <div
          style={{
            padding: 24,
            fontFamily: 'system-ui, sans-serif',
            lineHeight: 1.5
          }}
        >
          <Header />
          <div style={{ maxWidth: 510 }}>
            <h1>{title}</h1>
            {children}
          </div>
        </div>
      </>
    );
  }
}
