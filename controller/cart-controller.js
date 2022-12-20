const {
    cart
} = require('../model/cart-model');
const {
    product
} = require('../model/product-model');

const getAllCartDetails = async (req, res, next) => {
    try {
        const cartData = await cart.find();
        if (cartData) {
            res.status(200).json({
                error: false,
                message: 'cart data fetched successfully',
                response: cartData
            })
        } else {
            res.status(404).json({
                error: false,
                message: "No data found",
            })
        }
    } catch (err) {
        next(err.message)
    }
}
const getCartDetailsById = async (req, res, next) => {
    try {
        const cartData = await cart.find({_id:req.params.id});
        if (cartData) {
            res.status(200).json({
                error: false,
                message: 'cart data fetched successfully',
                response: cartData
            })
        } else {
            res.status(404).json({
                error: false,
                message: "No data found",
            })
        }
    } catch (err) {
        next(err.message)
    }
}
const addcartDetails = async (req, res, next) => {
    try {
        const {cartData} = req.body;
        let cartItemData = await cart.create({
            cartData
        });

        res.send({
            error: false,
            message: "cart details added successfully",
            response: cartItemData
        })

    } catch (err) {
        next(err.message)
    }
}

const UpdatecartdDetails = async (req, res, next) => {
    try {
        const {cartData} = req.body;

        let editcartDetails = await cart.findByIdAndUpdate({
            _id: req.params.id
        }, {cartData},
         {
            new: true
        })

        res.status(200).json({
            error: false,
            message: "cart details updated sucessfully",
            response: editcartDetails
        })
    } catch (err) {
        next(err.message)
    }
}

const addproductToCart = async (req, res, next) => {
    try { 
        const {cartData} = req.body;
        let productData = await product.findById({
            _id: cartData.productId
        });
        if (productData) {
         let cartItemData=   await cart.findByIdAndUpdate({
                _id: req.params.id
            }, {
                $set: {
                    productId: productData._id
                }
            },{new:true});
            res.send({
                error: false,
                message: "cart updated successfully",
                response: cartItemData
            })
        }
        else{
            let cartItemData = await cart.create({ cartData });
            console.log(cartItemData); 
            res.send({
                error: false,
                message: "product added to cart successfully",
                response: cartItemData
            })
        }
        

  } catch (err) {
        next(err.message)
    }
}
const deleteProductFormCart = async (req, res, next) => {
    try {
        const  productData  = req.body;
        const cartItemData = await cart.find({_id:req.params.id});
        cartItemData[0].cartData.forEach((ele,i)=>{
            productData.cartData.forEach(pval=>{
                if (ele.productId ==pval.productId) {
                     cartItemData[0].cartData.splice(i,1)
                }
            })
        })
      console.log(cartItemData[0].cartData);
        let editcartDetails = await cart.findByIdAndUpdate({
            _id: req.params.id
        }, {cartData:cartItemData[0].cartData},
         )

        res.status(200).json({
            error: false,
            message: "deleted from cart sucessfully",
            response:editcartDetails
        })
        

    } catch (err) {
        next(err.message)
    }
}
module.exports = {
    getAllCartDetails,
    addcartDetails,
    UpdatecartdDetails,
    getCartDetailsById,
     deleteProductFormCart,
     addproductToCart
}