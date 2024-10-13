import React from "react";
import { FaBars, FaUser } from "react-icons/fa";

const Navbar = ({ user, toggleSidebar, handleLogout }) => {
	return (
		<div>
			<div className="flex items-center bg-[#f2f0f0] px-4">
				{/* FontAwesome Menu Icon */}
				<FaBars className="cursor-pointer" onClick={toggleSidebar} size={24} />
				<div className="flex justify-end items-center space-x-4 w-full p-4">
					<div className="flex items-center space-x-2">
						<FaUser className="text-gray-600" size={24} />
						<p>{user.name}</p>
					</div>
					<button
						type="button"
						onClick={handleLogout}
						className="px-8 py-2 text-black border border-black"
					>
						Log out
					</button>
				</div>
			</div>
		</div>
	);
};

export default Navbar;
