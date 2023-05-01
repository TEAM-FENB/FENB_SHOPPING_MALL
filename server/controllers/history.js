const { v4: uuidv4 } = require('uuid');

const defaultHistory = {
  email: '',
  purchases: [],
  // coupons: [],
};

let history = [
  {
    email: 'test@test.com',
    purchases: [],
    // coupons: [],
  },
];

const createUser = email => {
  history = [{ ...defaultHistory, email }, ...history];
};

const addPurchase = (email, newHistory) => {
  history = history.map(user =>
    user.email === email
      ? { ...user, purchases: [{ id: uuidv4(), orderDate: new Date(), ...newHistory }, ...user.purchases] }
      : user
  );
};

// const addCoupon = (email, historyId) =>
//   (users = users.map(user =>
//     user.email === email
//       ? {
//           ...user,
//           coupons: user.coupons.some(history => history.id === historyId)
//             ? user.coupons.map(history =>
//                 history.id === historyId ? { ...history, count: history.count + 1 } : history
//               )
//             : [{ id: historyId, count: 1 }, ...user.coupons],
//         }
//       : user
//   ));

const getPurchases = email => history.find(user => user.email === email).purchases;

// const getCoupons = email => history.find(user => user.email === email).coupons;

module.exports = {
  createUser,
  addPurchase,
  // addCoupon,
  getPurchases,
  // getCoupons,
};
