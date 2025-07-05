// Third-party imports
import { timeMonth } from 'd3';

const TopLine = ({ y1, y2, year, xScale, strokeWidth}: any) => {
  return (
    <line
      key={year}
      x1={xScale(year)}
      x2={xScale(year)}
      y1={y1}
      y2={y2}
      stroke="rgba(155, 155, 155, 1)"
      strokeWidth={strokeWidth}
      strokeDasharray=""
    />
  )
}

export const Lines = ({ xScale, innerHeight }: any) => {
  const currentTicks = xScale.ticks(timeMonth);
  const firstMonthOfYear = currentTicks.filter((item: any) => item.getMonth() === 0 && item);
  const strokeWidth = 0.3;

  return (
    <>
      <line
        x1={0}
        x2={0}
        y1={-15}
        y2={0}
        stroke="rgba(155, 155, 155, 1)"
        strokeWidth={strokeWidth}
        strokeDasharray=""
      />
      {firstMonthOfYear.map((year: any, index: number) => {
        return (
          <g key={index}>
            <TopLine 
              y1={-15} 
              y2={innerHeight} 
              year={year} 
              xScale={xScale} 
              strokeWidth={strokeWidth}
            />
          </g>
          )
        })    
      }
    </>
  )
}

Lines.displayName="Lines"