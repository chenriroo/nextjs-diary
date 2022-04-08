import { useEffect, useState } from 'react'

import styles from '../styles/Navigation.module.scss'
import PanelSlider from './PanelSlider'

export default function Navigation({
	handleSelectEntry, handleCreateEntry, inputDate, entries
}) {
	


	function clickHome() {
		console.log('click home')
	}

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
			/>

			<div className={styles.menubar}>
				<button onClick={clickHome}>Home</button>
				<button onClick={toggleNavigation}>Entries</button>
			</div>

		</nav>
	)
}