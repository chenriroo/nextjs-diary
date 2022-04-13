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

	function handleToggleYear() {
		setToggleYear(!inputYearIsOpen)
	}

	function handleToggleMonth() {
		setToggleMonth(!inputMonthIsOpen)
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
			onClick={handleToggleYear}
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
			onClick={handleToggleMonth}
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

/*
<span className={styles.dropdownIcon}></span>


<label>Year</label>
<select className={styles.dropdown} name="year" onClick={inputDate}>
	{generateYears().map((year,index) => (<option key={index} value={year}>{year}</option>))}
</select>

<label>Month</label>
<select className={styles.dropdown} name="month" onClick={inputDate}>
	<option value="01">January</option>
	<option value="02">February</option>
	<option value="03">March</option>
	<option value="04">April</option>
	<option value="05">May</option>
	<option value="06">June</option>
	<option value="07">July</option>
	<option value="08">August</option>
	<option value="09">September</option>
	<option value="10">October</option>
	<option value="11">November</option>
	<option value="12">December</option>
</select>

*/