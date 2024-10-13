import { useState, useEffect } from "react";
import Note from "./components/Note";
import Notification from "./components/Notification";
import noteService from "./services/notes";
import loginService from "./services/login";
import LoginForm from "./components/LoginForm";
import NoteForm from "./components/NoteForm";
// import Togglable from "./components/Togglable";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";

const App = () => {
	const [notes, setNotes] = useState([]);
	const [newNote, setNewNote] = useState("");
	const [showAll, setShowAll] = useState(true);
	const [errorMessage, setErrorMessage] = useState(null);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [user, setUser] = useState(null);
	const [isSidebarOpen, setIsSidebarOpen] = useState(true);

	const toggleSidebar = () => {
		setIsSidebarOpen(!isSidebarOpen);
	};

	useEffect(() => {
		noteService.getAll().then((initialNotes) => {
			setNotes(initialNotes);
		});
	}, []);

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem("loggedNoteappUser");
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON);
			setUser(user);
			noteService.setToken(user.token);
		}
	}, []);

	const addNote = (noteObject) => {
		noteService.create(noteObject).then((returnedNote) => {
			setNotes(notes.concat(returnedNote));
			setNewNote("");
		});
	};

	const deleteNote = (id) => {
		// console.log("delete note", id);
		noteService
			.remove(id)
			.then(() => {
				setNotes(notes.filter((note) => note.id !== id));
			})
			.catch((error) => {
				setErrorMessage(`Note '${id}' was already removed from the server`);
				setTimeout(() => setErrorMessage(null), 5000);
			});
	};
	// Add this function inside your App component
	const updateNote = (id, newContent) => {
		const note = notes.find((n) => n.id === id);
		const changedNote = { ...note, content: newContent };

		noteService
			.update(id, changedNote)
			.then((returnedNote) => {
				setNotes(notes.map((note) => (note.id !== id ? note : returnedNote)));
			})
			.catch((error) => {
				setErrorMessage(
					`Note '${note.content}' was already removed from server`
				);
				setTimeout(() => {
					setErrorMessage(null);
				}, 5000);
			});
	};

	const toggleImportanceOf = (id) => {
		const note = notes.find((n) => n.id === id);
		const changedNote = { ...note, important: !note.important };

		noteService
			.update(id, changedNote)
			.then((returnedNote) => {
				setNotes(notes.map((note) => (note.id !== id ? note : returnedNote)));
			})
			.catch((error) => {
				setErrorMessage(
					`Note '${note.content}' was already removed from server`
				);
				setTimeout(() => {
					setErrorMessage(null);
				}, 5000);
			});
	};

	const handleNoteChange = (event) => {
		setNewNote(event.target.value);
	};

	const notesToShow = showAll ? notes : notes.filter((note) => note.important);

	const handleLogin = async (event) => {
		event.preventDefault();
		try {
			const user = await loginService.login({ username, password });
			window.localStorage.setItem("loggedNoteappUser", JSON.stringify(user));
			noteService.setToken(user.token);
			setUser(user);
			setUsername("");
			setPassword("");
		} catch (exception) {
			setErrorMessage("Wrong credentials");
			setTimeout(() => {
				setErrorMessage(null);
			}, 5000);
		}
		console.log("logging in with", username, password);
	};

	const handleLogout = () => {
		window.localStorage.removeItem("loggedNoteappUser");
		setUser(null);
		noteService.setToken(null);
	};

	return (
		<div className="bg-[#ffffff] min-h-screen">
			<div className="flex">
				<main className="flex-1">
					<Notification message={errorMessage} />
					{user === null ? (
						<LoginForm
							username={username}
							password={password}
							handleUsernameChange={({ target }) => setUsername(target.value)}
							handlePasswordChange={({ target }) => setPassword(target.value)}
							handleSubmit={handleLogin}
						/>
					) : (
						<div>
							{/* Sidebar */}
							<Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

							<Navbar
								user={user}
								toggleSidebar={toggleSidebar}
								handleLogout={handleLogout}
							/>

							{/* Main Content */}
							<div
								className={`flex flex-col items-center mx-auto transition-all duration-300 ${
									isSidebarOpen ? "ml-64" : "ml-0"
								}`}
							>
								<div className="flex relative w-1/2 transition-all duration-300">
									{/* <Togglable buttonLabel="new note"> */}
									<NoteForm createNote={addNote} />
									{/* </Togglable> */}
									<div className="mt-4">
										<button
											className="bg-[#38b6ff] text-white px-4 py-2 absolute right-0 bottom-0"
											onClick={() => setShowAll(!showAll)}
										>
											show {showAll ? "important" : "all"}
										</button>
									</div>
								</div>
								<ul
									className={"mt-6 space-y-2 w-1/2 transition-all duration-300"}
								>
									{notesToShow &&
										notesToShow.map((note) => (
											<Note
												key={note.id}
												note={note}
												toggleImportance={() => toggleImportanceOf(note.id)}
												deleteNote={() => deleteNote(note.id)}
												updateNote={updateNote} // Pass the updateNote function
											/>
										))}
								</ul>
							</div>
						</div>
					)}
				</main>
			</div>
		</div>
	);
};

export default App;
