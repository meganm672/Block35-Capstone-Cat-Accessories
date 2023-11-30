const usersRouter = require("express").Router();
const { requireUser } = require("../auth/middleware");
const prisma = require("../db/client");

// Get all users items in cart
usersRouter.get("/me/cart", async (req, res, next) => {
    try {
        const cart = await prisma.cart.findFirst({
            where: { user: { id: req.user.id } },
            include: {
                cartItems: {
                    include: { product: true }
                }
            }
        });
        res.send(cart);
    } catch (error) {
        console.error(error)
        next(error);
    }
});

// post - add an product to my cart... or update the quantity if there is already a product in the cart
usersRouter.post("/me/cart/items", requireUser, async (req, res, next) => {
    try {
        const { productId } = req.body
        const cart = await prisma.cart.findFirstOrThrow({
            where: { user: { id: req.user.id } },
            include: {
                cartItems: {
                    include: { product: true }
                }
            }
        });
        const cartItem = await prisma.cartItem.upsert({ 
            where: { cartId_productId: { cartId: req.user.cartId, productId: productId } },
            update: {
                quantity: {
                    increment: 1
                }
            },
            create: {
                quantity: 1,
                product: {
                    connect: { id: productId, }
                },
                cart: {
                    connect: { id: cart.id }
                }
            },
            include: {
                cart: {
                    include: {
                        cartItems: {
                            include: { product: true }
                        }
                    }
                }
            }
        });
        console.log(cartItem)
        res.send(cartItem.cart);
    } catch (error) {
        console.error(error)
        next(error);
    }
});

// update cart 
usersRouter.patch("/me/cart/items/:id", requireUser, async (req, res, next) => {
    try {
        const { quantity } = req.body;
        const { id } = req.params;
        //auth check to see if you are the user that owns the cart that the cart item is in
        const cartItemToUpdate = await prisma.cartItem.findUnique({
            where: {
                id: Number(id)
            }
        });

        if (cartItemToUpdate.cartId === req.user.cartId) {
            const cartItem = await prisma.cartItem.update({
                where: { id: Number(id) },
                data: {
                    quantity: quantity
                },
                include: {
                    cart: {
                        include: {
                            cartItems: {
                                include: { product: true }
                            }
                        }
                    }
                }
            });
            res.send(cartItem.cart);//or cartitem down the line
        } else {
            next({
                name: 'UnauthorizedUserError',
                message: 'You cannot update a cart that is not yours'
            })
        }
        
    } catch (error) {
        console.error(error)
        next(error);
    }
});

// Delete an item from the cart
usersRouter.delete("/me/cart/items/:id", requireUser, async (req, res, next) => {
    try {
        const { id } = req.params;
        const cartItemToDelete = await prisma.cartItem.findUnique({
            where: {
                id: Number(id)
            }
        });

        if (cartItemToDelete.cartId === req.user.cartId) {
            const cartItem = await prisma.cartItem.delete({
                where: { id: Number(id) },
                include: {
                    cart: {
                        include: {
                            cartItems: {
                                include: { product: true }
                            }
                        }
                    }
                }
            });
            res.send(cartItem.cart); //or cartitem down the line
        } else {
            next({
                name: 'UnauthorizedUserError',
                message: 'You cannot update a cart that is not yours'
            })
        }
    } catch (error) {
        next(error);
    }
});

module.exports = usersRouter;