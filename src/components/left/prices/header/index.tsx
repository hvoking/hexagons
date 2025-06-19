// App imports
import './styles.scss';

// Context imports
import { usePrices } from '../../../../context/filters/prices';

// Third-party imports
import * as d3 from 'd3';

export const Header = () => {
  const { samplesPrices } = usePrices();

  const mean = (arr: any) => {
      if (arr.length === 0) return 0;
      const filteredArr = arr.filter(Number.isFinite); // Remove non-numeric values
      if (filteredArr.length === 0) return 0; // Handle case where all values are non-numeric
      const sum = filteredArr.reduce((acc: any, val: any) => acc + val, 0);
      return sum / filteredArr.length;
  };

  const siFormat = d3.format(",");

  return (
    <div className="airbnb-calculator-item-wrapper">
      <div className="sidebar-sub-title">Price range</div>
      <div className="property-prices">
        <div>avg</div>
        <div className="airbnb-property-prices-number">
          {samplesPrices && siFormat(Math.round(mean(samplesPrices)))} £
        </div>
      </div>
    </div>
  )
}

Header.displayName="Header";