// App imports
import { RoomsSizesProvider } from './rooms';
import { DsvSizesProvider } from './dsv';
import { PricesSizesProvider } from './prices';
import { TimeseriesSizesProvider } from './timeseries';
import { SvgMapSizesProvider } from './svgMap';

export const BottomSizesProvider = ({ children }: any) => {
	return (
		<DsvSizesProvider>
		<RoomsSizesProvider>
		<PricesSizesProvider>
		<TimeseriesSizesProvider>
		<SvgMapSizesProvider>
			{children}	
		</SvgMapSizesProvider>		
		</TimeseriesSizesProvider>
		</PricesSizesProvider>
		</RoomsSizesProvider>
		</DsvSizesProvider>
	)
}

BottomSizesProvider.displayName="BottomSizesProvider"