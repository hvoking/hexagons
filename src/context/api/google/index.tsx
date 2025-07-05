// App imports
import { GoogleSearchApiProvider } from './search';
import { GoogleDetailsApiProvider } from './details';
import { ReverseGeocodingApiProvider } from './reverse';

export const GoogleApiProvider = ({children}: any) => {
  return (
    <GoogleSearchApiProvider>
    <GoogleDetailsApiProvider>
    <ReverseGeocodingApiProvider>
      {children}
    </ReverseGeocodingApiProvider>
    </GoogleDetailsApiProvider>
    </GoogleSearchApiProvider>
  )
}

GoogleApiProvider.displayName="GoogleApiProvider";