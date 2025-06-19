// App imports
import { PolygonApiProvider } from './polygon';
import { GoogleApiProvider } from './google';
import { ImoveisApiProvider } from './imoveis';
import { IsochroneApiProvider } from './isochrone';
import { HexagonsApiProvider } from './hexagons';

export const ApiProvider = ({children}: any) => {
  return (
    <IsochroneApiProvider>
    <PolygonApiProvider>
    <HexagonsApiProvider>
    <GoogleApiProvider>
    <ImoveisApiProvider>
      {children}
    </ImoveisApiProvider>
    </GoogleApiProvider>
    </HexagonsApiProvider>
    </PolygonApiProvider>
    </IsochroneApiProvider>
  )
}

ApiProvider.displayName="ApiProvider";