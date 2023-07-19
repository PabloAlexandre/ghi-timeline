import { useEffect, useMemo, useState } from "react";
import { Rnd } from "react-rnd";
import { useViewport } from "../hooks/useViewport";


export function HorizontalResizable({ children, w, h, currentStep }: any) {
  const { timeline } = useViewport();
  const [ isDragging, setIsDragging ] = useState(false);
  const initialSize = useMemo(() => timeline.stage.width, [timeline.stage.width]);

  const [ info, setInfo ] = useState({
    width: w,
    height: h,
    x: 50,
    y: 0,
  });

  useEffect(() => {
    const factor = initialSize * timeline.editor.zoom;
    
    console.log(factor);
  }, [ timeline.editor.zoom ]);

  function onDrag(e: any, d: any) {
    e.preventDefault();
    e.stopPropagation();
    console.log(d.x)
    setInfo(p => ({...p, x: d.x, y: d.y }));
  }

  function onResize(e: any, direction: any, ref: any, delta: any, position: any) {
    setInfo(i => ({
      ...i,
      width: parseFloat(ref.style.width.replace('px', '')),
      height: parseFloat(ref.style.height.replace('px', '')), 
      // ...position,
    }));
  }


  return (
    <Rnd
        bounds=".timeline"
        dragAxis="x"
        size={{ width: info.width, height: info.height }}
        position={{ x: info.x, y: info.y }}
        enableResizing={{
          bottom: false,
          bottomLeft: false,
          bottomRight: false,
          left: true,
          right: true,
          top: false,
          topLeft: false,
          topRight: false
        }}
        onDrag={onDrag}
        onDragStart={() => setIsDragging(true)}
        onDragStop={() => setIsDragging(false)}
        onResize={onResize}
        className="z-10"
      >
        { children }
      </Rnd>
  )
}