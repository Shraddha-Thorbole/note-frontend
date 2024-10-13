import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faStar,
	faTrash,
	faStar as faStarOutline,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useRef, useEffect } from "react";

const Note = ({ note, toggleImportance, deleteNote, updateNote }) => {
	const [isEditing, setIsEditing] = useState(false);
	const [updatedContent, setUpdatedContent] = useState(note.content);
	const importantIcon = note.important ? faStar : faStarOutline;
	const editingRef = useRef(null);
	const handleEditToggle = () => {
		setIsEditing(true);
	};

	const handleUpdate = () => {
		if (updatedContent.trim() !== "") {
			updateNote(note.id, updatedContent);
		}
		setIsEditing(false);
	};

	const handleKeyPress = (event) => {
		if (event.key === "Enter") {
			handleUpdate();
		}
	};

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (editingRef.current && !editingRef.current.contains(event.target)) {
				setUpdatedContent(note.content);
				setIsEditing(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [note.content]);

	return (
		<li className="bg-[#f7f6f2] rounded-lg p-4 flex justify-between items-center mb-4">
			{isEditing ? (
				<div className="flex items-center" ref={editingRef}>
					<input
						type="text"
						value={updatedContent}
						onChange={(e) => setUpdatedContent(e.target.value)}
						onKeyPress={handleKeyPress}
						className="border border-black rounded-sm p-3 w-96 h-full"
						placeholder="Update your note..."
					/>
				</div>
			) : (
				<span
					className={`text-gray-800 ${
						note.important ? "font-extrabold" : "font-normal"
					} cursor-pointer`}
					onClick={handleEditToggle}
				>
					{note.content}
				</span>
			)}

			<div className="flex space-x-4">
				<button
					onClick={toggleImportance}
					className={`${
						note.important ? "text-[#38b6ff]" : "text-white"
					} hover:text-[#38b6ff]`}
				>
					<FontAwesomeIcon icon={importantIcon} />
				</button>

				{/* Delete note button */}
				<button
					onClick={deleteNote}
					className="text-red-600 hover:text-red-800 transition-colors duration-200"
				>
					<FontAwesomeIcon icon={faTrash} />
				</button>
			</div>
		</li>
	);
};

export default Note;
