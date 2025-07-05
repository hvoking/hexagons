// React imports
import { useCallback } from 'react';

// App imports
import './styles.scss';

// Context imports
import { useGeo } from 'context/geo';
import { useIsochroneApi } from 'context/api/isochrone';

// Third-party imports
import { Marker } from 'react-map-gl/mapbox';

export const Pin = () => {
	const { initialMarker, setInitialMarker } = useIsochroneApi();
	const { marker, setMarker, setPlaceCoordinates } = useGeo();

	const onMarkerDrag = useCallback((event: any) => {
		setMarker({
			longitude: event.lngLat.lng,
			latitude: event.lngLat.lat
		});
	}, []);

	const onMarkerDragEnd = useCallback((event: any) => {
		setInitialMarker(false);
		setPlaceCoordinates({
			longitude: event.lngLat.lng,
			latitude: event.lngLat.lat
		});
	}, []);
	  
	return (
		<>
			<Marker
		      longitude={marker.longitude}
		      latitude={marker.latitude}
		      anchor="bottom"
		      draggable
		      onDrag={onMarkerDrag}
		      onDragEnd={onMarkerDragEnd}
		    >
		      <img 
			      style={{width: "25px"}} 
			      src={process.env.PUBLIC_URL + "/static/components/maps/marker.svg"}
			      alt="marker"
		     />
		    </Marker>
		    {initialMarker && 
				<div className="initial-marker-text">
					Drag the pin
				</div>
			}
		</>
	)
}

Pin.displayName="Pin";