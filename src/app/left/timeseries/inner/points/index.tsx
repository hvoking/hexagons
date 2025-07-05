// Context imports
import { useTooltip } from '../../../../../context/maps/tooltip';
import { useLinesLimits } from '../../../../../context/limits/lines';
import { usePricesLimits } from '../../../../../context/limits/prices';

export const Points = ({ linesData, pricesData, xScale, yScale }: any) => {
    const { propertyHoverInfo } = useTooltip();
    const { bottomLimit, topLimit } = useLinesLimits();
    const { filterPrices } = usePricesLimits();

    const currentPropertyId = propertyHoverInfo && propertyHoverInfo.object && propertyHoverInfo.object.property_id;
    
    return (
        filterPrices.map((item: any, i: number) => {
            return (
                <circle 
                    key={i}
                    cx={xScale(Date.parse(item.start_date))} 
                    cy={yScale(item['price'])}
                    r={
                        currentPropertyId === item.property_id ? 5 : 
                        1.6
                    }
                    fill={
                        currentPropertyId === item.property_id ? 
                        "rgba(222, 222, 0, 1)" :
                        item['price'] > topLimit ?
                        "rgba(166, 166, 244, 1)" :
                        item['price'] < bottomLimit?
                        "rgba(255, 0, 0, 1)" : 
                        "rgba(57, 181, 74, 1)"
                    }
                    stroke={"none"}
                />
            )
        }
    )
    
)}
