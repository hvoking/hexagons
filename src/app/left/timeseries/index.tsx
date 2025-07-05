// App imports
import { Header } from './header';
import { Inner } from './inner';
import { SVGWrapper } from './svg';
import { Wrapper } from './wrapper';
import './styles.scss';

// Context imports
import { useDates } from '../../../context/filters/dates';
import { useLinesApi } from '../../../context/api/imoveis/lines';
import { useTimeseriesSizes } from '../../../context/sizes/timeseries';

// Third-party imports
import * as d3 from 'd3';

export const Timeseries = () => {
  const { dates } = useDates();
  const { linesData } = useLinesApi();
  const { innerWidth, innerHeight } = useTimeseriesSizes();
  
  const minLine = linesData.min_line_price;
  const maxLine = linesData.max_line_price;
  
  const xScale = d3.scaleTime()
    .domain(dates)
    .range([0, innerWidth]);

  const yScale = d3.scaleLinear()
    .domain([
      maxLine + (maxLine + minLine) * 0.2, 
      minLine - (maxLine + minLine) * 0.2, 
    ])
    .range([0, innerHeight]);    
      
  return (
      <div className="timeseries-wrapper">
        <Header/>
        <SVGWrapper>
          <Wrapper
            xScale={xScale}  
            innerWidth={innerWidth} 
            innerHeight={innerHeight} 
          />
          <Inner
            xScale={xScale}
            yScale={yScale}
            innerWidth={innerWidth}
            innerHeight={innerHeight}
          />
        </SVGWrapper>
      </div>
  )
}

Timeseries.displayName="Timeseries";