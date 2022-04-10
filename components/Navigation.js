import { useEffect, useState } from 'react'

import styles from '../styles/Navigation.module.scss'
import PanelSlider from './PanelSlider'

export default function Navigation({
	handleSelectEntry, handleCreateEntry, inputDate, entries, isFetching
}) {
	
	function toggleNavigation() {
		console.log('toggleNavigation')	
	}

	return (
		<nav className={styles.navigation}>

			<PanelSlider
				entries={entries}
				inputDate={inputDate}
				handleSelectEntry={handleSelectEntry}
				handleCreateEntry={handleCreateEntry}
				isFetching={isFetching}
			/>

			<div className={styles.menubar}>
				<button onClick={toggleNavigation}>Entries</button>
			</div>

		</nav>
	)
}