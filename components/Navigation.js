import { useEffect, useState } from 'react'
import formatTime from '../utils/formatTime'
import styles from '../styles/Navigation.module.scss'
import PanelSlider from './PanelSlider'

export default function Navigation({fetchMonth, handleSelectEntry, handleCreateEntry}) {
	const [entries, setEntries]= useState([])
	const [curDate, setCurDate] = useState({
		year: '',
		month: ''
	})


	function inputDate(e) {
		const target = e.target;
		setCurDate({
			...curDate,
			[target.name]: target.value
		})
	}



	useEffect(() => {
		if(!curDate.month || !curDate.year) return

		const fetchEntries = async () => {
			const date = `${curDate.year}-${curDate.month}`
			//const res = await fetch(`http://localhost:5000/entries?date_like=${date}`);
			const res = await fetch(`/api/entries`)
			const data = await res.json();
	
			setEntries(formatTime(data).map(entry => entry))
		}

		fetchEntries();
	},[curDate.month, curDate.year]);


	function clickHome() {
		console.log('click home')
	}

	function toggleNavigation() {
		console.log('toggleNavigation')	
	}

	return (
		<nav className={styles.navigation}>

			<PanelSlider
				fetchMonth={fetchMonth}
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