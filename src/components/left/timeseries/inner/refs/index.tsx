// Context imports
import { useLinesLimits } from '../../../../../context/limits/lines';

export const Refs = ({ innerWidth, yScale }: any) => {
	const { minLine, meanLine, maxLine } = useLinesLimits();

	return (
		<g>
			<line
	            x1={0}
	            x2={innerWidth}
	            y1={yScale(minLine)}
	            y2={yScale(minLine)}
	            style = {{
	                stroke: "rgba(255, 0, 0, 1)", 
	                strokeWidth: 0.3, 
	            }}
	        />
	        <line
	            x1={0}
	            x2={innerWidth}
	            y1={yScale(meanLine)}
	            y2={yScale(meanLine)}
	            style = {{
	                stroke: "rgba(57, 181, 74, 1)", 
	                strokeWidth: 0.3, 
	            }}
	        />
	        <line
	            x1={0}
	            x2={innerWidth}
	            y1={yScale(maxLine)}
	            y2={yScale(maxLine)}
	            style = {{
	                stroke: "rgba(166, 166, 244, 1)", 
	                strokeWidth: 0.3, 
	            }}
	        />
		</g>

	)
}

Refs.displayName="Refs";