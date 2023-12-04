
const productsRouter = require("express").Router();
const { requireAdmin, requireUser } = require("../auth/middleware");
const prisma = require("../db/client");

// Get all products
productsRouter.get("/", async (req, res, next) => {
 try {
        const { price } = req.query;

        if (price) { //if price is anything above 0, !undefined or null, it will return something
            const filteredProducts = await prisma.product.findMany({
                where: {
                    price: {
                        lte: parseInt(price), 
                    },
                },
            });

            res.send(filteredProducts);
        } else {
            const allProducts = await prisma.product.findMany();
            res.send(allProducts);
        }
    } catch (error) {
        next(error);
    }
});

// Get a product by id
productsRouter.get("/:id", async (req, res, next) => {
    try {
        const product = await prisma.product.findUnique({
            where: { id: Number(req.params.id) },
        });

        res.send(product);
    } catch (error) {
        next(error);
    }
});

// Create a new product (need to be an admin)
productsRouter.post("/", [requireUser, requireAdmin], async (req, res, next) => {
    try {
        const product = await prisma.product.create({
            data: { ...req.body },
        });
        res.status(201).send(product);
    } catch (error) {
        next(error);
    }
});

// Update a product (need to be an admin)
productsRouter.put("/:id",[requireUser, requireAdmin], async (req, res, next) => {
    try {
        const product = await prisma.product.update({
            where: { id: Number(req.params.id) },
            data: req.body,
        });

        res.send(product);
    } catch (error) {
        console.error(error)
        next(error);
    }
});

// Delete a product by id (need to be an admin)
productsRouter.delete("/:id", [requireUser, requireAdmin], async (req, res, next) => {
    try {
        const product = await prisma.product.delete({
            where: { id: Number(req.params.id) },
        });

        res.send(product);
    } catch (error) {
        next(error);
    }
});

module.exports = productsRouter;