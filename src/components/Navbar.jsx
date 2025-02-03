import React, { useState } from "react"

import addUserIcon from "../assets/addUser.svg"
import UserForm from "./UserForm"

const Navbar = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)

    return (
        <nav className="navbar text-bg-primary py-3 px-4 sticky-top">
            <div>
                <span className="fs-4 fw-semibold">User List</span>
            </div>

            <div>
                <button
                    type="button"
                    className="btn btn-outline-light d-flex justify-content-center align-items-center gap-1"
                    onClick={() => setIsModalOpen(true)}>
                    <img src={addUserIcon} /> Create User
                </button>
            </div>

            {
                isModalOpen ? (
                    <UserForm isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} type="Create"/>
                ) : null
            }
        </nav>
    )
}

export default Navbar