// React imports
import { useEffect } from 'react';

// App imports
import { SVGWrapper } from './svg';
import { Bars } from './bars';
import { Marker } from './marker';
import { Legend } from './legend';
import { Header } from './header';

// Utils imports
import { createJsonFromArray } from '../../../utils/createArr';
import { priceFormat } from '../../../utils/constants';

// Context imports
import { usePricesSizes } from '../../../context/sizes/prices';
import { usePrices } from '../../../context/filters/prices';
import { useDates } from '../../../context/filters/dates';
import { useLinesLimits } from '../../../context/limits/lines';

// Third party imports
import * as d3 from 'd3';

export const Prices = ({ linesData, pricesData }: any) => {
	const { margin, innerWidth, innerHeight } = usePricesSizes();
	const { setPriceMin, setPriceMax, leftPosition, setLeftPosition, rightPosition, setRightPosition } = usePrices();
	const { startDate, finalDate } = useDates();
	const { bottomLimit, topLimit, minLine, maxLine } = useLinesLimits();

	const startDateParts = startDate.split("-");
	const currentStartDate = new Date(`${startDateParts[2]}-${startDateParts[1]}-${startDateParts[0]}`);

	const finalDateParts = finalDate.split("-");
	const currentFinalDate = new Date(`${finalDateParts[2]}-${finalDateParts[1]}-${finalDateParts[0]}`);

	const filterByDates = pricesData.filter((d: any) => {  		
  		return currentStartDate < new Date(d.start_date) && new Date(d.start_date) < currentFinalDate
  	});

	const filterPoints = filterByDates.map((item: any) => {
		return item['price']
	});

	const minBound: any = d3.max([minLine - (maxLine + minLine) * 0.2, 0]); 
    const maxBound = maxLine + (maxLine + minLine) * 0.2;
    const divisions: number = 12;

    const pricesCounts = createJsonFromArray(
		filterPoints.filter((item: any) => item > 0),
		minBound,
		maxBound,
		divisions
	);
	
    const pricesValues: any = Object.values(pricesCounts);

    const minValue: any = d3.min(pricesValues);
    const maxValue: any = d3.max(pricesValues);
    
    const pricesKeys = Object.keys(pricesCounts);

	const xScale: any = d3.scaleLinear()
		.domain([0, divisions])
		.range([0, innerWidth]);

	const yScale: any = d3.scaleLinear()
		.domain([ minValue, maxValue ])
		.range([0, innerHeight]);

	const xPriceScale: any = d3.scaleLinear()
		.domain([minBound, maxBound])
		.range([0, innerWidth]);

	useEffect(() => {
		setLeftPosition(minBound);
		setPriceMin(minBound);
	}, [minBound]);

	useEffect(() => {
		setRightPosition(maxBound);
		setPriceMax(maxBound);
	}, [maxBound]);

	return (
		<div className="right-item-wrapper">
			<Header/>
			<SVGWrapper>
				<Legend 
					innerHeight={innerHeight} 
					xScale={xPriceScale}
					currentPosition={leftPosition}
				/>
				<Legend 
					innerHeight={innerHeight} 
					xScale={xPriceScale}
					currentPosition={rightPosition}
				/>
				<Bars
					xScale={xScale}
					xPriceScale={xPriceScale}
					yScale={yScale}
					pricesArray={pricesValues}
					pricesKeys={pricesKeys}
					margin={margin}
					innerWidth={innerWidth}
					innerHeight={innerHeight}
					setLeftPosition={setLeftPosition}
					setRightPosition={setRightPosition}
					leftPosition={leftPosition}
					rightPosition={rightPosition}
					priceFormat={priceFormat}
					minBound={minBound}
					maxBound={maxBound}
					bottomLimit={bottomLimit}
					topLimit={topLimit}
				/>
				<Marker 
					xScale={xPriceScale} 
					innerHeight={innerHeight}
					minBound={minBound}
					maxBound={maxBound}
				/>
			</SVGWrapper>
	  </div>
	)
}

Prices.displayName="Prices";