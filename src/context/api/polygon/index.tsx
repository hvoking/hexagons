// React imports
import { useState, useEffect, useContext, createContext } from 'react';

// Context imports
import { useGeo } from '../../filters/geo';
import { useIsochroneApi } from '../isochrone';

const PolygonApiContext: React.Context<any> = createContext(null)

export const usePolygonApi = () => {
	return (
		useContext(PolygonApiContext)
	)
}

export const PolygonApiProvider = ({children}: any) => {
	const { placeCoordinates } = useGeo();
	const { isochroneData } = useIsochroneApi();

	const [ polygonData, setPolygonData ] = useState<any>(null);

	useEffect(() => {
		const fetchData = async () => {
			const { longitude, latitude } = placeCoordinates;
			const polygon = isochroneData.features[0].geometry;

			const res = await fetch(`${process.env.REACT_APP_API_URL}/polygon_api`, {
				method: "POST",
				headers: {'Content-Type': 'application/json'},
				body: JSON.stringify({ 
					"polygon": JSON.stringify(polygon),
					"longitude": JSON.stringify(longitude),
					"latitude": JSON.stringify(latitude),
					"schema": "limits",
					"table": "london",
				}),
			});
			const receivedData = await res.json();
			setPolygonData(receivedData[0]);
		}
		isochroneData && fetchData();
	}, [ isochroneData ]);

	return (
		<PolygonApiContext.Provider value={{ polygonData }}>
			{children}
		</PolygonApiContext.Provider>
	)
}

PolygonApiContext.displayName = "PolygonApiContext";