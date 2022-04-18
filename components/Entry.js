import { useState, useEffect, useReducer} from "react";
import styles from "../styles/Entry.module.scss"

export default function Entry(
	{ curDayObj, updateEntry, deleteEntry, isMultiEntry, setIsMultiEntry, entriesIndex }
	) {
	
	const [isEditing, setEditMode] = useState(false);
	const [date, setDate] = useState("");
	const [time, setTime] = useState("");
	const [content, setContent] = useState("");

	let htmlEntry, htmlEmpty;

	function handleUpdate(e) {
		e.preventDefault();
		updateEntry({
			id: curDayObj.entries[entriesIndex].id,
			date: date,
			time: time,
			content: content
		})
	}

	useEffect(() => {
		curDayObj.type === "single" ? setIsMultiEntry(false) : setIsMultiEntry(true)
		console.log('useEffect Fired')
		console.log('Entry entriesIndex', entriesIndex)
		setContent(curDayObj.entries[entriesIndex].content)
		setTime(curDayObj.entries[entriesIndex].time)
		setDate(curDayObj.entries[entriesIndex].date)

		// console.log('Entry obj.entries:', curDayObj.entries)
		// console.log('Entry entriesIndex', entriesIndex)
	}, [curDayObj, entriesIndex, setIsMultiEntry])

	

	const htmlToolbar = 
		<div className={styles.containerEntryToolbar}>

			<div className={styles.containerDateTime}>
				<span className={styles.date}>
					{date}
				</span>
				<input type="time" 
					className={styles.editTime}
					value={time}
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
					onClick={() => deleteEntry(curDayObj.entries[entriesIndex].id)}>
					Delete
				</button>
			</div>

		</div>

	if(curDayObj.type == "empty") {
		htmlEmpty =
			<div>Create an entry via the datepicker</div>
		console.log('No entry so display something else')
	} else if(isEditing) {
		htmlEntry =
			<form className={styles.entryContent}>

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
			<p className={styles.paragraph}>
				{content}
			</p>
		</div>
	}

	return (
		<div className={styles.entryContainer}>
			{curDayObj.type === 'empty' ? '' : htmlToolbar}
			{curDayObj.type === 'empty' ? htmlEmpty : htmlEntry}
		</div>
	)

}