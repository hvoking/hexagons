// React imports
import { useState, useEffect, useContext, createContext } from 'react';

// Context imports
import { useIsochroneApi } from '../isochrone';
import { usePrices } from 'context/filters/prices';
import { useDates } from 'context/filters/dates';
import { useEquipment } from 'context/filters/equipment';

// Third-party imports
import * as d3 from 'd3';

const HexagonsApiContext: React.Context<any> = createContext(null)

export const useHexagonsApi = () => {
	return (
		useContext(HexagonsApiContext)
	)
}

export const HexagonsApiProvider = ({children}: any) => {
	const { rooms } = useEquipment();
	const { isochroneData } = useIsochroneApi();
	const { leftPosition, rightPosition } = usePrices();
	const { formatedStartDate, formatedFinalDate } = useDates();
	
	const [ hexagonsData, setHexagonsData ] = useState<any>(null);

	useEffect(() => {
		const fetchData = async () => {
			const tempUrl = `
				${process.env.REACT_APP_API_URL}/
				hexagons_api
			`;
			const url = tempUrl.replace(/\s/g, '');
			const res = await fetch(url);
			const receivedData = await res.json();
			setHexagonsData(receivedData[0]);
		}
		isochroneData && fetchData();
	}, [ isochroneData ]);

	const hexagonAvg: any = (properties: any) => {
	  const filteredProperties = properties.filter((item: any) => 
	    item.price > leftPosition &&
	    item.price < rightPosition &&
	    new Date(item.first_review) >= formatedStartDate &&
	    new Date(item.first_review) <= formatedFinalDate &&
	    (!rooms || item.rooms === rooms)
	  );

	  const prices = filteredProperties.map((item: any) => item.price);
	  return d3.mean(prices);
	};

	const hexLen = hexagonsData?.map((item: any) => item.properties.length);
	const maxLength: any = hexLen && d3.max(hexLen);

	const opacityScale = maxLength && d3.scaleLinear()
		.range([0.6, 1])
		.domain([0, maxLength]);

	return (
		<HexagonsApiContext.Provider 
			value={{ hexagonsData, hexagonAvg, opacityScale }}>
			{children}
		</HexagonsApiContext.Provider>
	)
}

HexagonsApiContext.displayName = "HexagonsApiContext";