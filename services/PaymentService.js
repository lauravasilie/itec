const stripe = require("stripe")("sk_test_X19BI0f0aTYF37kkYvHBmrSd00Go8myvzd");

stripe.charges.retrieve("ch_1Fi6rrANWt066SkGlwAR3vEi", {
    api_key: "sk_test_X19BI0f0aTYF37kkYvHBmrSd00Go8myvzd"
  });