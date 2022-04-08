import { useState, useEffect} from "react";
import styles from "../styles/Entry.module.scss"

export default function Entry({ entry, updateEntry, deleteEntry }) {
	const [isEditing, setEditMode] = useState(false);
	const [date, setDate] = useState("");
	const [time, setTime] = useState("");
	const [content, setContent] = useState("");

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
	
	let html;
	if(isEditing) {
		html =
			<form className={styles.entry__content}>
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
	} else {
		html = 
		<div className={styles.entry__content}>
			<h2>{date}, {time}</h2>
			<p className={styles.paragraph}>{content}</p>
		</div>
	}

	return (

		<div className={styles.entry}>

			<div className={styles.entry__settings}>
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

			{html}
		</div>
	)

}