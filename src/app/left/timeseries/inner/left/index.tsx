// App imports
import { Legend } from './legend';
import './styles.scss';

// Utils imports
import { priceFormat } from '../../../../../utils/constants';

// Context imports
import { useLinesLimits } from '../../../../../context/limits/lines';

export const Left = ({yScale, innerWidth, innerHeight}: any) => {  
  const { minLine, meanLine, maxLine } = useLinesLimits();

  return (
    <>
      <rect
        x={-40}
        y={-15}
        width={40 + innerWidth}
        height={innerHeight + 15 + 30}
        fill="none"
        stroke="rgba(126, 126, 132, 1)"
        strokeWidth={0.3}
      />
      <Legend
        yScale={yScale}
        innerWidth={innerWidth}
        tickFormat={priceFormat}
        tickOffset={-30}
        tickValue={minLine}
        stroke="rgba(255, 0, 0, 1)"
        fill="rgba(68, 27, 30, 1)"
      />
      <Legend
        yScale={yScale}
        innerWidth={innerWidth}
        tickFormat={priceFormat}
        tickOffset={-30}
        tickValue={meanLine}
        stroke="rgba(57, 181, 74, 1)"
        fill="rgba(19, 58, 39, 1)"
      />
      <Legend
        yScale={yScale}
        innerWidth={innerWidth}
        tickFormat={priceFormat}
        tickOffset={-30}
        tickValue={maxLine}
        stroke="rgba(166, 166, 244, 1)"
        fill="rgba(41, 41, 96, 1)"
      />
    </>
  )
}

Left.displayName="Left";