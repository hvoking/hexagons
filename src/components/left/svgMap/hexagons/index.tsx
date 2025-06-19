// Context imports
import { useHexagonsApi } from '../../../../context/api/hexagons';
import { useLinesLimits } from '../../../../context/limits/lines';

export const Hexagons = ({ path }: any) => {
	const { hexagonsData, hexagonAvg, opacityScale } = useHexagonsApi();
	const { bottomLimit, topLimit } = useLinesLimits();

	return (
		<>
			{hexagonsData && hexagonsData.map((item: any, index: any) => {
				const avg = hexagonAvg(item.properties);
				const propertiesLength = item.properties.length;
				const opacity = opacityScale(propertiesLength);

				return (
					<path
						key={index}
						fill={
							avg > topLimit ?
						    `rgba(42, 43, 96, ${opacity})` :
						    avg < bottomLimit ?
						    `rgba(68, 27, 30, ${opacity})` : 
						    avg > bottomLimit && avg < topLimit ?
						    `rgba(21, 59, 39, ${opacity})` :
						    `rgba(23, 23, 32, 1)`
						}
						stroke={
							avg > topLimit ?
						    `rgba(166, 166, 244, ${opacity})` :
						    avg < bottomLimit ?
						    `rgba(255, 0, 0, ${opacity})` : 
						    avg > bottomLimit && avg < topLimit ?
						    `rgba(57, 181, 74, ${opacity})` :
						    "rgba(255, 255, 255, 0.1)"
						}
						strokeWidth={0.4}
						className="feature" 
						d={`${path(item.hex_geom)}`}
					/>
				)
			})}
		</>
	)
}

Hexagons.displayName="Hexagons";