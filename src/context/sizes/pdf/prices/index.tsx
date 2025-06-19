// React imports
import { useState, useContext, createContext } from 'react';

const PdfPricesSizesContext: React.Context<any> = createContext(null)

export const usePdfPricesSizes = () => {
	return (
		useContext(PdfPricesSizesContext)
	)
}

export const PdfPricesSizesProvider = ({children}: any) => {
	const [ width, setWidth ] = useState<any>(null);
	const [ height, setHeight ] = useState<any>(null);

	const margin = { top: 20, bottom: 10, left: 30, right: 30 }

	const innerWidth = width - margin.right - margin.left;
	const innerHeight = height - margin.top - margin.bottom;

	return (
		<PdfPricesSizesContext.Provider value={{
			margin,
			width,
			height,
			setWidth,
			setHeight,
			innerWidth,
			innerHeight,
		}}>
			{children}
		</PdfPricesSizesContext.Provider>
	)
}

PdfPricesSizesContext.displayName = "PdfPricesSizesContext";