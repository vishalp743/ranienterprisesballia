const { Cart } = require('../models/cart');
const express = require('express');
const router = express.Router();


router.get(`/`, async (req, res) => {

    try {

        const cartList = await Cart.find(req.query);

        if (!cartList) {
            res.status(500).json({ success: false })
        }

        return res.status(200).json(cartList);

    } catch (error) {
        res.status(500).json({ success: false })
    }
});



router.post('/add', async (req, res) => {

  
    // Check if userId is a temporary ID
    let userId = req.body.userId;

if (!isNaN(userId)) {
  // If userId is a numeric string, it's a temporary ID
  userId = userId;
} else {
  // If userId is not a number, it's the actual user ID
  userId = req.body.userId;
}

  
    const cartItem = await Cart.findOne({ productId: req.body.productId, userId: userId });
  
    if (!cartItem) {
      let cartList = new Cart({
        productTitle: req.body.productTitle,
        image: req.body.image,
        rating: req.body.rating,
        price: req.body.price,
        quantity: req.body.quantity,
        subTotal: req.body.subTotal,
        productId: req.body.productId,
        userId: userId,
        countInStock: req.body.countInStock,
      });
  
      if (!cartList) {
        return res.status(500).json({
          error: err,
          success: false,
        });
      }
  
      cartList = await cartList.save();
  
      res.status(201).json(cartList);
    } else {
      res.status(401).json({ status: false, msg: "Product already added in the cart" });
    }
  });
  
router.delete('/clear/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        await Cart.deleteMany({ userId: userId });
        res.status(200).json({ success: true, message: 'Cart cleared successfully' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});


router.delete('/:id', async (req, res) => {

    const cartItem = await Cart.findById(req.params.id);

    if (!cartItem) {
        res.status(404).json({ msg: "The cart item given id is not found!" })
    }

    const deletedItem = await Cart.findByIdAndDelete(req.params.id);

    if (!deletedItem) {
        res.status(404).json({
            message: 'Cart item not found!',
            success: false
        })
    }

    res.status(200).json({
        success: true,
        message: 'Cart Item Deleted!'
    })
});



router.get('/:id', async (req, res) => {

    const catrItem = await Cart.findById(req.params.id);

    if (!catrItem) {
        res.status(500).json({ message: 'The cart item with the given ID was not found.' })
    }
    return res.status(200).send(catrItem);
})


router.put('/:id', async (req, res) => {

    const cartList = await Cart.findByIdAndUpdate(
        req.params.id,
        {
            productTitle: req.body.productTitle,
            image: req.body.image,
            rating: req.body.rating,
            price: req.body.price,
            quantity: req.body.quantity,
            subTotal: req.body.subTotal,
            productId: req.body.productId,
            userId: req.body.userId
        },
        { new: true }
    )

    if (!cartList) {
        return res.status(500).json({
            message: 'Cart item cannot be updated!',
            success: false
        })
    }

    res.send(cartList);

})


module.exports = router;

