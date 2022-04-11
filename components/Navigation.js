import { useState } from 'react'

import styles from '../styles/Navigation.module.scss'
import PanelSlider from './PanelSlider'

export default function Navigation({
	handleSelectEntry, handleCreateEntry, inputDate, entries, isFetching
}) {
	const [isHidden, setMenu] = useState(false)
	
	console.log(isHidden)

	return (
		<nav className={styles.navigation}>

			<PanelSlider
				entries={entries}
				inputDate={inputDate}
				handleSelectEntry={handleSelectEntry}
				handleCreateEntry={handleCreateEntry}
				isFetching={isFetching}
				isHidden={isHidden}
			/>

			<div className={styles.menubar}>
				<button onClick={() => setMenu(!isHidden)}>Entries</button>
			</div>

		</nav>
	)
}