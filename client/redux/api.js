import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const serviceURL = process.env.NODE_ENV === "test" ? "http://localhost:8080/" : "/";

const api = createApi({
    reducerPath: "api",

    baseQuery: fetchBaseQuery({
        //base url for API calls ... need to change this when deployed
        baseUrl: serviceURL,
        // set the Content-Type header to the application/json
        prepareHeaders: (headers, { getState }) => {
            const token = getState().auth.token
            headers.set("Content-Type", "application/json")
            if (token) {
                headers.set('authorization', `Bearer ${token}`)
            }
            return headers
        },
    }),

    tagTypes: ["Product", "Cart"],

    // define the API endpoints we are trying to access
    endpoints: (builder) => ({
        //cat product-
        //get all the cat products api/products/
        getCatProducts: builder.query({
            query: (price) => {
                return price ? `api/products?price=${price}` : "api/products";
                
            },

            providesTags: ["Product"]
        }),
        //get single cat product query api/products/:id
        getSingleCatProduct: builder.query({
            query: (productId) => "api/products/" + productId,
            providesTags: ["Product"]
        }),

        // create new cat product mutation api/products/
        createCatProduct: builder.mutation({
            query: (productData) => ({
                url: "api/products/",
                method: "POST",
                body: productData
            }),
            invalidatesTags: ["Product"]
        }),

        // update new cat product mutation api/products/:id

        updateCatProduct: builder.mutation({
            query: ({productId, product}) => ({
                url: "api/products/" + productId,
                method: "PUT",
                body: product
            }),
            invalidatesTags: ["Product"]
        }),

        //delete cat product mutation api/products/:id

        deleteCatProduct: builder.mutation({
            query: (productId) => ({
                url: "api/products/" + productId,
                method: "DELETE",
            }),
            invalidatesTags: ["Product"]
        }),

        //cart querys and mutations:
        //get users items in cart api/users/me/cart query

        getUsersCart: builder.query({
            query: () => "api/users/me/cart",
            providesTags: ["Cart"]
        }),

        //add items in users cart api/users/me/cart/items mutation

        createCartItemsInCart: builder.mutation({
            query: ( {productId} ) => ({
                url: "api/users/me/cart/items",
                method: "POST",
                body: {productId } //this has to MATCH what our server is looking for
            }),
            invalidatesTags: ["Cart"]
        }),

        // update users cart api/users/me/cart/items/:id mutation

        updateUsersCart: builder.mutation({
            query: ({cartItemId, quantity}) => ({
                url: "api/users/me/cart/items/" + cartItemId,
                method: "PATCH",
                body: {quantity}
            }),
            invalidatesTags: ["Cart"]
        }),

        // delete items in users cart api/users/me/cart/items/:id mutation

        deleteCartItemsInCart: builder.mutation({
            query: (cartItemId) => ({
                url: "api/users/me/cart/items/" + cartItemId,
                method: "DELETE"
            }),
            invalidatesTags: ["Cart"]
        }),

        //delete all items in a users cart for checking out 
        checkoutCart: builder.mutation({
            query: (cart) => ({
                url: "api/checkout/" + cart,
                method: "POST",
            }),
            invalidatesTags: ["Cart"]
        }),

        //auth folder:
        // /auth/register mutation

        register: builder.mutation({
            query: (user) => ({
                url: 'auth/register',
                method: "POST",
                body: user
            }),

        }),

        // /auth/login mutation 

        login: builder.mutation({
            query: (user) => ({
                url: 'auth/login',
                method: "POST",
                body: user
            }),

        }),

        //curently logged in user query /auth/me

        currentUser: builder.query({
            query: () => "auth/me",
        }),

        // get all users admin query /auth/
        
        getAllUsers: builder.query({
            query: () => "auth/",
        }),

        // pagination
        paginateProducts: builder.query({
            query: (page = 1) => `api/products?page=${page}`,
        }),
    })
})


export default api;

export const {
    useGetCatProductsQuery,
    useGetSingleCatProductQuery,
    useCreateCatProductMutation,
    useUpdateCatProductMutation,
    useDeleteCatProductMutation,
    useGetUsersCartQuery,
    useCreateCartItemsInCartMutation,
    useUpdateUsersCartMutation,
    useDeleteCartItemsInCartMutation,
    useCheckoutCartMutation,
    useRegisterMutation,
    useLoginMutation,
    useCurrentUserQuery,
    useGetAllUsersQuery,
    usePaginateProductsQuery,
} = api;
