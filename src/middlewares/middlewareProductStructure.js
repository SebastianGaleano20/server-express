// middlewares/validationMiddleware.js
export const middlewareProductStructure = (req, res, next) => {
    const requiredProperties = [
      "title",
      "price",
      "description",
      "category",
      "image",
      "rating",
    ];
  
    const product = req.body; // Assuming the product data is in the request body
  
    for (const property of requiredProperties) {
      if (!product.hasOwnProperty(property)) {
        return res.status(400).json({ error: `Missing property: ${property}` });
      }
    }
  
    next();
  };