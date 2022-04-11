import { useEffect } from "react"
import styles from "../styles/EntryPreview.module.scss"

export default function EntryPreview({
		entry, handleSelectEntry, handleCreateEntry, isActive
	}) {
	

	function handleClick(e) {
		if(e.target.dataset.fn === 'select') {
			handleSelectEntry(e,entry)
		} else if(e.target.dataset.fn === 'create') {
			handleCreateEntry(entry.day)
		}
	}

	let html;
	if(entry.type === "single") {
		html = 
		<div className={`${styles.entryPreview} ${isActive ? styles.active : ''}`}>
		
			<span className={styles.entryPreview__day}>{entry.day}</span>
			<span 
				className={`${styles.entryPreview__content} `}
				onClick={(e) => handleClick(e)}
				data-fn="select">
					single
			</span>
			<span 
				className={styles.entryPreview__create}
				onClick={(e) => handleClick(e)}
				data-fn="create">
				+
			</span>
		</div>
	} else if (entry.type === "multi") {
		html = 
		<div className={`${styles.entryPreview} ${isActive ? styles.active : ''}`}>
			<span className={styles.entryPreview__day}>{entry.day}</span>
			<span className={styles.entryPreview__content}>
				<select className={styles.entryPreview__dropdown} onClick={(e) => handleClick(e)}>
					{entry.entries.map(entry => (
						<option key={entry.id}>{entry.time}</option>
					))}
				</select>
			</span>
			<span 
				className={styles.entryPreview__create}
				onClick={(e) => handleClick(e)}
				data-fn="create">
				+
			</span>
		</div>
	} else if (entry.type === "empty") {
		html = 
		<div className={`${styles.entryPreview} ${styles.entryPreviewEmpty} ${isActive ? styles.active : ''}`}>
			<span className={styles.entryPreview__day}>{entry.day}</span>
			<span 
					className={styles.entryPreview__content}
					onClick={(e) => handleClick(e)}
					data-fn="select">
				empty
			</span>
			<span 
				className={styles.entryPreview__create}
				onClick={(e) => handleClick(e)}
				data-fn="create">
				+
			</span>
		</div>

	} 

	return (
		<div>{html}</div>
	)
}