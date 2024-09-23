'use client';
import { VFX } from '@vfx-js/core';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useEffect, useRef } from 'react';
import SimpleParallax from "simple-parallax-js";
import { toast } from 'sonner';

import PageLayout from '@/components/PageLayout';
import { Button } from "@/components/ui/button"
import { useBearStore } from '@/store/count';

export default function Index() {
  const t = useTranslations('Index');
  const bears = useBearStore((state) => state.bears);
  const increase = useBearStore((state) => state.increase);

  const img = useRef(null);
  useEffect(() => {
    const vfx = new VFX();
    if (img.current) {
      vfx.add(img.current, { shader: "rgbShift", overflow: 100 });
    }
  },[])
  return (
    <PageLayout title={t('title')}>
      <div style={{ height: '2000px'}}>
        <p>{t('description')}</p>
        <Link href="/about">{t('navigateToAbout')}</Link>
        <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">store: {bears}</h3>
        <Button onClick={() => increase()}>increase</Button>
        <Button onClick={() => toast.error('hello')}>toast</Button>
        <div style={{ overflow: 'hidden'}}>
          <SimpleParallax delay={1} transition="cubic-bezier(0,0,0,1)" overflow>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={"/3.webp"} alt={"image"}  />
          </SimpleParallax>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={"/3.webp"} alt={"image"} ref={img} />
      </div>
    </PageLayout>
  );
}
