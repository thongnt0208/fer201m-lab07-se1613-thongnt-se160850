import { createSlice } from "@reduxjs/toolkit";


//Redux state slice (create redux store)
export const accountSlice = createSlice({
    name: "account",
    initialState: { value: { displayName: '', photoURL: '', } },
    reducers: {
        login: (state, action) => {
            // console.log("LoginAccount", action.payload);
            if (action.payload != null) {
                if (action.payload.displayName === 'Thông Nguyễn Trung') {
                    state.value = null;
                    state.value = action.payload;
                };
            }
            //... is REST technique
            // console.log("LoginAccount", state.value);
        },
        logout: (state, action) => { // Write code for deleteUser fuction
            console.log('Logout', action.payload);
            state.value = null;
        }
    }
});
//export reducer
export default accountSlice.reducer;
//export actions
export const { login, logout } = accountSlice.actions;
