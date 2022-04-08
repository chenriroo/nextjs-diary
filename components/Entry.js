import { useState, useEffect} from "react";
import styling from "../styles/Entry.module.scss"

export default function Entry({ entry }) {
	const [isEditing, setEditMode] = useState(false);
	const [date, setDate] = useState(entry.date)
	const [time, setTime] = useState(entry.time);
	const [content, setContent] = useState(entry.content);

	function edit() {
		console.log('Entry.edit')
	}
	console.log(date, time, content)

	useEffect(() => {
		setContent(entry.content)
		setTime(entry.time)
		setDate(entry.date)
	},[entry])

	let html;
	if(isEditing) {
		html =
			<form className={styling.entry__content}>
				<input type="date"
					className={styling.date}
					readOnly
					value={entry.date}>
				</input>
				<input type="time" 
					className={styling.time}
					value={entry.time}
					onChange={(e) => setTime(e.target.value)}>
				</input>
				<textarea 
					className={styling.textarea}
					value={content}
					onChange={(e) => setContent(e.target.value)}>
				</textarea>
			</form>
	} else {
		html = 
		<div className={styling.entry__content}>
			<input type="date" className={styling.date} defaultValue={entry.date} readOnly></input>
			<input type="time" className={styling.time} defaultValue={entry.time} readOnly></input>
			<p>{content}</p>
		</div>
	}

	return (
		<div className={styling.entry}>
			<div className={styling.entry__settings}>
				<button 
					className={styling.btn}
					onClick={() => setEditMode(!isEditing)}>
						{isEditing ? "View" : "Edit"}
					</button>
				<button className={styling.btn}>Delete</button>
			</div>

			{html}
		</div>
	)

}