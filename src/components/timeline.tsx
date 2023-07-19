'use client';

import { GhiTimelineArea } from "./timeline-area";
import { useTimeline } from "./timeline.context";


export function GhiTimeline() {
  const { clip, stage, editor } = useTimeline();

  return (
    <div className="h-full flex flex-col">
      <header className="p-2 text-sm flex justify-between">
      { clip.name }
      <span>
        Play | Record | Settings
      </span>
      <span >
        Playback 0.0s | 
        {(editor.percentage*100).toFixed(2)}% | 
        zoom {editor.zoom.toFixed(2)} | 
        Pos: {editor.rect.left.toFixed(2)} - {editor.rect.top.toFixed(2)} |
        Size: {editor.rect.width.toFixed(2)} x {editor.rect.height.toFixed(2)} |
        stage {stage.width} x {stage.height}
      </span>
      </header>
      <main className="relative grow w-full   h-full flex overflow-hidden">
        <div className="w-2/12 h-full flex items-center justify-center ">
          Fields
        </div>
        <div className="grow  h-full flex flex-col ">
          <GhiTimelineArea />
        </div>
      </main>
    </div>
  )
}