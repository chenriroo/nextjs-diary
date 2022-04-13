import styles from '../styles/Datepicker.module.scss'
import { useState, useRef, useEffect } from 'react'

function generateYears(yearsBack) {
	const curYear = new Date().getFullYear();
	const years = [];
	for(let i=0; i<yearsBack; i++) {
		const year = curYear - i;
		years.push(year.toString())
	}
	return years
}



export default function DatePicker({ inputDate, curDate }) {
	const [inputYearIsOpen, setToggleYear] = useState(false);
	const [inputMonthIsOpen, setToggleMonth] = useState(false);

	const selectYearRef = useRef();
	const selectMonthRef = useRef();

	const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
	const years = generateYears(20);

	function handleInputMonth(e) {
		let dataVal = e.target.dataset.value; 
		if(dataVal<10 && dataVal>0) dataVal = `0${dataVal}`
		inputDate(dataVal, 'month')
	}

	function handleInputYear(e) {
		const dataVal = e.target.dataset.value
		inputDate(dataVal, 'year')
	}

	useEffect(() => {
		
		if(inputYearIsOpen || inputMonthIsOpen) {
			document.addEventListener('click', handleClickOutsideYear)
		} else {
			document.removeEventListener('click', handleClickOutsideYear)
		}
		return () => {
			document.removeEventListener('click', handleClickOutsideYear)
		}
	}, [inputYearIsOpen, inputMonthIsOpen])

	function handleClickOutsideYear(e) {
		const target = e.target
		if(selectYearRef && selectYearRef.current.contains(target)) {
			return
		}
		if(selectMonthRef && selectMonthRef.current.contains(target)) {
			return
		}
		setToggleYear(false)
		setToggleMonth(false)
	}


	return (
		<div className={styles.datepicker}>

			<div 
			className={`${styles.dropdown} ${inputYearIsOpen && styles.dropdownActive}`} 
			onClick={()=>setToggleYear(!inputYearIsOpen)}
			ref={selectYearRef}
			role="listbox">
				
				<span className={styles.dropdownSelected}>{curDate.year}</span>
				<div className={styles.arrow}></div>

				<div className={`${styles.dropdownOptions} ${!inputYearIsOpen && styles.hidden}`}>
					{years.map((year,i) => <div key={year} data-value={year} className={styles.dropdownOption} onClick={handleInputYear}>{year}</div>)}
				</div>
			</div>

			<div
			className={`${styles.dropdown} ${inputMonthIsOpen && styles.dropdownActive}`}
			onClick={()=>setToggleMonth(!inputMonthIsOpen)}
			ref={selectMonthRef}
			role="listbox">
				
				<span className={styles.dropdownSelected}>{months[Number(curDate.month)]}</span>
				<div className={styles.arrow}></div>

				<div className={`${styles.dropdownOptions} ${!inputMonthIsOpen && styles.hidden}`}>
					{months.map((month,i) => <div key={i} data-value={i} className={styles.dropdownOption} onClick={handleInputMonth}>{month}</div>)}
				</div>
			</div>

		</div>
	)
}