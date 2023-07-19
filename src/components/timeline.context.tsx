'use client';
import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { ViewPort } from "react-zoomable-ui";

interface TimelineContextProps {
  setStage: (stage: any) => void;
  stage: {
    width: number;
    height: number;
    size: {
      width: number;
      height: number;
    }
  }
  viewport: ViewPort | null;
  setViewport: (viewport: ViewPort) => void;
  clip: {
    name: string;
    length: number;
  }
  editor: {
    zoom: number;
    setZoom: (zoom: number) => void;
    setPercentage: (percentage: number) => void;
    percentage: number;
    setRect: (rect: any) => void;
    rect: {
      width: number;
      height: number;
      left: number;
      top: number;
    }
  }
}

const initialValues = {
  setStage: () => {},
  clip: { 
    name: '', 
    length: 5,
  },
  viewport: null,
  setViewport: () => {},
  editor: {
    zoom: 1,
    setZoom: () => {},
    percentage: 0,
    setPercentage: () => {},
    setRect: () => {},
    rect: {
      width: 0,
      height: 0,
      left: 0,
      top: 0,
    }
  },
  stage: {
    width: 0,
    height: 0,
    size: {
      width: 0,
      height: 0,
    }
  },
  
}

const TimelineContext = createContext<TimelineContextProps>(initialValues);


interface Props {
  name: string;
  length?: number;
  children: ReactNode;
}

export function useTimeline() {
  const val = useContext(TimelineContext);
  if(!val) throw new Error('useTimeline must be used within a TimelineProvider');
  return val;
}

export const TimelineProvider = ({ 
  name,
  length = 5,
  children 
}: Props) => {
  const [ percentage, setPercentage ] = useState(initialValues.editor.percentage);
  const [ rect, setRect ] = useState(initialValues.editor.rect);
  const [ stage, setStage ] = useState(initialValues.stage);
  const [ zoom, setZoom ] = useState(initialValues.editor.zoom);
  const [ viewport, setViewport ] = useState<any>(initialValues.viewport);

  return (
    <TimelineContext.Provider value={{
      ...initialValues,
      clip: { 
        name, 
        length: length || initialValues.clip.length,
      },
      stage,
      setStage,
      viewport,
      setViewport,
      editor: {
        ...initialValues.editor,
        zoom,
        setZoom,
        percentage,
        setPercentage,
        rect,
        setRect,
      }
    }}>
      { children }
    </TimelineContext.Provider>
  )
}