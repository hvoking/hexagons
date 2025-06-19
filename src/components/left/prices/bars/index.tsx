// React imports
import { useRef, useCallback } from 'react';

// Third-party imports
import * as d3 from 'd3';

export const Bars = ({ 
    xScale, xPriceScale, yScale, 
    minBound, maxBound,
    pricesArray, pricesKeys, 
    innerWidth, innerHeight, 
    leftPosition, setLeftPosition, 
    rightPosition, setRightPosition,
    priceFormat,
    bottomLimit, topLimit,
}: any) => {
    const currentDragRef = useRef<any>(null);

    const onDragStart = (event: any) => {
        const x = xPriceScale.invert(event.x);
        const activateRight = Math.abs(rightPosition - x);
        const activateLeft = Math.abs(leftPosition - x);
        if (activateRight < activateLeft) {
            currentDragRef.current = 'right';
        } else {
            currentDragRef.current = 'left';
        }
        const boundedLeft = 
            x < minBound ? minBound : 
            x > rightPosition ? rightPosition : 
            x;
        const boundedRight = 
            x > maxBound ? maxBound : 
            x < leftPosition ? leftPosition : 
            x;
        if (currentDragRef.current === 'left') {
            setLeftPosition(+boundedLeft);
        } else {
            setRightPosition(+boundedRight);
        }
    }

    const onDrag = (event: any) => {
        const x = xPriceScale.invert(event.x);
        const boundedLeft = 
            x < minBound ? minBound : 
            x > rightPosition ? rightPosition : 
            x;
        const boundedRight = 
            x > maxBound ? maxBound : 
            x < leftPosition ? leftPosition : 
            x;
        if (currentDragRef.current === 'left') {
            setLeftPosition(+boundedLeft);
        } else {
            setRightPosition(+boundedRight);
        }
    }

    const barsRef = useCallback((node: any) => {
        const drag = d3.drag()
            .on('start', onDragStart)
            .on('drag', onDrag);
        d3.select(node).call(drag);
    }, [ rightPosition, leftPosition ]);

	return (
        <g>
            {
                pricesArray.map((item: any, index: number) => {
                    const currentPriceMin = pricesKeys[index].split("-")[0];
                    const currentPriceMax = pricesKeys[index].split("-")[1];
                    return (
                        <rect
                            key={index}
                            x={xScale(index)}
                            y={innerHeight - yScale(item) - 12}
                            width={innerWidth / (pricesArray.length - 1) - 3}
                            height={yScale(item) + 12}
                            fill={
                                +currentPriceMin < bottomLimit && +currentPriceMax < leftPosition ?
                                "rgba(255, 0, 0, 0.6)" :
                                +currentPriceMin < bottomLimit && +currentPriceMin > rightPosition ?
                                "rgba(255, 0, 0, 0.6)" :
                                +currentPriceMin < bottomLimit ?
                                "rgba(255, 0, 0, 1)" :
                                +currentPriceMax > topLimit && +currentPriceMin > rightPosition ?
                                "rgba(166, 166, 244, 0.6)" :
                                +currentPriceMax > topLimit && +currentPriceMax < leftPosition ?
                                "rgba(166, 166, 244, 0.6)" :
                                +currentPriceMax > topLimit ?
                                "rgba(166, 166, 244, 1)" :
                                +currentPriceMin > rightPosition || +currentPriceMax < leftPosition ?
                                "rgba(57, 181, 74, 0.6)" :
                                "rgba(57, 181, 74, 1)"
                            }
                        />
                        
                    )
                })
            }
            <rect
                x={0}
                y={0}
                width={innerWidth}
                height={innerHeight}
                fill="transparent"
                ref={barsRef}
                style={{cursor: "ew-resize"}}
            />
        </g>
	)
}

Bars.displayName="Bars"