// Third party imports
import { timeMonth } from 'd3';

interface DividerType {
  xScale: any, 
  innerHeight: any, 
}

export const Divider = ({ xScale, innerHeight }: DividerType) => (
  xScale.ticks(timeMonth).map((tickValue: number, index: number) => (
    <line
        key={index}
        x1={xScale(tickValue)}
        x2={xScale(tickValue)}
        y1={innerHeight}
        y2={innerHeight + 30}
        style = {{
             stroke: "rgba(126, 126, 132, 0.4)", 
             strokeWidth: 0.1, 
             strokeDasharray:""
        }}
    />
    )
  )
)

Divider.displayName="Divider"