import { useEffect } from "react"
import styles from "../styles/EntryPreview.module.scss"

export default function EntryPreview({
		entry, isActive, handleSelectEntry, handleCreateEntry, toggleActiveDay
	}) {
	

	function handleClick(e) {
		console.log('handleClick')
		toggleActiveDay(e, entry.day)
		handleSelectEntry(e,entry)
		
	}

	//console.log(entry.day, isActive)

	let html;
	if(entry.type === "single") {
		html = <span 
				className={styles.entryPreview__content}
				onClick={(e) => handleClick(e)}>
					single
				</span>
	} else if (entry.type === "multi") {
		html = <span className={styles.entryPreview__content}>
			<select onClick={(e) => handleClick(e)}>
				<option>bla</option>
				<option>bla</option>
			</select>
		</span>
	} else if (entry.type === "empty") {
		html = <span 
				className={styles.entryPreview__content}
				onClick={(e) => handleClick(e)}>
			empty
		</span>

	} 

	return (

		<div className={styles.entryPreview}>
		
			<span className={styles.entryPreview__day}>{entry.day}</span>
			{html}
			<span 
				className={styles.entryPreview__create}
				onClick={handleCreateEntry}>
				+
			</span>
		</div>
	)
}