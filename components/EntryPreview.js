import styles from "../styles/EntryPreview.module.scss"

export default function EntryPreview({
		entry, setCurDayObj, handleCreateEntry, isActive, setEntriesIndex
	}) {
	
	function handleClick(e) {
		if(e.target.dataset.fn === 'select') {
			setCurDayObj(entry);
			setEntriesIndex(0);
		} else if(e.target.dataset.fn === 'create') {
			handleCreateEntry(entry); //entry.day
		}
	}

	let html;
	if(entry.type === "single" || entry.type === "multi") {
		html = 
		<div className={`${styles.entryPreview} ${isActive ? styles.active : ''}`}>
		
			<span className={styles.entryPreview__day}>{entry.day}</span>
			<span 
			className={`${styles.entryPreview__content} `}
			onClick={(e) => handleClick(e)}
			data-fn="select">
				{entry.type === "single" ? "single" : "multi"}
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
		<div
		className={`${styles.entryPreview} ${styles.entryPreviewEmpty} ${isActive ? styles.active : ''}`}>
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
		<div className={styles.container}>{html}</div>
	)
}