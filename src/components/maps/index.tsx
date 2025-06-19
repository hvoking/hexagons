// React imports
import { useCallback } from 'react';

// App imports
import { Pin } from './pin';
import { Hexagons } from './hexagons';
import './styles.scss';

// Context imports
import { useMapbox } from 'context/maps/mapbox';
import { useGeo } from 'context/filters/geo';
import { useIsochroneApi } from 'context/api/isochrone';

// Third-party imports
import { Map } from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';

export const Maps = () => {
	const { mapRef, currentBasemap } = useMapbox();
	const { viewport, setMarker, setPlaceCoordinates } = useGeo();
	const { setInitialMarker } = useIsochroneApi();

	const onDblClick = useCallback((event: any) => {
		const lng = event.lngLat.lng;
		const lat = event.lngLat.lat;
		setInitialMarker(false);
		setPlaceCoordinates({ longitude: lng, latitude: lat });
		setMarker({ longitude: lng, latitude: lat });
	}, []);

	return (
		<div className="map-wrapper">
			<Map
				ref={mapRef}
				initialViewState={viewport}
				mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN} 
				mapStyle={currentBasemap}
				onDblClick={onDblClick}
				doubleClickZoom={false}
				antialias={true}
				preserveDrawingBuffer={true}
			>
				<Pin/>
				<Hexagons/>
			</Map>
		</div>
	)
}

Maps.displayName="Maps";