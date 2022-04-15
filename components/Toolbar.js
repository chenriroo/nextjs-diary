import styles from '../styles/Toolbar.module.scss'

export default function Toolbar({ curEntries, menuIsOpen, setMenuIsOpen, curEntry, isMultiEntry, multiEntryPage, setMultiEntryPage }) {

	function browseMultiEntry(e) {
		const type = e.target.dataset.browse;
		if(type === "previous") {
			if(multiEntryPage === 0) return
			setMultiEntryPage(multiEntryPage - 1)
		} else {
			console.log(multiEntryPage)
			if(multiEntryPage === curEntry.entries.length-1) return
			setMultiEntryPage(multiEntryPage + 1)

		} 
	}


	return (
		<div className={styles.container}>


			<div
			className={`${styles.btnContainer} ${!isMultiEntry && styles.hidden}`}
			data-browse="previous"
			onClick={browseMultiEntry}>
				<div 
				className={styles.iconHamburger}>
				</div>
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
				<div 
				className={styles.iconHamburger}>
				</div>
			</div>

		</div>

	)
}