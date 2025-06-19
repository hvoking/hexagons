// App imports
import './styles.scss';

export const Message = () => {
	return (
		<div className="sidebar-item-wrapper">
			<div style={{display: "grid", gridTemplateRows: "min-content auto"}}>
				<div className="starting-title">
					Drag the pin
				</div>
				<img 
					className="starting-gif" 
					src={process.env.PUBLIC_URL + "/static/gif/marker_move.gif"} 
					alt="marker_move"
				/>
			</div>
		</div>
	)
}

Message.displayName="Message";