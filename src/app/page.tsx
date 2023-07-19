'use client';

import { TimelineProvider } from "@/components/timeline.context";
import dynamic from 'next/dynamic'

const GhiTimeline = dynamic(() => import('@/components/timeline').then(res => res.GhiTimeline), { ssr: false });


export default function Home() {
  return (
    <TimelineProvider name="New Sequence">
      <main className="flex min-h-screen flex-col items-center justify-end">
        <div className="h-80 w-full">
          <GhiTimeline />      
        </div>
      </main>
    </TimelineProvider>
  )
}
