// App imports
import { LinesLimitsProvider } from './lines';
import { PricesLimitsProvider } from './prices';

export const LimitsProvider = ({children}: any) => {
  return (
    <LinesLimitsProvider>
    <PricesLimitsProvider>
      {children}
    </PricesLimitsProvider>
    </LinesLimitsProvider>
  )
}

LimitsProvider.displayName="LimitsProvider";

export * from './lines';
export * from './prices';