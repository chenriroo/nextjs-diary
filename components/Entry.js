import { useState, useEffect} from "react";
import styles from "../styles/Entry.module.scss"

export default function Entry({ entry, updateEntry, deleteEntry, isFetching }) {
	const [isEditing, setEditMode] = useState(false);
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

	useEffect(() => {
		setContent(entry.content)
		setTime(entry.time)
		setDate(entry.date)
	},[entry])


	const htmlSettings = 
		<div className={styles.settingsContainer}>
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

	if(entry.type == "empty") {
		htmlEmpty =
			<div>Create an entry via the datepicker</div>
		console.log('No entry so display something else')
	} else if(isEditing) {
		htmlEntry =
			<form className={styles.entryContent}>
				<input type="date"
					className={styles.date}
					readOnly
					value={entry.date}>
				</input>
				<input type="time" 
					className={styles.time}
					value={entry.time}
					onChange={(e) => setTime(e.target.value)}>
				</input>
				<textarea 
					className={styles.textarea}
					value={content}
					onChange={(e) => setContent(e.target.value)}>
				</textarea>
				<button onClick={(e) => handleUpdate(e)}>Update</button>
			</form>
	} else if(!isEditing) {
		htmlEntry = 
		<div className={styles.entryContent}>
			<h2>{date}, {time}</h2>
			<p className={styles.paragraph}>{content}</p>
		</div>
	}

	return (
		<div className={styles.entryContainer}>
			{entry.type === 'empty' ? '' : htmlSettings}
			{entry.type === 'empty' ? htmlEmpty : htmlEntry}
		</div>
	)

}