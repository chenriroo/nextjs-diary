import styles from '../styles/Toolbar.module.scss'

export default function Toolbar({ curEntries, menuIsOpen, setMenuIsOpen, curDayObj, isMultiEntry, entriesIndex, setEntriesIndex }) {

	function browseMultiEntry(e) {
		const type = e.target.closest(`.${styles.btnContainer}`).dataset.browse;

		if(type === "previous") {
			if(entriesIndex === 0) return
			setEntriesIndex(entriesIndex - 1)
		} else if (type === "next") {
			if(entriesIndex === curDayObj.entries.length-1) return
			setEntriesIndex(entriesIndex + 1)
		} else return
	}


	return (
		<div className={styles.container}>

			<div
			className={`${styles.btnContainer} ${!isMultiEntry && styles.hidden}`}
			data-browse="previous"
			onClick={browseMultiEntry}>
				<div className={styles.iconHamburger}></div>
			</div>

			<div
			className={`${styles.btnContainer} ${menuIsOpen && styles.btnActive}`}
			onClick={()=>setMenuIsOpen(!menuIsOpen)}>
				<div className={styles.iconHamburger}></div>
			</div>

			<div
			className={`${styles.btnContainer} ${!isMultiEntry && styles.hidden}`}
			data-browse="next"
			onClick={browseMultiEntry}>
				<div className={styles.iconHamburger}></div>
			</div>

		</div>

	)
}