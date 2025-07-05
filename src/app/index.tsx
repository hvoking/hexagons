// App imports
import { Left } from './left';
import { Maps } from './maps';
import './styles.scss';

// Context imports
import { ContextProvider } from 'context';

export const App = () => {
	return (
		<ContextProvider>
			<div className="App">
				<Left/>
				<Maps/>
			</div>
		</ContextProvider>
	)
}

App.displayName="App";