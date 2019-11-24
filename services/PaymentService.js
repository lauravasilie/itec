// const stripe = require("stripe")("sk_test_X19BI0f0aTYF37kkYvHBmrSd00Go8myvzd");

// const PaymentService = {
//     pay: async (req, res) => {
//       try {
//         const token = req.headers['auth-token'];
//         let session = await Session.findOne({token}).lean().exec();
//         if (!session) {
//           res.status(401).json("Session token is not valid");
//         } 
//         else {
//           const amount = req.body.amount
//           stripe.customers.create({
//             mail: req.body.user.email,
//             source: token
//           }).then(customer =>
//           stripe.charges.create({ // charge the customer
//             amount,
//             description: "Sample Charge",
//             currency: "ron",
//             customer: customer.id
//           }))
//           .then(charge => res.status(200).send("Succesful payment"));
//         } 
//       } catch (err) {
//         res.status(400).json()
//       }}
// }

// module.exports = PaymentService