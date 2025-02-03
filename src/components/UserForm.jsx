import React, { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { toast } from "react-toastify";

import closeIcon from "../assets/closeIcon.svg"
import { createPlaceholder } from "../data/helpers/createPlaceholder"
import { inputTypeHandler } from "../data/helpers/inputTypeHandler"
import { createUser, editUser } from "../store/userSlice"

const UserForm = ({ isOpen, onClose, type, user }) => {
    const [formValues, setFormValues] = useState({ name: "", email: "", phone: "", city: "", zipcode: "" })

    const dispatch = useDispatch()

    useEffect(() => {
        if (user?.id) {
            const { name, email, phone, city, zipcode } = user
            setFormValues({ ...formValues, name, email, phone, city, zipcode })
        }
    }, [user])

    // creating or updating user handler
    const handleSubmit = (e) => {
        e.preventDefault()
        if (type === "Create") {
            dispatch(createUser(formValues))
            toast.success("User created successfully", { autoClose: 2000 });
            onClose()
        } else {
            dispatch(editUser({ ...formValues, ...{ id: user.id } }))
            toast.success("User edited successfully", { autoClose: 2000 });
            onClose()
        }
    }

    return (
        <div className={`modal fade ${isOpen ? "show d-block" : ""}  d-flex align-items-center`}>
            <div className="modal-dialog w-100 shadow-lg rounded-3">
                <div className="modal-content">
                    {/* header */}
                    <div className="modal-header d-flex justify-content-between px-3">
                        <span className="fs-5 bold text-black">{type} User</span>
                        <button onClick={onClose} className="btn p-0 border-0 bg-transparent">
                            <img src={closeIcon} />
                        </button>
                    </div>

                    {/* content */}
                    <form onSubmit={handleSubmit}>
                        <div className="modal-body px-3 d-flex flex-column gap-3">
                            {
                                Object.keys(formValues).map((ele, index) => {
                                    return (
                                        <div className="form-group" key={index}>
                                            <input
                                                required
                                                className="form-control"
                                                value={formValues[ele]}
                                                type={inputTypeHandler(ele)}
                                                placeholder={createPlaceholder(ele)}
                                                onChange={(e) => setFormValues({ ...formValues, [ele]: e.target.value })}
                                            />
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className="modal-footer px-3">
                            <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
                            <button type="submit" className="btn btn-primary">{type === "Create" ? "Create" : "Save"}</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default UserForm