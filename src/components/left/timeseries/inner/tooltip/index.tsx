export const Tooltip = ({ activeTooltip, cursorPosition, cursorPrice }: any) => {
	return (
		<>
			{activeTooltip &&
				<>
					<rect
						x={cursorPosition.x + 5}
						y={cursorPosition.y + 5}
						width={30}
						height={15}
						fill="rgba(33, 33, 43, 0.6)"
						stroke="rgba(126, 126, 132, 1)"
						strokeWidth="2"
						rx="2"
						ry="2"
					/>
					<text
						x={cursorPosition.x + 12}
						y={cursorPosition.y + 15}
						fill="rgba(255, 255, 255, 1)"
						fontSize="0.6em"
					>
						{cursorPrice}
					</text>
				</>
			}
		</>
	)
}