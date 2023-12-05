import {Link as RouterLink} from "react-router-dom"
import { Typography, Paper, Button, Grid, Link} from "@mui/material";
import { useSelector} from "react-redux";
import { useGetUsersCartQuery} from "../redux/api";
import { useNavigate } from "react-router-dom";
import CheckoutCartButton from "./CheckoutCartButton";

import GuestCheckoutCartButton from "./GuestCheckoutCartButton";
import GuestCartItem from "./GuestCartItem";

import LoggedInCartItem from "./LoggedInCartItem";

const Cart = () => {
  const { user } = useSelector(state => state.auth);
  const guestCart = useSelector(state => state.cart.items)
  const { data: loggedInCart, isLoading, error } = useGetUsersCartQuery();
 



  return (
    <>
      <Paper elevation={6}>
        <Typography variant="h3" sx={{ marginLeft: 2, padding: 2}} >Welcome to {user ? `${user.name}'s` : "Your"} Cart</Typography>
        <Grid container spacing={4}>
          {user && <Grid item>
            <LoggedInCartItem />
          </Grid>}
          {!user && guestCart?.length ? (guestCart.map((item) => (
            <Grid item key={item.id} >
              <GuestCartItem
                key={item.id}
                id={item.id}
                imageUrl={item.imageUrl}
                name={item.name}
                price={item.price}
                quantity={item.quantity}
              />
            </Grid>
          ))) : (
            !user && <Typography variant="h3" sx={{ marginLeft: 7.5, padding: 1 }}>
              Your cart is empty
            </Typography>
          )}
        </Grid>
        <Typography variant="h6" sx={{ padding: 2, marginLeft: 3.5 }}>
          Click here to <Link href="#" component={RouterLink} to="/">continue shopping</Link>
        </Typography>
        
    {(user && loggedInCart && loggedInCart?.cartItems?.[0]?.product === undefined ) ? (<Button disabled variant="contained" sx={{ margin: 2, padding: 2, marginLeft: 5, opacity: 0.5 }}>
    Checkout
  </Button>) : (<CheckoutCartButton cartId={loggedInCart?.id} />
    )}
    {(!user && guestCart.length > 0) ? (
  <GuestCheckoutCartButton />
) : (
  <Button disabled variant="contained" sx={{ margin: 2, padding: 2, marginLeft: 5, opacity: 0.5 }}>
    Checkout
  </Button>
)}
    
      </Paper>
    </>
  );
};

export default Cart;
