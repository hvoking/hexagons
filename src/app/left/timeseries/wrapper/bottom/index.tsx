// App imports
import { Divider } from './divider';
import './styles.scss';

// Context imports
import { useDates } from '../../../../../context/filters/dates';

// Third party imports
import * as d3 from 'd3';

const meses = ['',
  "jan", "feb", "mar", 
  "apr", "may", "jun",
  "jul", "aug", "sep", 
  "oct", "nov", "dec",
];

export const Bottom = ({ xScale, innerWidth, innerHeight, xAxisTickFormat }: any) => {
  const xScaleTicks = xScale.ticks(d3.timeMonth);
  const tickWidth = innerWidth / xScaleTicks.length;

  const { startDate, finalDate } = useDates();

  return (
    xScale.ticks(d3.timeMonth).map((tickValue: number, index: any) => {
      const currentTick = new Date(tickValue);

      const startDateParts = startDate.split("-");
      const currentStartDate = new Date(`${startDateParts[2]}-${startDateParts[1]}-${startDateParts[0]}`);

      const finalDateParts = finalDate.split("-");
      const currentFinalDate = new Date(`${finalDateParts[2]}-${finalDateParts[1]}-${finalDateParts[0]}`);

      const tickString = currentTick.getFullYear() + "/" + (currentTick.getMonth() + 1);
      const startDateString = currentStartDate.getFullYear() + "/" + (currentStartDate.getMonth() + 1);
      const finalDateString = currentFinalDate.getFullYear() + "/" + (currentFinalDate.getMonth() + 1);

      const activeString = tickString === startDateString || tickString === finalDateString

      return (
        <g key={index}>
          <text
            className="dates-background-text"
            transform={
              `
                translate(${xScale(tickValue) + 3 + tickWidth / 2}, ${innerHeight + 27}), 
                rotate(-90)
              `
            }
          >
            {tickString && meses[parseInt(xAxisTickFormat(tickValue))]}
          </text>
          <text
            className="dates-text"
            transform={
              `
                translate(${xScale(tickValue) + 3 + tickWidth / 2}, ${innerHeight + 27}), 
                rotate(-90)
              `
            }
          >
            {activeString && meses[parseInt(xAxisTickFormat(tickValue))]}
          </text>
          <Divider
            xScale={xScale}
            innerHeight={innerHeight}
          />
        </g>
      )}
  )
)}

Bottom.displayName="Bottom";