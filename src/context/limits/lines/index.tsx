// React imports
import { useContext, createContext } from 'react';

// Context imports
import { useLinesApi } from '../../api/imoveis/lines';
 
const LinesLimitsContext: React.Context<any> = createContext(null)

export const useLinesLimits = () => {
	return (
		useContext(LinesLimitsContext)
	)
}

export const LinesLimitsProvider = ({children}: any) => {
	const { linesData } = useLinesApi();

	const bottomLimit = linesData && linesData.bottom_limit_price;
  	const topLimit = linesData && linesData.top_limit_price;
	const minLine = linesData && linesData.min_line_price;
	const meanLine = linesData && linesData.mean_line_price;
	const maxLine = linesData && linesData.max_line_price;

	return (
		<LinesLimitsContext.Provider value={{
			bottomLimit, topLimit,
			minLine, meanLine, maxLine
		}}>
			{children}
		</LinesLimitsContext.Provider>
	)
}

LinesLimitsContext.displayName = "LinesLimitsContext";