// App imports
import { Left } from './left';
import { Maps } from './maps';
import './styles.scss';

export const Main = () => {
	return (
		<div className="main">
			<Left/>
			<Maps/>
		</div>
	)
}

Main.displayName="Main";