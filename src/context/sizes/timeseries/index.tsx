// React imports
import { useState, useContext, createContext } from 'react';

const TimeseriesSizesContext: React.Context<any> = createContext(null)

export const useTimeseriesSizes = () => {
	return (
		useContext(TimeseriesSizesContext)
	)
}

export const TimeseriesSizesProvider = ({children}: any) => {
	const [ width, setWidth ] = useState<any>(null);
	const [ height, setHeight ] = useState<any>(null);

	const margin = {top: 20, bottom: 32, left: 60, right: 20}

	const innerWidth = width - margin.right - margin.left;
	const innerHeight = height - margin.top - margin.bottom;

	return (
		<TimeseriesSizesContext.Provider value={{
			margin,
			width,
			height,
			setWidth,
			setHeight,
			innerWidth,
			innerHeight,
		}}>
			{children}
		</TimeseriesSizesContext.Provider>
	)
}

TimeseriesSizesContext.displayName = "TimeseriesSizesContext";