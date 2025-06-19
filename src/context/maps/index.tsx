// App imports
import { LayersProvider } from './layers';
import { TooltipProvider } from './tooltip';
import { MapboxProvider } from './mapbox';

export const MapsProvider = ({children}: any) => {
  return (
    <MapboxProvider>
    <TooltipProvider>
    <LayersProvider>
      {children}
    </LayersProvider>
    </TooltipProvider>
    </MapboxProvider>
  )
}

MapsProvider.displayName="MapsProvider";