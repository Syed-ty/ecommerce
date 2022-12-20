const { payment } = require('../model/payment-model');

const getAllpaymentDetails = async (req, res, next) => {
    try {
        const paymentData = await payment.find();
        if (paymentData) {
            res.status(200).json({
                error: false,
                message: 'payment data fetched successfully',
                response: paymentData
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
const getpaymentDetailsById = async (req, res, next) => {
    try {
        const paymentData = await payment.find({_id:req.params.id});
        if (paymentData) {
            res.status(200).json({
                error: false,
                message: 'payment data fetched successfully',
                response: paymentData
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
const addpaymentDetails = async (req, res, next) => {
    try {
        const {
            cardName, cvv} = req.body;

        let paymentData = await payment.create({
            userId: req.params.id,
            cardName:cardName,
            cvv:cvv,
            });
        
        res.send({
            error: false,
            message: "payment details added successfully",
            response: paymentData
        })

    } catch (err) {
        next(err.message)
    }
}

const UpdatepaymentdDetails = async (req, res, next) => {
    try {
        const {
            cardName, cvv
              } = req.body;

     let editpaymentDetails = await payment.findByIdAndUpdate({_id:req.params.id},{
        cardName:cardName,
        cvv:cvv,
           },{new:true})
        
        res.status(200).json({
            error: false,
            message: "payment details updated sucessfully",
            response: editpaymentDetails
        })
    } catch (err) {
        next(err.message)
    }
}
const DeletepaymentdDetails = async (req, res, next) => {
    try {
        const {cardName,cvv, } = req.body;

        let deletepaymentDetails = await payment.findByIdAndDelete({
            _id: req.params.id
        })
        
        res.status(200).json({
            error: false,
            message: "payment details deleted sucessfully",
            response: deletepaymentDetails
        })
    } catch (err) {
        next(err.message)
    }
}
module.exports = {
    getAllpaymentDetails,
    addpaymentDetails,
    UpdatepaymentdDetails,
    DeletepaymentdDetails,
    getpaymentDetailsById
}