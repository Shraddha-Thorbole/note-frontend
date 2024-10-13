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
			<div className="font-sans">
				<div className="flex items-center justify-between mt-10">
					<h2 className="text-xl text-[#b0aeae]">ALL LISTS</h2>
					<button className="bg-[#38b6ff] text-white py-1 px-3 rounded">
						+
					</button>
				</div>
				<ul className="space-y-2 text-base mt-4">
					<li className="hover:bg-gray-200  rounded cursor-pointer">
						Untitled Checklist
					</li>
					<li className="hover:bg-gray-200 rounded cursor-pointer">
						Untitled Checklist
					</li>
					{/* Add more items here */}
				</ul>
			</div>
		</aside>
	);
};

export default Sidebar;
