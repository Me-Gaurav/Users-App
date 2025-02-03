import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from 'react-redux';
import { toast } from "react-toastify";

import { tableHeadings } from "../data/tableConstant"
import { deleteUser, setUsers } from "../store/userSlice";
import UserForm from "./UserForm";

const Users = () => {
    const [loading, setLoading] = useState(false)
    const [selectedUser, setSelectedUser] = useState({})
    const [isModalOpen, setIsModalOpen] = useState(false)

    const { users } = useSelector((state) => state.users);

    const dispatch = useDispatch()

    // Fetching users
    useEffect(() => {
        setLoading(true)
        fetch("https://jsonplaceholder.typicode.com/users")
            .then(response => response.json())
            .then(data => {
                const result = data.map((user) => {
                    const { id, name, email, phone, address } = user
                    return { id, name, email, phone, city: address.city, zipcode: address.zipcode }
                })
                dispatch(setUsers(result));
                toast.success("Users fetched successfully", { autoClose: 2000 });
                setLoading(false)
            })
            .catch(err => {
                console.log(err, "err")
                toast.error("Error in fetching users", { autoClose: 2000 });
            });
    }, []);

    // edit user handler
    const handleEditUser = (user) => {
        setIsModalOpen(true)
        setSelectedUser(user)
    }

    // delete user handler
    const handleDeleteUser = (id) => {
        dispatch(deleteUser(id))
        toast.success("User deleted successfully", { autoClose: 2000 });
    }

    // Loading indicator
    if (loading) {
        return (
            <div className="text-center">
                <div className="spinner-border text-primary" role="status">
                </div>
            </div>
        );
    }

    return (
        <div className="table-responsive">
            <table className="table">
                <thead>
                    <tr>
                        {
                            tableHeadings.map((heading, i) => <th key={i} className="py-3 text-nowrap">{heading}</th>)
                        }
                    </tr>
                </thead>

                <tbody>
                    {
                        users?.map((user, index) => (
                            <tr key={index}>
                                <td className="py-3 text-nowrap">{user.id}</td>
                                <td className="py-3 text-nowrap">{user.name}</td>
                                <td className="py-3 text-nowrap">{user.email}</td>
                                <td className="py-3 text-nowrap">{user.phone}</td>
                                <td className="py-3 text-nowrap">{user.city}</td>
                                <td className="py-3 text-nowrap">{user.zipcode}</td>
                                <td className="py-3 text-nowrap">
                                    <button className="btn btn-sm btn-outline-secondary me-2" onClick={() => handleEditUser(user)}>Edit</button>
                                    <button className="btn btn-sm btn-outline-danger" onClick={() => handleDeleteUser(user.id)}>Delete</button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>

            {
                isModalOpen ? (
                    <UserForm isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} type="Edit" user={selectedUser} />
                ) : null
            }
        </div>
    )
}

export default Users