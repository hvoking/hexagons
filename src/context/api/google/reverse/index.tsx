// React imports
import { useState, useEffect, useContext, createContext } from 'react';

// Context imports
import { usePolygonApi } from '../../polygon';

const ReverseGeocodingApiContext: React.Context<any> = createContext(null)

export const useReverseGeocodingApi = () => {
	return (
		useContext(ReverseGeocodingApiContext)
	)
}

export const ReverseGeocodingApiProvider = ({children}: any) => {
	const { polygonData } = usePolygonApi();
	const [ currentAddress, setCurrentAddress ] = useState<any>(null);

	useEffect(() => {
	  const fetchData = async () => {
	    const tempUrl = `
	    	${process.env.REACT_APP_API_URL}/
	    	reverse_api
	    	?language=en
	    `;
	    const url = tempUrl.replace(/\s/g, '');
	    const res = await fetch(url);
	    const receivedData = await res.json();
	    const placeName = receivedData.formatted_address;
	    setCurrentAddress(placeName);
	  }
	  polygonData && fetchData();
	}, [ polygonData ]);

	return (
		<ReverseGeocodingApiContext.Provider value={{ currentAddress, setCurrentAddress }}>
			{children}
		</ReverseGeocodingApiContext.Provider>
	)
}

ReverseGeocodingApiContext.displayName = "ReverseGeocodingApiContext";