import { useEffect, useMemo, useState } from "react";
import { useViewport } from "./hooks/useViewport";
import { TimelineKeyframes } from "./timeline-keyframes";
import { HorizontalResizable } from "./utils/horizontal-resizable";
import { MultiHorizontalResizable } from "./utils/multi-horizontal-resizable";



export function TimelineClip() {
  const {
    timeline,
  } = useViewport();

  const [ left, setLeft ] = useState(0);
  const initialSize = useMemo(() => timeline.stage.width, [timeline.stage.width]);

  const [ size, setSize ] = useState(initialSize);

  useEffect(() => {
    setSize(timeline.stage.width);
  }, [ timeline.stage.width ])


  useEffect(() => {
    const w = initialSize * timeline.editor.zoom;
    
    const newLeft = timeline.editor.percentage * (w - timeline.stage.size.width);
    setLeft(newLeft);
    setSize(initialSize * timeline.editor.zoom);
  }, [ timeline.editor.percentage, initialSize, timeline.editor.zoom ]);

  return (
    <div className="absolute p-4 bg-transparent overflow-hidden flex flex-col items-center justify-center" style={{ top: 8, width: size, left: `${-left}px`, height: 'calc(100% - 40px)'}}>
      <h1 className="timeline relative text-6xl font-bold flex flex-col w-full h-full text-black">
          <MultiHorizontalResizable w={500} h={10} steps={[0, 0.65, 1]} />
          <div className="relative w-full" style={{ height: 40 }}>
          <HorizontalResizable h={40} >
            <div className="z-10 h-full bg-violet-300 w-full text-sm flex items-center justify-center px-16 hover:bg-violet-400 object-cover">
              Logo Clip
            </div>
          </HorizontalResizable>
          </div>
          <div className="relative w-full mt-4" style={{ height: 40 }}>
          <HorizontalResizable h={40} >
            <div className="z-10 bg-rose-300 hover:bg-rose-400 h-full w-full text-sm flex items-center justify-center px-16">
              Fade Hero
            </div>
          </HorizontalResizable>
          </div>

      </h1>
    </div>
  )
}