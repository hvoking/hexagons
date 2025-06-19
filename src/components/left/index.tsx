// App imports
import { Prices } from './prices';
import { Timeseries } from './timeseries';
import { SvgMap } from './svgMap';
import { Message } from './message';
import './styles.scss';

// Context imports
import { useIsochroneApi } from 'context/api/isochrone';
import { useLinesApi } from 'context/api/imoveis/lines';
import { usePricesApi } from 'context/api/imoveis/prices';

export const Left = () => {
	const { initialMarker } = useIsochroneApi();
	const { linesData } = useLinesApi();
	const { pricesData } = usePricesApi();

	return (
		<div className="left">
			<div className="airbnb-message-wrapper">
				{!initialMarker && linesData && pricesData ?
					<div className="airbnb-sidebar-items">
						<SvgMap/>
						<Prices 
							linesData={linesData} 
							pricesData={pricesData}
						/>
						<Timeseries/>
					</div> :
					<Message/>
				}
			</div>
		</div>
	)
}

Left.displayName="Left";