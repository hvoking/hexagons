// App imports
import { LayersProvider } from './layers';
import { TooltipProvider } from './tooltip';

export const MapsProvider = ({children}: any) => {
  return (
    <TooltipProvider>
    <LayersProvider>
      {children}
    </LayersProvider>
    </TooltipProvider>
  )
}

MapsProvider.displayName="MapsProvider";