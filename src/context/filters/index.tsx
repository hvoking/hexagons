// App imports
import { PropertyTypeProvider } from './property';
import { EquipmentProvider } from './equipment';
import { DatesProvider } from './dates';
import { PricesProvider } from './prices';
import { GeoProvider } from './geo';

export const FiltersProvider = ({children}: any) => {
  return (
    <PropertyTypeProvider>
    <EquipmentProvider>
    <GeoProvider>
    <DatesProvider>
    <PricesProvider>
      {children}
    </PricesProvider>
    </DatesProvider>
    </GeoProvider>
    </EquipmentProvider>
    </PropertyTypeProvider>
  )
}

FiltersProvider.displayName="FiltersProvider";