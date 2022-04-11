import { useState } from 'react'

import styles from '../styles/Navigation.module.scss'
import PanelSlider from './PanelSlider'

export default function Navigation({
	handleSelectEntry, handleCreateEntry, inputDate, entries, isFetching, curEntry, curDate
}) {
	const [isHidden, setMenu] = useState(false)

	return (
		<nav className={styles.navigation}>

			<PanelSlider
				entries={entries}
				inputDate={inputDate}
				handleSelectEntry={handleSelectEntry}
				handleCreateEntry={handleCreateEntry}
				isFetching={isFetching}
				isHidden={isHidden}
				curEntry={curEntry}
				curDate={curDate}
			/>

			<div className={styles.menubar}>
				<button onClick={() => setMenu(!isHidden)}>Entries</button>
			</div>

		</nav>
	)
}