// Third party imports
import * as d3 from 'd3';

interface VerticalRefType {
    innerHeight: any
    innerWidth: any
    xScale: any
    stroke: any
    strokeWidth: any
    strokeDasharray: any
};

export const VerticalRef = (
    { 
        xScale,
        innerHeight,
        innerWidth,
        stroke,
        strokeWidth,
        strokeDasharray,
    }: VerticalRefType) => {
        return (
            <>
                {
                   xScale.ticks(d3.timeMonth).map((item: any) => (
                        <line
                            key={item}
                            x1={xScale(item)}
                            x2={xScale(item)}
                            y1={0}
                            y2={innerHeight}
                            style = {{
                                 stroke: stroke, 
                                 strokeWidth:strokeWidth, 
                                 strokeDasharray:strokeDasharray
                            }}
                        />
                    ))
                }
            </>
    )
}

VerticalRef.displayName="VerticalRef";