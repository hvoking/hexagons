// React imports
import { useState, useContext, createContext } from 'react';

const PdfIsoPolygonSizesContext: React.Context<any> = createContext(null)

export const usePdfIsoPolygonSizes = () => {
	return (
		useContext(PdfIsoPolygonSizesContext)
	)
}

export const PdfIsoPolygonSizesProvider = ({children}: any) => {
	const [ width, setWidth ] = useState<any>(null);
	const [ height, setHeight ] = useState<any>(null);

	const margin = { top: 5, bottom: 5, left: 5, right: 5 }

	const innerWidth = width - margin.right - margin.left;
	const innerHeight = height - margin.top - margin.bottom;

	return (
		<PdfIsoPolygonSizesContext.Provider value={{
			margin,
			width,
			height,
			setWidth,
			setHeight,
			innerWidth,
			innerHeight,
		}}>
			{children}
		</PdfIsoPolygonSizesContext.Provider>
	)
}

PdfIsoPolygonSizesContext.displayName = "PdfIsoPolygonSizesContext";