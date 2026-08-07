const Cart = require("../models/Cart");


const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    let cart = await Cart.findOne({
      user: req.user._id,
    });

    if (!cart) {
      cart = await Cart.create({
        user: req.user._id,

        items: [
          {
            product: productId,

            quantity: quantity || 1,
          },
        ],
      });
    } else {
      const existingProduct = cart.items.find(
        (item) => item.product.toString() === productId,
      );

      if (existingProduct) {
        existingProduct.quantity += quantity || 1;
      } else {
        cart.items.push({
          product: productId,

          quantity: quantity || 1,
        });
      }

      await cart.save();
    }

    await cart.populate("items.product");

    res.status(201).json({
      success: true,

      message: "Product added to cart",

      cart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};


const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({
      user: req.user._id,
    }).populate("items.product");

    if (!cart) {
      return res.status(200).json({
        success: true,

        cart: {
          items: [],
        },
      });
    }

    res.status(200).json({
      success: true,

      cart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};


const updateCartQuantity = async (req, res) => {
  try {
    const { quantity } = req.body;

    const cart = await Cart.findOne({
      user: req.user._id,
    });

    if (!cart) {
      return res.status(404).json({
        success: false,

        message: "Cart not found",
      });
    }

    const item = cart.items.find(
      (item) => item.product.toString() === req.params.productId,
    );

    if (!item) {
      return res.status(404).json({
        success: false,

        message: "Product not found in cart",
      });
    }

    if (quantity < 1) {
      return res.status(400).json({
        success: false,

        message: "Quantity cannot be less than 1",
      });
    }

    item.quantity = quantity;

    await cart.save();

    await cart.populate("items.product");

    res.status(200).json({
      success: true,

      message: "Cart updated successfully",

      cart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};


const removeFromCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({
      user: req.user._id,
    });

    if (!cart) {
      return res.status(404).json({
        success: false,

        message: "Cart not found",
      });
    }

    cart.items = cart.items.filter(
      (item) => item.product.toString() !== req.params.productId,
    );

    await cart.save();

    await cart.populate("items.product");

    res.status(200).json({
      success: true,

      message: "Product removed from cart",

      cart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};


const clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({
      user: req.user._id,
    });

    if (cart) {
      cart.items = [];

      await cart.save();
    }

    res.status(200).json({
      success: true,

      message: "Cart cleared",
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

module.exports = {
  addToCart,

  getCart,

  updateCartQuantity,

  removeFromCart,

  clearCart,
};
