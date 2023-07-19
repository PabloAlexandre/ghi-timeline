'use client';
import {  Space } from "react-zoomable-ui";
import { Scroll } from "./scroll";
import { useViewport } from "./hooks/useViewport";
import { TimelineKeyframes } from "./timeline-keyframes";
import { TimelineClip } from "./timeline-clip";


function createElements(length: number) {
  return Array.from({ length }, (_, i) => i).map((i) => (
    <div key={i} className="select-none">
      <span className="text-xs text-gray-800">|</span>
      <div style={{zIndex: 0, width: 2, marginLeft: 1, marginTop: 4, background: '#212226' }} className="absolute h-full"/>
    </div>
  ));
}
export function GhiTimelineArea() {
  const {
    initialized,
    init,
    timeline,
    updateViewport,
    onViewportUpdate,
    ref,
  } = useViewport();


  return (
    <div ref={ref} className="w-full flex h-full flex-col" style={{ background: '#191a1d' }}>
      <div className="grid h-7 bg-gray-950 pl-4" style={{ gridTemplateColumns: `repeat(${12}, 1fr)`}}>
        {createElements(12)}
      </div>
      <div className="relative grow justify-center items-center flex bg-transparent">
        <div className="absolute w-full h-full inset-0 overflow-hidden">
        <TimelineClip />
        </div>
        {
          initialized && 
          <Space
            onUpdated={onViewportUpdate}
            className="cursor-move"
            onCreate={init}
            onContextMenu={(e) => {
              console.log("HEWRE");
            }}
          >        
        <div className="absolute inset-0 cursor-grab" style={{ width: timeline.stage.width  }}>
          
        </div>
        </Space>
    }
        <div className="nopan h-8 bg-transparent w-full absolute bottom-0">
          <div className="absolute z-10 left-2/4 -translate-x-2/4 h-3 bottom-3 " style={{ width: 'calc(100% - 32px)'}}>
          {
            initialized && <Scroll offset={32} height={10} />
          }
          </div>
          </div>
      </div>
    </div>
  )
}