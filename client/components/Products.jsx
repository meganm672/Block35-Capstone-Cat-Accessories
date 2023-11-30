import { useNavigate } from "react-router-dom";
import { useGetCatProductsQuery, useDeleteCatProductMutation, useCreateCartItemsInCartMutation } from "../redux/api";
import React, { useState } from "react";
import { Button, Box, Card, CardActions, CardContent, CardMedia, Typography, Grid, TextField, Slider } from "@mui/material";
import NewProductForm from "./NewProductForm";
import { useSelector } from "react-redux";
import PriceFilter from "./PriceFilter";


const Products = () => {
  const { user, token } = useSelector(state => state.auth)
  const navigate = useNavigate();

  const { data: products, isLoading, error } = useGetCatProductsQuery();
  const [deleteCatProduct] = useDeleteCatProductMutation();
  const [createCartItemsInCart] = useCreateCartItemsInCartMutation();

  const [searchQuery, setSearchQuery] = useState("")

const [filteredPriceRange, setFilteredPriceRange] = useState([0, 100]); // Initial state, adjust as needed

  const handleFilterChange = (priceRange) => {
    // Logic to apply filter based on the selected price range
    setFilteredPriceRange(priceRange);
    // Additional logic like fetching filtered data, updating state, etc.
  };

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }
  if (error) {
    return <Typography>Error: {error.message}</Typography>;
  }

  return (

    <Box>
      <TextField
        // id="outlined-basic"
        variant="outlined"
        label="Search"
        placeholder="Search Products Here..."
        onChange={event => setSearchQuery(event.target.value)}
        sx={{ marginLeft: 10, marginTop: 3, padding:2}}
      />
      <PriceFilter onFilterChange={handleFilterChange} />


      {user?.admin && <NewProductForm />}
      <Typography variant="h3" sx={{ marginLeft: 14 }} >Cat Products</Typography>
      {error && !products && (<p> Failed to load products from api</p>)}
      <Grid container spacing={4} sx={{ marginLeft: 10 }}>
        {products ? (
          products.slice().sort((a,b)=> {a.name > b.name ? 1 : -1 })
          .filter(product => {
            if (searchQuery === '') {
              return product
            } else if (product.name.toLowerCase().includes(searchQuery.toLowerCase())) {
              return product;
            }
          })
            .map((product) => {
              return (
                <Grid item key={product.name} >
                  <Card sx={{ maxWidth: 350, minWidth: 350, maxHeight: 450, minHeight: 450 }} >
                    <CardMedia
                      component="img"
                      alt={product.name}
                      height="250"
                      image={product.imageUrl}
                      sx={{ objectFit: "contain" }}
                    />
                    <CardContent>
                      <Typography variant="h6" sx={{ textAlign: "center", textTransform: "capitalize" }}>{product.name}</Typography>
                      <Typography sx={{ textAlign: "center" }}><b>Price:</b>${product.price}</Typography>
                    </CardContent>
                    <CardActions sx={{ justifyContent: "center" }}>
                      <Button variant="contained" onClick={() => navigate("/" + product.id)}>Product Info</Button>
                      {user?.admin && <Button variant="contained" onClick={() => deleteCatProduct(product.id)}>Delete Product</Button>}
                      {user?.admin && <Button variant="contained" onClick={() => navigate("/admin", { state: product })}>Update Product</Button>}
                      {token && <Button variant="contained" onClick={() => createCartItemsInCart({ quantity: 1, productId: product.id })}>Add to Cart</Button>}
                    </CardActions>
                  </Card>
                </Grid>
              )
            })) : !error && <p>Loading...</p>}
      </Grid>
    </Box>
  )
}

export default Products;
