export const Legend = ({ yScale, tickFormat, tickValue, stroke, fill }: any) => (
    <>
      <rect
        x={-40}
        y={yScale(tickValue) - 10}
        width={40}
        height={20}
        fill={fill}
        stroke={stroke}
        strokeWidth={1}
      />
      <text
        style={{textAnchor:"start", alignmentBaseline: "middle"}}
        x={-32}
        y={yScale(tickValue)}
        className="axis-left-text"
      >
        {tickFormat(tickValue)}
      </text>
    </>
  )
Legend.displayName="Legend"