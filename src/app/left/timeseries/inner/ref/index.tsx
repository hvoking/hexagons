// React imports
import { useRef, useCallback } from 'react';

// App imports
import { datesFormat } from '../../../../../utils/constants';

// Context imports
import { useDates } from '../../../../../context/filters/dates';

// Third-party imports
import * as d3 from 'd3';

export const TimeseriesRef = ({	xScale, innerWidth, innerHeight, onMouseMove, onMouseOut }: any) => {
	const { dates, startDate, setStartDate, finalDate, setFinalDate } = useDates();
	const currentDragRef = useRef<any>(null);

	const startDateParts = startDate.split("-");
		const currentStartDate = new Date(`${startDateParts[2]}-${startDateParts[1]}-${startDateParts[0]}`);

		const finalDateParts = finalDate.split("-");
		const currentFinalDate = new Date(`${finalDateParts[2]}-${finalDateParts[1]}-${finalDateParts[0]}`);

	const onDragStart = (event: any) => {
	    const activateLeft = Math.abs(xScale(dates[0]) - event.x);
	    const activateRight = Math.abs(xScale(dates[1]) - event.x);

	    if (activateRight < activateLeft) {
	        currentDragRef.current = 'right';
	    } else {
	        currentDragRef.current = 'left';
	    }
	}

	const onDrag = (event: any) => {
		onMouseOut();
	    const x = event.x;
	    const boundedLeft = 
	    	x < 0 ? 0 : 
	    	x > xScale(currentFinalDate) - 10 ? xScale(currentFinalDate) - 10 :
	    	x;
	    const boundedRight = 
	    	x > innerWidth ? innerWidth : 
	    	x < xScale(currentStartDate) + 10 ? xScale(currentStartDate) + 10 :
	    	x;

	    if (currentDragRef.current === 'left') {
	    	setStartDate(datesFormat(xScale.invert(boundedLeft)));
	    } else {
	    	setFinalDate(datesFormat(xScale.invert(boundedRight)));
	    }
	}

	const barsRef = useCallback((node: any) => {
	    const drag = d3.drag()
	        .on('start', onDragStart)
	        .on('drag', onDrag)
	    d3.select(node).call(drag);
	}, [ dates, startDate, finalDate ]);

	return (
		<rect
			ref={barsRef}
			width={innerWidth}
			height={innerHeight}
			fill="transparent"
			style={{cursor: "ew-resize"}}
			onMouseMove={onMouseMove}
			onMouseOut={onMouseOut}
		/>
	)
}

TimeseriesRef.displayName="TimeseriesRef";