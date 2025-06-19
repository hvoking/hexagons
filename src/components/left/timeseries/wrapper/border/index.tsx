interface BorderType {
	innerWidth: number
	innerHeight: number
}

export const Border = ({ innerWidth, innerHeight}: BorderType) => {
	const strokeWidth = 0.3;
	
	return (
		<>
			<rect
			  x={0}
			  y={0}
			  width={innerWidth}
			  height={innerHeight}
			  fill="none"
			  stroke="rgba(126, 126, 132, 1)"
			  strokeWidth={strokeWidth}
			/>
			<rect
			  x={0}
			  y={0}
			  width={innerWidth}
			  height={innerHeight}
			  fill="none"
			  stroke="rgba(126, 126, 132, 1)"
			  strokeWidth={strokeWidth}
			/>
		</>
	)
}

Border.displayName="Border";