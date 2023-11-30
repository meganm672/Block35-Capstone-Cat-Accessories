
import { useState } from "react";
import {Slider, Typography} from '@mui/material';



const PriceFilter = ({ onFilterChange }) => {
  const [priceRange, setPriceRange] = useState([0, 50]); 

  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  const applyFilter = () => {
    onFilterChange(priceRange);
  };


  return (
    <div> 
    <Typography variant="h6">Price Filter</Typography>
      <Slider
        getAriaLabel={() => 'Price Range'}
        value={value}
        onChange={handlePriceChange}
        valueLabelDisplay="auto"
        valueLabelFormat={(value) => `$${value}`}
        min={0}
        step={5}
        max={50}
      />
    <button onClick={applyFilter}>Apply Filter</button>
    </div>
  );
}

export default PriceFilter;