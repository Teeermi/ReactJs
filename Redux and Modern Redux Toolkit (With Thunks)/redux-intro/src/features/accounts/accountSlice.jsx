import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  balance: 0,
  loan: 0,
  loanPuropse: "",
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    deposit(state, action) {
      state.balance += action.payload;
    },
    withdraw(state, action) {
      state.balance -= action.payload;
    },
    requestLoan(state, action) {
      state.loan = action.payload.amount;
      state.loanPuropse = action.payload.purpose;
      state.balance += action.payload.amount;
    },
    payLoan(state) {
      state.loan = 0;
      state.loanPuropse = "";
    },
  },
});

export const { deposit, withdraw, requestLoan, payLoan } = accountSlice.actions;

export default accountSlice.reducer;

// export default function accountReducer(state = initialStateAccount, action) {
//   switch (action.type) {
//     case "account/deposit":
//       return { ...state, balance: state.balance + action.payload };

//     case "account/withdraw":
//       return { ...state, balance: state.balance - action.payload };
//     case "account/requestLoan":
//       if (state.loan > 0) return state;
//       return { ...state, loan: action.payload.amount, loanPuropse: action.payload.purpose, balance: state.balance + action.payload.amount };

//     case "account/payLoan":
//       return { ...state, loan: 0, loanPuropse: "", balance: state.balance - state.loan };
//     default:
//       return state;
//   }
// }

// export function deposit(amount) {
//   return { type: "account/deposit", payload: amount };
// }
// export function withdraw(amount) {
//   return { type: "account/withdraw", payload: amount };
// }
// export function requestLoan(amount, purpose) {
//   return { type: "account/requestLoan", payload: { amount, purpose } };
// }
// export function payLoan() {
//   return { type: "account/payLoan" };
// }
