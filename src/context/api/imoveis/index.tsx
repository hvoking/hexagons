// App imports
import { RoomsApiProvider } from './rooms';
import { PricesApiProvider } from './prices';
import { LinesApiProvider } from './lines';

export const ImoveisApiProvider = ({children}: any) => {
  return (
    <RoomsApiProvider>
    <LinesApiProvider>
    <PricesApiProvider>
      {children}
    </PricesApiProvider>
    </LinesApiProvider>
    </RoomsApiProvider>
  )
}

ImoveisApiProvider.displayName="ImoveisApiProvider";