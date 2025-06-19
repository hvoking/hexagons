// App imports
import { FiltersProvider } from './filters';
import { MapsProvider } from './maps';
import { ApiProvider } from './api';
import { SizesProvider } from './sizes';
import { LimitsProvider } from './limits';

export const MainProvider = ({children}: any) => {
  return (
    <FiltersProvider>
    <ApiProvider>
    <LimitsProvider>
    <SizesProvider>
    <MapsProvider>
      {children}
    </MapsProvider>
    </SizesProvider>
    </LimitsProvider>
    </ApiProvider>
    </FiltersProvider>
  )
}

MainProvider.displayName="MainProvider";

export * from './filters';
export * from './maps';
export * from './api';
export * from './sizes';
export * from './limits';