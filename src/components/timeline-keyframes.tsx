import { useViewport } from "./hooks/useViewport";


const KeyframeIcon = () => (
  <svg width="14" height="14" viewBox="0 0 18 18" fill="white" xmlns="http://www.w3.org/2000/svg" className="stroke-red-500 fill-red-500">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M8.52874 0.986164C8.78909 0.725804 9.21121 0.725804 9.47156 0.986164L17.0141 8.52863C17.2743 8.78898 17.2743 9.2111 17.0141 9.47144L9.47156 17.0139C9.21121 17.2743 8.78909 17.2743 8.52874 17.0139L0.986276 9.47144C0.725929 9.2111 0.725929 8.78898 0.986276 8.52863L8.52874 0.986164Z" />
  </svg>
)

export function TimelineKeyframes() {
  return (
    <div className="h-10">
        <div className="absolute top-0" style={{ left: -6, zIndex: 2 }}>
        <KeyframeIcon />
        </div>
        <div className="absolute w-80 top-0 h-1 bg-red-500 " style={{ zIndex: 1, left: 0, top: 7 }}>
          
        </div>
        <div className="absolute top-0" style={{ left: 307, zIndex: 2 }}>
        <KeyframeIcon />
        </div>
        <div className="absolute w-80 top-0 h-1 bg-red-500 " style={{ zIndex: 1, left: 317, top: 7 }}>
          
        </div>
        <div className="absolute top-0" style={{ left: 624, zIndex: 2 }}>
        <KeyframeIcon />
        </div>
      </div>
  )
}