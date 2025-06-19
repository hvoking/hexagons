// React imports
import { useCallback, Children, cloneElement } from 'react';

// Context imports
import { usePricesSizes } from '../../../../context/sizes/prices';

export const SVGWrapper = ({ children }: any) => {
	const { margin, width, height, setWidth, setHeight } = usePricesSizes();

	const parentRef = useCallback((node: any)=> {
	    if (node) {
	      setWidth(node.getBoundingClientRect().width);
	      setHeight(node.getBoundingClientRect().height);
	    }
	  }, []);
	
	return (
		<div ref={parentRef} style={{width: "100%", height: "100%"}}>
			{width && <svg viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none">
				<g transform={`translate(${margin.left}, ${margin.top})`}>
				{Children.map(children, (child, index) => {
		            return cloneElement(child, {width: "100%"});
		        })}
		        </g>
			</svg>}
		</div>
	)
}

SVGWrapper.displayName="SVGWrapper";