const catchAsyncErrors = require("../middleware/catchAsyncError");

// const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const Stripe = require("stripe");
const stripe = Stripe(
  "sk_test_51KuXMcSIu0aRNa3oFBqNCJHvEVMGQac7a7wiM8luvOQlnsT0LlGGeXtxUWsMwM9Rx78CV6fwhqhXyHCZDaiCnYgD00tMRCSL1Y"
);

exports.processPayment = catchAsyncErrors(async (req, res, next) => {
  const myPayment = await stripe.paymentIntents.create({
    amount: req.body.amount,
    currency: "inr",
    payment_method_types: ["card"],
    metadata: {
      company: "Ecommerce",
    },
  });
  res.status(200).json({
    sucess: true,
    client_secret: myPayment.client_secret,
  });
});

exports.sendStripeApiKey = catchAsyncErrors(async (req, res, next) => {
  res.status(200).json({
    stripeApiKey: process.env.STRIPE_API_KEY,
  });
});
