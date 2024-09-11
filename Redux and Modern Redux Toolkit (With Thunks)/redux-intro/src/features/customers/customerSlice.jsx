import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  fullName: "",
  nationalID: "",
  createdAt: "",
};

const customerSlice = createSlice({
  name: "customer",
  initialState: initialState,
  reducers: {
    createCustomer(state, action) {
      return { ...state, ...action.payload, createdAt: new Date().toISOString() };
    },
    updateName(state, action) {
      state.fullName = action.payload;
    },
  },
});

// export default function customerReducer(state = initialStateCustomer, action) {
//   switch (action.type) {
//     case "customer/createCustomer":
//       return { ...state, ...action.payload };
//     case "customer/updateName":
//       return { ...state, fullName: action.payload };
//     default:
//       return state;
//   }
// }

// export function createCustomer(fullName, nationalID) {
//   return { type: "customer/createCustomer", payload: { fullName, nationalID, createdAt: new Date().toISOString() } };
// }

// export function updateName(fullName) {
//   return { type: "customer/updateName", payload: fullName };
// }

export const { createCustomer, updateName } = customerSlice.actions;
export default customerSlice.reducer;
