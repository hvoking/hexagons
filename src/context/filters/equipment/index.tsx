// React imports
import { useState, useContext, createContext } from 'react';

const EquipmentContext: React.Context<any> = createContext(null)

export const useEquipment = () => {
	return (
		useContext(EquipmentContext)
	)
}

export const EquipmentProvider = ({children}: any) => {
	const [ rooms, setRooms ] = useState<any>(null);
	
	return (
		<EquipmentContext.Provider value={{
			rooms, setRooms, 
		}}>
			{children}
		</EquipmentContext.Provider>
	)
}

EquipmentContext.displayName = "EquipmentContext";