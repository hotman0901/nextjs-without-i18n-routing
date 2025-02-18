'use client';
import '@egjs/react-flicking/dist/flicking.css';
import '@egjs/react-flicking/dist/flicking-inline.css';

import Flicking from '@egjs/react-flicking';
// import { useTranslations } from 'next-intl';

// import PageLayout from '@/components/PageLayout';

export default function App() {
  // const t = useTranslations('About');

  return (
    <Flicking
      align="prev"
      circular={true}
      onMoveEnd={(e) => {
        console.log(e);
      }}
    >
      <div className="panel">1</div>
      <div className="panel">2</div>
      <div className="panel">3</div>
    </Flicking>
  );
}
