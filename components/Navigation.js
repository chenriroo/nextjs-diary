import { useState, useEffect, useRef } from 'react'
import styles from '../styles/Navigation.module.scss'
import DatePicker from './Datepicker';
import Entries from './Entries';

export default function Navigation({
	handleSelectEntry, handleCreateEntry, inputDate, curEntries, isFetching,
	curEntry, curDate
}) {
	const [menuIsOpen, setMenuIsOpen] = useState(true)
	const fooRef = useRef();
	
	useEffect(() => {
		if(menuIsOpen) {
			document.addEventListener('mousedown', handleClickOutside)
		} else {
			document.removeEventListener('mousedown', handleClickOutside)
		}
		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [menuIsOpen])

	function handleClickOutside(e) {
		console.log(fooRef.current)
		if(fooRef.current && fooRef.current.contains(e.target)) {
			console.log('inside click')
			return
		}
		setMenuIsOpen(false);
	}

	function handleClickNav() {
		console.log('handleClickNav')
		setMenuIsOpen(!menuIsOpen)
	}

	console.log(menuIsOpen)

	return (
		<nav 
		className={`${styles.navigation} ${!menuIsOpen && styles.navigationCollapsed}`}
		ref={fooRef}>

			<div 
			className={`${styles.menubar} ${!menuIsOpen && styles.menubarCollapsed}`}
			onClick={handleClickNav}> 
			</div>


			<div className={styles.picker} >
				<DatePicker inputDate={inputDate} />

				<Entries 
					curEntries={curEntries}
					handleSelectEntry={handleSelectEntry}
					handleCreateEntry={handleCreateEntry}
					isFetching={isFetching}
					curEntry={curEntry}
					curDate={curDate}
				/>
			</div>



		</nav>
	)
}