
import React from "react";
import { useState } from "react";
import { Button, Box, Card, Checkbox, Slider, Typography} from '@mui/material';
import { useSelector, useDispatch } from "react-redux";
import { setPriceFilter, setCategoryFilter } from "../redux/filterSlice";


// const categories = [
//   "food",
//   "toys",
//   "treats"
// ];

  // const resetFilters = () => {
  //   setCategoryFilter('');
  //   setPriceFilter('');
  // };


const Filters = () => {
  const dispatch = useDispatch();
  const { price, category} =useSelector(state => state.filter);
  

  const handlePriceChange = (event, price) => {
    dispatch(setPriceFilter(price));
  };
 
  // const handleCategoryChange = (category) => {
  //   dispatch(setCategoryFilter(category));
  // };


  return (
    <div> 
      <Card sx={{ maxWidth: 500, minWidth: 350, maxHeight: 200, minHeight: 200 }}> 
      <Typography variant="h6">Price Filter</Typography>
      <Slider
        getAriaLabel={() => 'Price Range'}
        value={Number(price)}
        onChange={handlePriceChange}
        valueLabelDisplay="auto"
        valueLabelFormat={(value) => `$${value}`}
        min={0}
        step={5}
        max={40} 
      />
 
      {/* <Typography variant="h6">Category Filter</Typography>
      {categories.map((cat, index) => (
          <Checkbox
            key={index}
            label={cat}
            checked={category === cat}
            onChange={() => handleCategoryChange(cat)}
          />
      ))}
      <Button variant="contained" onClick={() => handleCategoryChange(category)}>Apply category filter</Button>
      <Button onClick={resetFilters}>Reset</Button> */}
      </Card>
    </div>
  );
}


export default Filters;



