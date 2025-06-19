// React imports
import { useState, useEffect, useContext, createContext } from 'react';

// Context imports
import { useGeo } from '../../filters/geo';

const IsochroneApiContext: React.Context<any> = createContext(null)

export const useIsochroneApi = () => {
	return (
		useContext(IsochroneApiContext)
	)
}

export const IsochroneApiProvider = ({children}: any) => {
	const { placeCoordinates } = useGeo();

	const [ routingProfile, setRoutingProfile ] = useState("walking");
	const [ contoursMinutes, setContoursMinutes ] = useState(30);
	const [ initialMarker, setInitialMarker ] = useState(true);
	
	const [ isochroneData, setIsochroneData ] = useState<any>(null);

	useEffect(() => {
		const fetchData = async () => {
		    const tempUrl = `
		    	https://api.mapbox.com/isochrone/v1/mapbox/
		    	${routingProfile}/
		    	${placeCoordinates.longitude}%2C
		    	${placeCoordinates.latitude}
		    	?contours_minutes=${contoursMinutes}
		    	&polygons=true
		    	&denoise=1
		    	&access_token=${process.env.REACT_APP_MAPBOX_TOKEN}
		    `;
		    const url = tempUrl.replace(/\s/g, '');
		    const res = await fetch(url);
		    const receivedData = await res.json();
		    setIsochroneData(receivedData);
		}
		!initialMarker && fetchData();
	}, [ initialMarker, placeCoordinates, routingProfile, contoursMinutes ]);

	return (
		<IsochroneApiContext.Provider value={{ 
			initialMarker, setInitialMarker,
			isochroneData,
			routingProfile, setRoutingProfile,
			contoursMinutes, setContoursMinutes,
		}}>
			{children}
		</IsochroneApiContext.Provider>
	)
}

IsochroneApiContext.displayName = "IsochroneApiContext";