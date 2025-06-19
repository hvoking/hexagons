// App imports
import { Border } from './border';
import { Top } from './top';
import { Bottom } from './bottom';

// Utils imports
import { topAxisFormat, xAxisTickFormat } from '../../../../utils/constants';

export const Wrapper = ({ xScale, innerWidth, innerHeight }: any) => {
	return (
		<>
			<Top
			  xScale={xScale} 
			  tickFormat={topAxisFormat}
			/>
			<Bottom 
			  xScale={xScale} 
			  innerWidth={innerWidth} 
			  innerHeight={innerHeight} 
			  xAxisTickFormat={xAxisTickFormat}
			/>
			<Border
			  innerWidth={innerWidth}
			  innerHeight={innerHeight}
			/>
		</>

	)
}

Wrapper.displayName="Wrapper";