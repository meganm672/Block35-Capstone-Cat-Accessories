const request = require("supertest");

const app = require('../app')

const prismaMock = require('../../mocks/prismaMock');

const jwt = require('jsonwebtoken');
jest.mock('jsonwebtoken');



describe('/api/me/cart', () => {
    beforeEach(() =>{
        jest.resetAllMocks();
    })

    describe('GET /users/me/cart', () => {
        // it('return a list of items in the cart of user', async () => {
        //     const loggedInUser = {
        //         id: 1,
        //         username: "kitty",
        //         password: "password"
        //     }
            
        //     const token = "12345HUYy";
        //     jwt.verify.mockReturnValue(loggedInUser);
        //     prismaMock.user.findUnique.mockResolvedValue(loggedInUser);
            
      
        //     const cart = {user: {id: 1, username: "kitty", cartId: 2}, cartItems: {quantity: 2, productId: 108, cartId: 5} }

        //     prismaMock.cart.findMany.mockResolvedValue(cart);

        //     const response = await request(app).get('/api/users/me/cart').send(loggedInUser).set('Authorization', 'Bearer '+ token);
        //     console.log(response.body, "USER CART");
        //     expect(response.body).toEqual({cart});
        //     expect(response.status).toBe(200);
        //     expect(prismaMock.cart.findMany).toHaveBeenCalledTimes(1);
        // })
        it('should handle errors', async () => {
 
        prismaMock.cart.findFirst.mockRejectedValue(new Error('Some error'));

   
        const response = await request(app)
            .get('/me/cart')
            .set('Authorization', 'Bearer Token');

        expect(response.status).toBe(500);
    });
    });


    })


