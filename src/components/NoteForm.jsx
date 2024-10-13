// NoteForm.jsx
import { useState } from "react";

const NoteForm = ({ createNote }) => {
	const [newNote, setNewNote] = useState("");

	const addNote = (event) => {
		event.preventDefault();
		createNote({
			content: newNote,
			important: true,
		});

		setNewNote("");
	};

	return (
		<div className="w-3/4 transition-all duration-300 ">
			<h1 className="text-4xl font-bold flex w-full py-5 mt-8 mb-8">
				Create a new note
			</h1>

			<form onSubmit={addNote} className="flex ">
				<input
					className="border border-gray-300 p-2 flex-1"
					value={newNote}
					onChange={(e) => setNewNote(e.target.value)}
					placeholder="Write a new note"
				/>
				<button type="submit" className="bg-[#38b6ff] text-white px-4 py-2 ">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
						// class="ai ai-ArrowUp"
					>
						<path d="M12 20V4" />
						<path d="M5 11l7-7 7 7" />
					</svg>
				</button>
			</form>
		</div>
	);
};

export default NoteForm;
