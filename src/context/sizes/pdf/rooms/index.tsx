// React imports
import { useState, useContext, createContext } from 'react';

const PdfRoomsSizesContext: React.Context<any> = createContext(null)

export const usePdfRoomsSizes = () => {
	return (
		useContext(PdfRoomsSizesContext)
	)
}

export const PdfRoomsSizesProvider = ({children}: any) => {
	const [ width, setWidth ] = useState<any>(null);
	const [ height, setHeight ] = useState<any>(null);

	const margin = { top: 0, bottom: 0, right: 0, left: 0 }

	const innerWidth = width - margin.right - margin.left;
	const innerHeight = height - margin.top - margin.bottom;

	return (
		<PdfRoomsSizesContext.Provider value={{
			margin,
			width,
			height,
			setWidth,
			setHeight,
			innerWidth,
			innerHeight,
		}}>
			{children}
		</PdfRoomsSizesContext.Provider>
	)
}

PdfRoomsSizesContext.displayName = "PdfRoomsSizesContext";