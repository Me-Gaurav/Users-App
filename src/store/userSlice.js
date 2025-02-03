import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    users: [],
};

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        setUsers: (state, action) => {
            state.users = action.payload;
        },
        createUser: (state, action) => {
            const newUser = { ...action.payload, id: state.users.length + 1 };
            state.users.push(newUser);
        },
        editUser: (state, action) => {
            const { id, name, email, phone, address, zipcode } = action.payload;

            state.users = state.users.map(user =>
                user.id === id ? { ...user, name, email, phone, address, zipcode } : user
            );
        },
        deleteUser: (state, action) => {
            // delete the user with the matching id
            state.users = state.users.filter(user => user.id !== action.payload);
        }
    },
});

// Export actions
export const { setUsers, deleteUser, createUser, editUser } = usersSlice.actions;

export default usersSlice.reducer;
