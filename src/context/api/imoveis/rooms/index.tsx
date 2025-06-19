// React imports
import { useState, useEffect, useContext, createContext } from 'react';

// Context imports
import { usePolygonApi } from '../../polygon';
import { useDates } from '../../../filters/dates';

const RoomsApiContext: React.Context<any> = createContext(null)

export const useRoomsApi = () => {
	return (
		useContext(RoomsApiContext)
	)
}

export const RoomsApiProvider = ({children}: any) => {
	const { polygonData } = usePolygonApi();
	const { startDate, finalDate } = useDates();
	
	const [ roomsData, setRoomsData ] = useState<any>(null);
	
	useEffect(() => {
	  const fetchData = async () => {
	  	const tempUrl = `
	    	${process.env.REACT_APP_API_URL}/
	    	airbnb_rooms_api
			?start_date=${startDate}
	    	&final_date=${finalDate}
	    `
	  	const url = tempUrl.replace(/\s/g, '');
	    const res = await fetch(url);
	    const receivedData = await res.json();
	    setRoomsData(receivedData);
	  }
	  polygonData && fetchData();
	}, [ polygonData ]);

	return (
		<RoomsApiContext.Provider value={{ roomsData }}>
			{children}
		</RoomsApiContext.Provider>
	)
}

RoomsApiContext.displayName = "RoomsApiContext";