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
		//console.log(fooRef.current)
		if(fooRef.current && fooRef.current.contains(e.target)) {
			return
		}
		setMenuIsOpen(false);
	}

	function handleClickNav() {
		console.log('handleClickNav')
		setMenuIsOpen(!menuIsOpen)
	}

	return (
		<nav 
		className={`${styles.navigation} ${!menuIsOpen && styles.navigationCollapsed}`}
		>

			<div 
			className={`${styles.menubar} ${!menuIsOpen && styles.menubarCollapsed}`}
			onClick={handleClickNav}> 
				<div className={`${styles.icon} ${menuIsOpen && styles.hidden} `}></div>
			</div>


			<div className={styles.picker} ref={fooRef} >
				<DatePicker inputDate={inputDate} curDate={curDate}/>

				<Entries 
					curEntries={curEntries}
					handleSelectEntry={handleSelectEntry}
					handleCreateEntry={handleCreateEntry}
					isFetching={isFetching}
					curEntry={curEntry}
					curDate={curDate}
				/>
			</div>

			<div className={`${styles.menubarBottom} ${!menuIsOpen && styles.hidden}`}>
				<div className={styles.icon}></div>
			</div>

		</nav>
	)
}

// ${menuIsOpen && styles.hidden}