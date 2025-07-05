// React imports
import { useState, useEffect, useContext, createContext } from 'react';

// Context imports
import { useGeo } from 'context/geo';

const GoogleDetailsApiContext: React.Context<any> = createContext(null)

export const useGoogleDetailsApi = () => useContext(GoogleDetailsApiContext)

export const GoogleDetailsApiProvider = ({children}: any) => {
	const { placeId, setViewport } = useGeo();
	const [ googleDetailsData, setGoogleDetailsData ] = useState<any>(null);
	
	useEffect(() => {
	  const fetchData = async () => {
	    const tempUrl = `
	    	${process.env.REACT_APP_API_URL}/
	    	details_api
	    	?place_id=${placeId}
	    `;
	    const url = tempUrl.replace(/\s/g, '');
	    try {
	    	const res = await fetch(url);
			if (!res.ok) {
	  			throw new Error(`HTTP error! status: ${res.status}`);
	  		}
	    	const receivedData = await res.json();
	    	setGoogleDetailsData(receivedData)	
	    }
	    catch (error) {
	    	console.error("Error fetching address:", error);
	    	return null;
	    }
	    
	  }
	  placeId && fetchData();
	}, [ placeId ]);

	useEffect(() => {
		if (googleDetailsData) {
			const { lng, lat } = googleDetailsData.geometry.location;
			setViewport((prev: any) => ({
				...prev, 
				longitude: lng, 
				latitude: lat
			}));
		}
	}, [ googleDetailsData, setViewport ])

	return (
		<GoogleDetailsApiContext.Provider value={{ googleDetailsData }}>
			{children}
		</GoogleDetailsApiContext.Provider>
	)
}

GoogleDetailsApiContext.displayName = "GoogleDetailsApiContext";