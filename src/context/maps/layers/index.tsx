// App imports
import { PointsLayerProvider } from './points';

export const LayersProvider = ({children}: any) => {
  return (
    <PointsLayerProvider>
      {children}
    </PointsLayerProvider>
  )
}

LayersProvider.displayName="LayersProvider";