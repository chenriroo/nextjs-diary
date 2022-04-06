import { useEffect } from "react"
import styles from "../styles/EntryPreview.module.scss"

export default function EntryPreview({entry, type}) {

	//console.log(entry)

	return (
		<div className={styles.entryPreview}>
			<span className={styles.entryPreview__day}>1</span>
			<span className={styles.entryPreview__create}>+</span>
		</div>
	)
}