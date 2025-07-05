// React imports
import { useState, useEffect, useContext, createContext } from 'react';

// Context imports
import { useGeo } from 'context/geo';

const GoogleSearchApiContext: React.Context<any> = createContext(null)

export const useGoogleSearchApi = () => useContext(GoogleSearchApiContext)

export const GoogleSearchApiProvider = ({children}: any) => {
	const [ searchText, setSearchText ] = useState('');
	const [ googleSearchData, setGoogleSearchData ] = useState(null);

	const { viewport } = useGeo();
	const latitude = viewport.latitude;
	const longitude = viewport.longitude;

	useEffect(() => {
	  const fetchData = async () => {
	  	const temporarySearchText = searchText.replace(" ", "__");
	    const tempUrl = `
	    	${process.env.REACT_APP_API_URL}/
	    	search_api
	    	?query=${temporarySearchText}
	    	&latitude=${latitude}
	    	&longitude=${longitude}
	    	&language=en
	    `;
	    const url = tempUrl.replace(/\s/g, '');
	    try {
		    const res = await fetch(url);
    		if (!res.ok) {
      			throw new Error(`HTTP error! status: ${res.status}`);
      		}
		    const receivedData = await res.json();
		    setGoogleSearchData(receivedData)
	    }
	    catch (error) {
	    	console.error("Error fetching address:", error);
	    	return null;
	    }
	  }
	  searchText && fetchData();
	}, [ searchText ]);

	return (
		<GoogleSearchApiContext.Provider value={{ 
			googleSearchData, 
			searchText, setSearchText, 
		}}>
			{children}
		</GoogleSearchApiContext.Provider>
	)
}

GoogleSearchApiContext.displayName = "GoogleSearchApiContext";