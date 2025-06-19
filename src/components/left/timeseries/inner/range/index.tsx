// Third-party imports
import * as d3 from 'd3';

export const Range = ({	yScale, yMin, yMean, width, maxPoint, minPoint }: any) => {
	const minColor = "rgba(68, 27, 30, 1)";
	const meanColor = "rgba(19, 58, 39, 1)";
	const maxColor = "rgba(41, 41, 96, 1)";

	return (
		<>
			<rect
			  y={yScale(d3.min([maxPoint, d3.max(yScale.ticks())]))}
			  width={width}
			  height={yScale(yMean) - yScale(d3.min([maxPoint, d3.max(yScale.ticks())]))}
			  fill={maxColor}
			/>
			<rect
			  y={yScale(yMean)}
			  width={width}
			  height={yScale(yMin) - yScale(yMean)}
			  fill={meanColor}
			/>
			<rect
			  y={yScale(yMin)}
			  width={width}
			  height={yScale(d3.max([minPoint, d3.min(yScale.ticks())])) - yScale(yMin)}
			  fill={minColor}
			/>
		</>

	)
}

Range.displayName="Range";