// React imports
import { useState, useContext, createContext } from 'react';

const TooltipContext: React.Context<any> = createContext(null)

export const useTooltip = () => {
  return (
    useContext(TooltipContext)
  )
}

export const TooltipProvider = ({children}: any) => {
  const [ propertyHoverInfo, setPropertyHoverInfo ] = useState(null);
  const [ propertyInfo, setPropertyInfo ] = useState(null);
  const [ activePropertyInfo, setActivePropertyInfo ] = useState(false);
  const [ pdfAdInfo, setPdfAdInfo ] = useState(null);

  return (
    <TooltipContext.Provider value={{ 
      propertyHoverInfo, setPropertyHoverInfo, 
      propertyInfo, setPropertyInfo,
      pdfAdInfo, setPdfAdInfo,
      activePropertyInfo, setActivePropertyInfo,
    }}>
      {children}
    </TooltipContext.Provider>
  )
}

TooltipContext.displayName = "TooltipContext";