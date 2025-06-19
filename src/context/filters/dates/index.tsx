// React imports
import { useState, useContext, createContext } from 'react';

const DatesContext: React.Context<any> = createContext(null)

export const useDates = () => {
	return (
		useContext(DatesContext)
	)
}

export const DatesProvider = ({children}: any) => {
	const [ startDate, setStartDate ] = useState<any>("02-03-2023");
	const [ finalDate, setFinalDate ] = useState<any>("24-03-2024");
	const [ dates, setDates ] = useState([new Date("2023-03-01"), new Date("2024-03-24")]);

  	const startDateParts = startDate.split("-");
	const formatedStartDate = new Date(`${startDateParts[2]}-${startDateParts[1]}-${startDateParts[0]}`);

	const finalDateParts = finalDate.split("-");
	const formatedFinalDate = new Date(`${finalDateParts[2]}-${finalDateParts[1]}-${finalDateParts[0]}`);

	return (
		<DatesContext.Provider value={{
			startDate, setStartDate, 
			finalDate, setFinalDate,
			dates, setDates,
			formatedStartDate, formatedFinalDate
		}}>
			{children}
		</DatesContext.Provider>
	)

}

DatesContext.displayName = "DatesContext";