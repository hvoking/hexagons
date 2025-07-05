// React imports
import { useState, useEffect, useRef, useContext, createContext } from 'react';

// App imports
import * as Locations from './locations';

const GeoContext: React.Context<any> = createContext(null)

export const useGeo = () => {
	return (
		useContext(GeoContext)
	)
}

export const GeoProvider = ({children}: any) => {
	const [ cityId, setCityId ] = useState<any>(37);
	const [ placeId, setPlaceId ] = useState<any>(null);
	
	const [ viewport, setViewport ] = useState(Locations.london);
	const [ placeCoordinates, setPlaceCoordinates ] = useState<any>(null);

	const [ geocodingLongitude, setGeocodingLongitude ] = useState<any>(null);
	const [ geocodingLatitude, setGeocodingLatitude ] = useState<any>(null);

	const [ marker, setMarker ] = useState({ 
		latitude: viewport.latitude, 
		longitude: viewport.longitude 
	});
	const [ mapStyle, setMapStyle ] = useState("mapbox://styles/hvoking/clrwzn1jo015q01nl53664m2c");

	const mapRef = useRef<any>();

	useEffect(() => {
	  mapRef.current?.flyTo({
	    center: [ viewport.longitude, viewport.latitude ],
	    zoom: viewport.zoom,
	    duration: 3000, 
	    essential: true,
	  });

	  setMarker({
	    longitude: viewport.longitude, 
	    latitude: viewport.latitude
	  })
	}, [ viewport ]);

	useEffect(() => {
		setViewport({...viewport, ...placeCoordinates});
		placeCoordinates && setGeocodingLatitude(placeCoordinates.latitude) 
		placeCoordinates && setGeocodingLongitude(placeCoordinates.longitude)
	}, [ placeCoordinates ])

	return (
		<GeoContext.Provider value={{
			cityId, setCityId, 
			placeId, setPlaceId, 
			marker, setMarker,
			placeCoordinates, setPlaceCoordinates,
			viewport, setViewport,
			geocodingLongitude, setGeocodingLongitude,
			geocodingLatitude, setGeocodingLatitude,
			Locations,
			mapRef, mapStyle, setMapStyle
		}}>
			{children}
		</GeoContext.Provider>
	)
}

GeoContext.displayName = "GeoContext";