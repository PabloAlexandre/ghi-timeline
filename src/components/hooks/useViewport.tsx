'use client';
import { useCallback } from "react";
import { useStage } from "./useStage";
import { ViewPort } from "react-zoomable-ui";
import { useTimeline } from "../timeline.context";

const OFFSET_X = 1000;
const OFFSET_Y = -26;

export function useViewport() {
  const {
    ref,
  } = useStage({
    x: OFFSET_X,
    y: OFFSET_Y,
  });

  const timeline = useTimeline();
  const { editor, stage, clip, setViewport, viewport } = timeline;


  const updateViewport = useCallback((percentage: number) => {
    if(!viewport) return;
    const max = stage.width - viewport.width;
    const left = max * percentage;
    // console.log(viewport.containerWidth);

    viewport.camera.centerFitHorizontalAreaIntoView(left, viewport.width);
    // editor.setPercentage(percentage);
  }, [viewport]);

  function onViewportUpdate(viewPort: ViewPort) {
    const max = stage.width - viewPort.width;
    const percentage = viewPort.left / max;

    editor.setPercentage(percentage);
    editor.setRect({ 
      left: viewPort.left, 
      top: viewPort.top,
      height: viewPort.height,
      width: viewPort.width 
    });

    editor.setZoom(viewPort.zoomFactor);
  }

  function init(viewPort: ViewPort) {
    setViewport(viewPort);

    viewPort.setBounds({ x: [0, stage.width], y: [0, stage.height] });
    viewPort.camera.centerFitAreaIntoView({
      left: -4,
      top: stage.height + OFFSET_Y,
      width: stage.width,
      height: stage.height,
    });
  }
 
  return {
    ref,
    init,
    timeline,
    initialized: !!stage.width,
    updateViewport,
    onViewportUpdate,
  }
}