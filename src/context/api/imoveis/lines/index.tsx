// React imports
import { useState, useEffect, useContext, createContext } from 'react';

// App imports
import { datesFormat } from '../../../../utils/constants';

// Context imports
import { usePolygonApi } from '../../polygon';
import { usePropertyType } from '../../../filters/property';
import { useDates } from '../../../filters/dates';

const LinesApiContext: React.Context<any> = createContext(null)

export const useLinesApi = () => {
	return (
		useContext(LinesApiContext)
	)
}

export const LinesApiProvider = ({children}: any) => {
	const { polygonData } = usePolygonApi();
	const { nearest } = usePropertyType();
	const { dates } = useDates();

	const [ linesData, setLinesData ] = useState<any>(null);

	useEffect(() => {
		const fetchData = async () => {
		  	const tempUrl = `
		    	${process.env.REACT_APP_API_URL}/
		    	airbnb_lines_api
		    	?start_date=${datesFormat(dates[0])}
		    	&final_date=${datesFormat(dates[1])}
		    	&k=${nearest}
		    `
		    const url = tempUrl.replace(/\s/g, '');
		    const res = await fetch(url);
		    const receivedData = await res.json();
			setLinesData(receivedData[0]);
		}
		polygonData && fetchData();
	}, [ polygonData, nearest, dates ]);

	return (
		<LinesApiContext.Provider value={{ linesData }}>
			{children}
		</LinesApiContext.Provider>
	)
}

LinesApiContext.displayName = "LinesApiContext";