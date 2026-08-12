'use client';

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

// layout 本身出錯時會渲染這裡，此時 NextIntlClientProvider 尚未掛載，
// 所以不能使用 useTranslations，必須自帶 html / body
export default function GlobalError({ reset }: Props) {
  return (
    <html lang="en">
      <body>
        <div style={{ padding: 24, fontFamily: 'system-ui, sans-serif' }}>
          <h1>Something went wrong</h1>
          <button onClick={reset}>Try again</button>
        </div>
      </body>
    </html>
  );
}
