// React imports
import { useState, useContext, createContext } from 'react';

const PricesSizesContext: React.Context<any> = createContext(null)

export const usePricesSizes = () => {
	return (
		useContext(PricesSizesContext)
	)
}

export const PricesSizesProvider = ({children}: any) => {
	const [ width, setWidth ] = useState<any>(null);
	const [ height, setHeight ] = useState<any>(null);

	const margin = { top: 20, bottom: 55, left: 30, right: 30 }

	const innerWidth = width - margin.right - margin.left;
	const innerHeight = height - margin.top - margin.bottom;

	return (
		<PricesSizesContext.Provider value={{
			margin,
			width,
			height,
			setWidth,
			setHeight,
			innerWidth,
			innerHeight,
		}}>
			{children}
		</PricesSizesContext.Provider>
	)
}

PricesSizesContext.displayName = "PricesSizesContext";