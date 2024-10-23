// Sidebar.jsx
import React from "react";
import { FaBars } from "react-icons/fa";

const Sidebar = ({ isOpen, toggleSidebar }) => {
	return (
		<aside
			className={`bg-[#f7f6f2] w-80 h-screen p-4 fixed top-0 left-0 transform ${
				isOpen ? "translate-x-0" : "-translate-x-full"
			} transition-transform duration-300`}
		>
			<div className="flex justify-between items-center mb-4">
				<h1 className="text-4xl font-bold">NoteApp</h1>
				<FaBars className="cursor-pointer" onClick={toggleSidebar} size={24} />
			</div>
		</aside>
	);
};

export default Sidebar;