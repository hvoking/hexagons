// React imports
import { useCallback } from 'react';

// Context imports
import { usePrices } from '../../../../context/filters/prices';

// Third-party imports
import * as d3 from 'd3';

export const Marker = ({ xScale, innerHeight, minBound, maxBound }: any) => {
  const { leftPosition, setLeftPosition, rightPosition, setRightPosition } = usePrices();
  const circleRadius = 11;

  const onDragLeft = (event: any) => {
      const x = xScale.invert(event.x);
      const boundedX = x > rightPosition ? rightPosition : x < minBound ? minBound : x;
      setLeftPosition(+boundedX);
  }

  const onDragRight = (event: any) => {
      const x = xScale.invert(event.x);
      const boundedX = x > maxBound ? maxBound : x < leftPosition ? leftPosition : x;
      setRightPosition(+boundedX);
  }

  const circleLeft = useCallback((node: any) => {
      const drag = d3.drag()
          .on('drag', onDragLeft)
      d3.select(node).call(drag);
  }, [ rightPosition ]);

  const circleRight = useCallback((node: any) => {
    const drag = d3.drag()
        .on('drag', onDragRight)
    d3.select(node).call(drag);
  }, [ leftPosition ]);

  return (
      <g>
        <line 
          x1={`${xScale(leftPosition)}`} 
          y1={innerHeight} 
          x2={`${xScale(rightPosition)}`} 
          y2={innerHeight} 
          stroke="rgba(126, 126, 132, 1)"
          strokeWidth={2}
        />
        <circle 
          ref={circleLeft}
          cx={`${xScale(leftPosition)}`} 
          cy={`${innerHeight}`} 
          r={circleRadius} 
          fill="rgba(23, 23, 32, 1)"
          stroke="rgba(126, 126, 132, 1)"
          strokeWidth={1}
          style={{cursor: "ew-resize"}}
        />
        <circle 
          ref={circleRight}
          cx={`${xScale(rightPosition)}`} 
          cy={`${innerHeight}`} 
          r={circleRadius} 
          fill="rgba(23, 23, 32, 1)"
          stroke="rgba(126, 126, 132, 1)"
          strokeWidth={1}
          style={{cursor: "ew-resize"}}
        />
      </g>
    )
}