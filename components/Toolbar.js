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
			className={`${styles.btnContainer} ${!isMultiEntry && styles.btnContainerInactive}`}
			data-browse="previous"
			onClick={browseMultiEntry}>
				<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path
					className={`${styles.iconChevron} ${!isMultiEntry && styles.iconInactive}`}
					d="M16.2426 6.34317L14.8284 4.92896L7.75739 12L14.8285 19.0711L16.2427 17.6569L10.5858 12L16.2426 6.34317Z"
					
				/>
				</svg>
			</div>

			<div
			className={`${styles.btnContainer} ${menuIsOpen && styles.btnActive}`}
			onClick={()=>setMenuIsOpen(!menuIsOpen)}>
				<div className={styles.iconHamburger}></div>
			</div>

			<div
			className={`${styles.btnContainer} ${!isMultiEntry && styles.btnContainerInactive}`}
			data-browse="next"
			onClick={browseMultiEntry}>
				<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path 
						className={`${styles.iconChevron} ${!isMultiEntry && styles.iconInactive}`}
						d="M10.5858 6.34317L12 4.92896L19.0711 12L12 19.0711L10.5858 17.6569L16.2427 12L10.5858 6.34317Z" 
						
					/>
				</svg>
			</div>

		</div>

	)
}