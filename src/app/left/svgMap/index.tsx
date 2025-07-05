// React imports
import { useState, useRef } from 'react';

// App imports
import { Hexagons } from './hexagons';
import { SVGWrapper } from './svg';
import { Location } from './location';
import { Pin } from './pin';
import './styles.scss';

// Context imports
import { usePolygonApi } from 'context/api/polygon';
import { useIsochroneApi } from 'context/api/isochrone';
import { useSvgMapSizes } from 'context/sizes/svgMap';
import { useGeo } from 'context/geo';
import { useReverseGeocodingApi } from 'context/api/google/reverse';

// Third-party imports
import * as d3 from 'd3';

export const SvgMap = () => {
	const svgContainerRef = useRef<any>(null);
	const [ currentTransform, setCurrentTransform ] = useState<any>(null);

	const { polygonData } = usePolygonApi();
	const { isochroneData } = useIsochroneApi();
	const { innerWidth, innerHeight } = useSvgMapSizes();
	const { placeCoordinates, setPlaceCoordinates } = useGeo();
	const { currentAddress } = useReverseGeocodingApi();

	if (!isochroneData || !polygonData || !polygonData[0]) return (<></>)

	const city = polygonData[0].city_geom[0];

	const projection = d3.geoIdentity()
		.reflectY(true)
		.fitSize([ innerWidth, innerHeight ], city)

	const path = d3.geoPath(projection);

	const onClick = (e: any) => {
		const rect = svgContainerRef.current.getBoundingClientRect();
		const adjustedCoordinates: any = [e.clientX - rect.left, e.clientY - rect.top];
		const transformedCoordinates = currentTransform ? currentTransform.invert(adjustedCoordinates) : adjustedCoordinates;
	    const [lng, lat]: any = projection.invert(transformedCoordinates);
	    setPlaceCoordinates({ latitude: lat, longitude: lng });
	}

	const pinCoordinates: any = projection([placeCoordinates.longitude, placeCoordinates.latitude]);

	return (
		<div className="airbnb-svgmap-wrapper">
			<div className="sidebar-sub-title">London, England</div>
			<div style={{display: "grid", gridTemplateColumns: "20px auto 20px"}}>
				<div></div>
				<div ref={svgContainerRef}>
					<SVGWrapper setCurrentTransform={setCurrentTransform}>
						<g onClick={onClick}>
							<Hexagons path={path}/>
							<Pin pinCoordinates={pinCoordinates}/>
						</g>
					</SVGWrapper>
				</div>
				<div></div>
			</div>
			<Location currentAddress={currentAddress}/>
		</div>
	)
}

SvgMap.displayName="SvgMap";