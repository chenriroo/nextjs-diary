import { useState, useEffect, useReducer} from "react";
import styles from "../styles/Entry.module.scss"

export default function Entry({ entry, updateEntry, deleteEntry, isFetching, isMultiEntry, setIsMultiEntry }) {
	const [isEditing, setEditMode] = useState(false);
	const [multiEntry, setMultiEntry] = useState({})
	const [date, setDate] = useState("");
	const [time, setTime] = useState("");
	const [content, setContent] = useState("");

	let htmlEntry, htmlEmpty;

	function handleUpdate(e) {
		e.preventDefault();
		updateEntry({
			id: entry.id,
			date: date,
			time: time,
			content: content
		})
	}

	function browseMultiEntry() {

	}

	useEffect(() => {
		if(entry.type === "multi") {
			setIsMultiEntry(true)
			setMultiEntry(entry)
			
		} else {
			setIsMultiEntry(false)
		}

		setContent(entry.content)
		setTime(entry.time)
		setDate(entry.date)
	},[entry, setIsMultiEntry])

	const htmlToolbar = 
		<div className={styles.containerEntryToolbar}>

			<div className={styles.containerDateTime}>
				<span className={styles.date}>
					{isMultiEntry ? multiEntry.entries[0].date : date}
				</span>
				<input type="time" 
					className={styles.editTime}
					value={isMultiEntry ? multiEntry.entries[0].time : time}
					onChange={(e) => setTime(e.target.value)}>
				</input>
			</div>

			<div className={styles.containerSettings}>
				<button 
					className={styles.btn}
					onClick={() => setEditMode(!isEditing)}>
						{isEditing ? "View" : "Edit"}
					</button>
				<button
					className={styles.btn}
					onClick={() => deleteEntry(entry.id)}>
					Delete
				</button>
			</div>

		</div>

	if(entry.type == "empty") {
		htmlEmpty =
			<div>Create an entry via the datepicker</div>
		console.log('No entry so display something else')
	} else if(isEditing) {
		htmlEntry =
			<form className={styles.entryContent}>

				<textarea 
					className={styles.textarea}
					value={isMultiEntry ? multiEntry.entries[0].content : content}
					onChange={(e) => setContent(e.target.value)}>
				</textarea>
				<button onClick={(e) => handleUpdate(e)}>Update</button>
			</form>
	} else if(!isEditing) {
		htmlEntry = 
		<div className={styles.entryContent}>
			<p className={styles.paragraph}>
				{isMultiEntry ? multiEntry.entries[0].content : content}
			</p>
		</div>
	}

	return (
		<div className={styles.entryContainer}>

			{entry.type === 'empty' ? '' : htmlToolbar}

			{entry.type === 'empty' ? htmlEmpty : htmlEntry}
		</div>
	)

}