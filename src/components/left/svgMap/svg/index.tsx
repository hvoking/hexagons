// React imports
import { useEffect, useRef, useCallback, Children, cloneElement } from 'react';

// Context imports
import { useSvgMapSizes } from '../../../../context/sizes/svgMap';

// Third-party imports
import * as d3 from 'd3';

export const SVGWrapper = ({ children, setCurrentTransform }: any) => {
	const svgRef = useRef<any>(null);
	const { width, height, setWidth, setHeight, margin } = useSvgMapSizes();

	const parentRef = useCallback((node: any) => {
		if (node) {
			setWidth(node.getBoundingClientRect().width);
			setHeight(node.getBoundingClientRect().height);
		}
	}, []);

	useEffect(() => {
		const svg = d3.select(svgRef.current);
		const g = svg.select("g");
		const zoomed = (e: any) => {
			const transform = e.transform
	        g.attr("transform", transform);
	        setCurrentTransform(transform)
	    };

		svg.call(d3.zoom()
			.scaleExtent([1, 10])
			.on("zoom", zoomed));
	}, [ width ]);

	return (
		<div ref={parentRef} style={{width: "100%", height: "100%"}}>
			{width &&
				<svg
					fill="none" 
					viewBox={`0 0 ${width} ${height}`} 
					preserveAspectRatio="none"
				>
					<g ref={svgRef} transform={`translate(${margin.left}, ${margin.top})`}>
						{
				          Children.map(children, (child, index) => {
				            return cloneElement(child, {width: "100%"});
				          })
				        }
			        </g>
				</svg>
			}
		</div>
	)
}

SVGWrapper.displayName="SVGWrapper";