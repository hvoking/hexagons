// React imports
import { useState, useContext, createContext } from 'react';

const PdfAreasSizesContext: React.Context<any> = createContext(null)

export const usePdfAreasSizes = () => {
	return (
		useContext(PdfAreasSizesContext)
	)
}

export const PdfAreasSizesProvider = ({children}: any) => {
	const [ width, setWidth ] = useState<any>(null);
	const [ height, setHeight ] = useState<any>(null);

	const margin = { top: 20, bottom: 10, right: 30, left: 30 }

	const innerWidth = width - margin.right - margin.left;
	const innerHeight = height - margin.top - margin.bottom;

	return (
		<PdfAreasSizesContext.Provider value={{
			margin,
			width,
			height,
			setWidth,
			setHeight,
			innerWidth,
			innerHeight,
		}}>
			{children}
		</PdfAreasSizesContext.Provider>
	)
}

PdfAreasSizesContext.displayName = "PdfAreasSizesContext";