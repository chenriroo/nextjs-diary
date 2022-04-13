import { useState, useEffect, useRef } from 'react'
import styles from '../styles/Navigation.module.scss'
import DatePicker from './Datepicker';
import Entries from './Entries';

export default function Navigation({
	handleSelectEntry, handleCreateEntry, inputDate, curEntries, isFetching,
	curEntry, curDate, menuIsOpen, setMenuIsOpen
}) {
	
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
		if(fooRef.current && fooRef.current.contains(e.target)) {
			return
		}
		setTimeout(() => {
			setMenuIsOpen(false);
		}, 250);
		
	}

	function handleClickNav() {
		console.log('handleClickNav')
		setMenuIsOpen(!menuIsOpen)
	}

	return (
		<nav 
		className={`${styles.navigation} ${!menuIsOpen && styles.navigationCollapsed}`}>

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

		</nav>
	)
}