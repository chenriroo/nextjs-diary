import { useState, useEffect, useRef } from 'react'
import styles from '../styles/Navigation.module.scss'
import DatePicker from './Datepicker';
import Entries from './Entries';

export default function Navigation({
	setCurDayObj, handleCreateEntry, inputDate, curEntries, isFetching,
	curDayObj, curDate, menuIsOpen, setMenuIsOpen, setEntriesIndex
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
		}, 200);
		
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
					setCurDayObj={setCurDayObj}
					handleCreateEntry={handleCreateEntry}
					isFetching={isFetching}
					curDayObj={curDayObj}
					curDate={curDate}
					setEntriesIndex={setEntriesIndex}
				/>
			</div>

		</nav>
	)
}