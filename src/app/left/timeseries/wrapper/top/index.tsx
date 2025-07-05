// App imports
import './styles.scss';

// Third party imports
import * as d3 from 'd3';

export const Top = ({ xScale, tickFormat }: any) => {
  const currentYears = xScale.ticks(d3.timeMonth).reduce((total: any, item: any) => {
    const year = item.getYear();
    if (total[year] == null) {
      total[year] = []
    }
    total[year].push(item)
    return total
  }, {});

  const selectedYears: any = Object.values(currentYears).reduce((total: any, arr: any) => {
    const middle = arr[Math.floor(arr.length / 2)];
    total.push(middle)
    return total
  }, []);

  return (
    selectedYears.map((tickValue: number) => (
      <g 
        key={tickValue} 
        transform={`translate(${xScale(tickValue)}, ${0})`}
      >
        <text
          className="prices-top-text"
          x={0}
          y={-3}
        >
          {tickFormat(tickValue)}
        </text>
    </g>
  ))
)}

Top.displayName="Top";