// App imports
import { PdfRoomsSizesProvider } from './rooms';
import { PdfDsvSizesProvider } from './dsv';
import { PdfAreasSizesProvider } from './areas';
import { PdfIsoPolygonSizesProvider } from './isoPolygon';
import { PdfPricesSizesProvider } from './prices';

export const PdfSizesProvider = ({ children }: any) => {
	return (
		<PdfDsvSizesProvider>
		<PdfAreasSizesProvider>
		<PdfRoomsSizesProvider>
		<PdfIsoPolygonSizesProvider>
		<PdfPricesSizesProvider>
			{children}			
		</PdfPricesSizesProvider>
		</PdfIsoPolygonSizesProvider>
		</PdfRoomsSizesProvider>
		</PdfAreasSizesProvider>
		</PdfDsvSizesProvider>
	)
}

PdfSizesProvider.displayName="PdfSizesProvider"