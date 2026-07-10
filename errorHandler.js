const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const Product = require('../models/Product');

// @desc Get cart
// @route GET /api/cart
const getCart = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).populate('cart.product');
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json(user.cart);
});

// @desc Add to cart
// @route POST /api/cart
const addToCart = asyncHandler(async (req, res) => {
  const { productId, quantity = 1 } = req.body;
  const user = await User.findById(req.user._id);
  const product = await Product.findById(productId);
  if (!product) return res.status(404).json({ message: 'Product not found' });

  const itemIndex = user.cart.findIndex((i) => i.product.toString() === productId);
  if (itemIndex > -1) {
    user.cart[itemIndex].quantity += quantity;
  } else {
    user.cart.push({ product: productId, quantity });
  }
  await user.save();
  const updated = await User.findById(req.user._id).populate('cart.product');
  res.json(updated.cart);
});

// @desc Update cart item
// @route PUT /api/cart/:productId
const updateCartItem = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  const itemIndex = user.cart.findIndex((i) => i.product.toString() === req.params.productId);
  if (itemIndex > -1) {
    if (req.body.quantity <= 0) {
      user.cart.splice(itemIndex, 1);
    } else {
      user.cart[itemIndex].quantity = req.body.quantity;
    }
    await user.save();
    const updated = await User.findById(req.user._id).populate('cart.product');
    res.json(updated.cart);
  } else {
    res.status(404).json({ message: 'Item not in cart' });
  }
});

// @desc Remove from cart
// @route DELETE /api/cart/:productId
const removeFromCart = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  user.cart = user.cart.filter((i) => i.product.toString() !== req.params.productId);
  await user.save();
  const updated = await User.findById(req.user._id).populate('cart.product');
  res.json(updated.cart);
});

// @desc Clear cart
// @route DELETE /api/cart
const clearCart = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(req.user._id, { cart: [] });
  res.json([]);
});

module.exports = { getCart, addToCart, updateCartItem, removeFromCart, clearCart };
