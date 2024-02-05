import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Snackbar, IconButton, Alert, AlertTitle } from "@mui/material";
import { useGetSingleCatProductQuery, useDeleteCatProductMutation, useCreateCartItemsInCartMutation } from '../../redux/api';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import { addToCart } from "../../redux/cartSlice";
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

const SingleProduct = () => {
  const { user, token } = useSelector((state: RootState) => state.auth) //redux state
  const params = useParams();

  const catProductId = params.id;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { data: product, isLoading, error } = useGetSingleCatProductQuery(catProductId);
  const [deleteCatProduct] = useDeleteCatProductMutation();
  const [createCartItemsInCart] = useCreateCartItemsInCartMutation(catProductId);

  // snack bar message
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event?: Event, reason?: string ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  // for the snack bar box
  const action = (
    <>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  )

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography>Error: {error.message}</Typography>;
  }

  return (
    <Box sx={{ margin: 5 }}>
      {error && !data && (<Typography>Failed to load cat product.</Typography>)}
      <Grid container justifyContent="center">
        <Grid item >
          <Card sx={{ minWidth: 500, maxWidth: 500 }}>
            <CardMedia
              component="img"
              alt={product.name}
              height="400"
              image={product.imageUrl}
              sx={{ objectFit: "contain" }}
            />
            <CardContent>
              <Typography variant="h5" sx={{ textAlign: "center", textTransform: "capitalize", margin: 1 }}>{product.name}</Typography>
              <Typography sx={{ textAlign: "center" }}><b>Description:</b> {product.detail}</Typography>
              <Typography sx={{ textAlign: "center" }}><b>Price:</b> ${product.price}</Typography>
              <Typography sx={{ textAlign: "center" }}><b>Category:</b>{product.category}</Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: "center" }}>
              <Button variant="contained" sx={{ "&:hover": { bgcolor: "magenta", color: "black" }, fontWeight: "bold", maxWidth: 100, minWidth: 100, maxHeight: 100, minHeight: 100 }} onClick={() => navigate("/")} > Back </Button>
              {user?.admin && <Button variant="contained" sx={{ "&:hover": { bgcolor: "magenta", color: "black" }, fontWeight: "bold", maxWidth: 100, minWidth: 100, maxHeight: 100, minHeight: 100 }} onClick={() => deleteCatProduct(product.id)}>Delete Product</Button>}
              {user?.admin && <Button variant="contained" sx={{ "&:hover": { bgcolor: "magenta", color: "black" }, fontWeight: "bold", maxWidth: 100, minWidth: 100, maxHeight: 100, minHeight: 100 }} onClick={() => navigate("/admin", { state: product })}>Update Product</Button>}
              {!user && <Button variant="contained" sx={{ "&:hover": { bgcolor: "magenta", color: "black" }, fontWeight: "bold", maxWidth: 100, minWidth: 100, maxHeight: 100, minHeight: 100 }} onClick={() => { dispatch(addToCart({ ...product })); handleClick() }}>Add to Cart</Button>}
              {token && <Button variant="contained" sx={{ "&:hover": { bgcolor: "magenta", color: "black" }, fontWeight: "bold", maxWidth: 100, minWidth: 100, maxHeight: 100, minHeight: 100 }} onClick={() => { createCartItemsInCart({ quantity: 1, productId: product.id }); handleClick() }}>Add to Cart</Button>}
              <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                action={action}
              >
                <Alert onClose={handleClose} severity="success" variant="filled" sx={{ width: '100%' }}>
                  <AlertTitle>Success</AlertTitle>
                  Product Added To cart!
                </Alert>
              </Snackbar>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SingleProduct;