import { useState, useEffect} from "react";
import styling from "../styles/Entry.module.scss"

export default function Entry({ entry }) {
	const [isEditing, setEditMode] = useState(false);
	const [content, setContent] = useState(entry.content);
	const [time, setTime] = useState(entry.time);
	const [date, setDate] = useState(entry.date)

	useEffect(() => {
		setContent(entry.content)
		setTime(entry.time)
		setDate(entry.date)
	},[entry])


	let html;
	if(isEditing) {
		html =
			<form className={styling.entry__content}>
				<input type="date" className={styling.date} readOnly></input>
				<input type="time" className={styling.time}></input>
				<textarea 
					className={styling.textarea}
					value={content}
					onChange={() => setContent()}>
				</textarea>
			</form>
	} else {
		html = 
		<div className={styling.entry__content}>
			<input type="date" className={styling.date} readOnly></input>
			<input type="time" className={styling.time} readOnly></input>
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