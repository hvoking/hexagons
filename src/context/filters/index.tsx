// App imports
import { PropertyTypeProvider } from './property';
import { EquipmentProvider } from './equipment';
import { DatesProvider } from './dates';
import { PricesProvider } from './prices';

export const FiltersProvider = ({children}: any) => {
  return (
    <PropertyTypeProvider>
    <EquipmentProvider>
    <DatesProvider>
    <PricesProvider>
      {children}
    </PricesProvider>
    </DatesProvider>
    </EquipmentProvider>
    </PropertyTypeProvider>
  )
}

FiltersProvider.displayName="FiltersProvider";