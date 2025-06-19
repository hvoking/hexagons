// React imports
import { useState, useContext, createContext } from 'react';

const PropertyTypeContext: React.Context<any> = createContext(null)

export const usePropertyType = () => {
	return (
		useContext(PropertyTypeContext)
	)
}

export const PropertyTypeProvider = ({children}: any) => {
	const [ nearest, setNearest ] = useState(16);
	const [ activeEquipment, setActiveEquipment ] = useState("");

	const [ samplesIds, setSamplesIds ] = useState<any>([]);
	const [ rejectedIds, setRejectedIds ] = useState<any>([]);
	const [ currentPropertyId, setCurrentPropertyId ] = useState<any>(null);

	return (
		<PropertyTypeContext.Provider value={{
			nearest, setNearest,
			samplesIds, setSamplesIds,
			rejectedIds, setRejectedIds,
			currentPropertyId, setCurrentPropertyId,
			activeEquipment, setActiveEquipment,
		}}>
			{children}
		</PropertyTypeContext.Provider>
	)
}

PropertyTypeContext.displayName = "PropertyTypeContext";