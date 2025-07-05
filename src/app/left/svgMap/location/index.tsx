// App imports
import './styles.scss';

// Context imports
import { useReverseGeocodingApi } from 'context/api/google/reverse';

export const Location = () => {
	const { currentAddress } = useReverseGeocodingApi();

	if (!currentAddress) return <></>;

	const city = currentAddress[3].long_name;
	const neighbour = currentAddress[2].long_name;
	const state = currentAddress[4].long_name;
	const code = currentAddress[6] && currentAddress[6].long_name;

	const address = [city, neighbour, state, code ].join(", ");

	return (
		<div className="airbnb-location-wrapper">
			<img 
				className="location-pin" 
				src={process.env.PUBLIC_URL + "/static/components/maps/marker.svg"}
				alt="pin-location"
		     />
			<div>{address}</div>
			<div></div>
		</div>
	)
}
Location.displayName="Location"