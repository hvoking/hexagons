// App imports
import { SvgMapSizesProvider } from './svgMap';
import { RoomsGaugeSizesProvider } from './rooms';
import { PricesSizesProvider } from './prices';
import { PdfSizesProvider } from './pdf';
import { BottomSizesProvider } from './bottom';
import { TimeseriesSizesProvider } from './timeseries';

export const SizesProvider = ({children}: any) => {
  return (
   
    <SvgMapSizesProvider>
    <RoomsGaugeSizesProvider>
    <PricesSizesProvider>
    <PdfSizesProvider>
    <BottomSizesProvider>
    <TimeseriesSizesProvider>
      {children}
    </TimeseriesSizesProvider>
    </BottomSizesProvider>
    </PdfSizesProvider>
    </PricesSizesProvider>
    </RoomsGaugeSizesProvider>
    </SvgMapSizesProvider>
   
  )
}

SizesProvider.displayName="SizesProvider";