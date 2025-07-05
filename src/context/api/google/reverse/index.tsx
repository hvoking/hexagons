// React imports
import { useState, useEffect, useContext, createContext } from 'react';

// Context imports
import { useGeo } from 'context/geo';

const ReverseGeocodingApiContext: React.Context<any> = createContext(null)

export const useReverseGeocodingApi = () => useContext(ReverseGeocodingApiContext)

export const ReverseGeocodingApiProvider = ({children}: any) => {
	const { viewport } = useGeo();
	const [ currentAddress, setCurrentAddress ] = useState<any>(null);

	const getCurrentAddress = async (lng: any, lat: any) => {
		const tempUrl = `
			${process.env.REACT_APP_API_URL}/
			reverse_api
			?language=en
			&latitude=${lat}
			&longitude=${lng}
		`;
		const url = tempUrl.replace(/\s/g, '');
		try {
			const res = await fetch(url);
			if (!res.ok) {
				throw new Error(`HTTP error! status: ${res.status}`);
			}
			const receivedData = await res.json();
			const placeInformation = receivedData.address_components;
			return placeInformation;
		} 
		catch (error) {
			console.error("Error fetching address:", error);
			return null;
		}
	};

	useEffect(() => {
		const { longitude, latitude } = viewport;
		
		const fetchData = async () => {
			const tempUrl = `
				${process.env.REACT_APP_API_URL}/
				reverse_api
				?language=en
				&latitude=${latitude}
				&longitude=${longitude}
			`;
			const url = tempUrl.replace(/\s/g, '');
			try {
				const res = await fetch(url);
				if (!res.ok) {
					throw new Error(`HTTP error! status: ${res.status}`);
				}
				const receivedData = await res.json();
				const placeInformation = receivedData.address_components;
				setCurrentAddress(placeInformation);
			}
			catch (error) {
				console.error("Error fetching address:", error);
				return null;
			}
		}
		fetchData();
	}, [ viewport ]);

	let country = '';
	let city = '';

	const addressLevels = [ 'administrative_area_level_2', 'locality', 'postal_town', 'city' ]

	currentAddress?.forEach((item: any) => {
	    if (item.types.includes('country')) {
	        country = item.long_name;
	    }
	    if (item.types.some((type: string) => addressLevels.includes(type))) {
	        city = item.long_name;
	    }
	});

	const placeInfo = city ? [ city, country ].join(", ") : country ? country : ""; 

	return (
		<ReverseGeocodingApiContext.Provider value={{ 
			getCurrentAddress, 
			currentAddress, 
			setCurrentAddress, 
			placeInfo 
		}}>
			{children}
		</ReverseGeocodingApiContext.Provider>
	)
}

ReverseGeocodingApiContext.displayName = "ReverseGeocodingApiContext";