import { useState, useEffect } from "react";
import EntryPreview from "./EntryPreview"
import Loading from "./Loading";
import styles from "../styles/Entries.module.scss"

// Creates object for days with entry or multiple entries
const filterDayMultiEntries = (entries) => {
	const objMultiDays = [];	// array with days with multiple entries
	const objSingleDays = [] // array with days with single entries
	const arrDays = []; // Array with day(s) having multiple entries
	for(let i=1; i<=31; i++) {
		let objEntry={
			day: i,
			type: '', 
			entries: []
		};
		entries.filter(entry => {
			if(entry.day === i) objEntry.entries.push(entry)	
		})
		if(objEntry.entries.length===0) continue
		if(objEntry.entries.length>1) {
			objEntry.type = 'multi'
			objMultiDays.push(objEntry);
			arrDays.push(objEntry.day);
		} else {
			objEntry.type = 'single'
			objSingleDays.push(objEntry);
		}
	}

	return [arrDays, objMultiDays, objSingleDays];
}

const prepareData = (entries) => {
	const arr1=[], arr2=[], arr3=[], arr4=[], arr5=[]; // each array holds a 7 days max
	
	const existingDays = new Set(entries.map(entry => entry.day)); // Day(s) with entry
	const arrPlaceholders = [];
	for(let i=1; i<=31; i++) {	// Create entry object for days without entry
		if(existingDays.has(i)) continue
		arrPlaceholders.push({
			day: i,
			type: 'empty',
			entries: [],
		})
	}

	const [arrDaysMultipleEntries, arrObjectsDaysMultipleEntries, arrObjectsDaysSingleEntry] = filterDayMultiEntries(entries);
	
	const arrEntries = []
		.concat(arrObjectsDaysSingleEntry, arrObjectsDaysMultipleEntries, arrPlaceholders)
		.sort((a,b) => a.day-b.day)

	arrEntries.forEach(entry => {
		if(entry.day <=7) {
			arr1.push(entry)
		} else if(entry.day > 7 && entry.day <= 14) {
			arr2.push(entry)
		} else if(entry.day > 14 && entry.day <= 21) {
			arr3.push(entry)
		} else if(entry.day > 21 && entry.day <= 28) {
			arr4.push(entry)
		} else if(entry.day > 28) {
			arr5.push(entry)
		}
	})


	return [arr1,arr2,arr3,arr4,arr5]
}

export default function Entries({
	curEntries, setCurDayObj, handleCreateEntry, isFetching, curDayObj, curDate, setEntriesIndex
	}) {
	const [arrData, setArrData] = useState([[],[],[],[],[]])
	const [activeEntry, setActiveEntry] = useState(0) // 
	
	useEffect(() => { // Fetched data
		setArrData(prepareData(curEntries))
	},[curEntries])

	useEffect(() => { // Selected an entry
		setActiveEntry(curDayObj)
	},[curDayObj])

	useEffect(() => { // Date changed: remove active entry
		setActiveEntry(0)
	},[curDate])

	return (
		
		<div className={styles.entries}>

			<div className={styles.column}>
				{arrData[0].map((entry) => (
					<EntryPreview 
						key={entry.day}
						entry={entry}
						setCurDayObj={setCurDayObj}
						handleCreateEntry={handleCreateEntry}
						isActive={activeEntry===entry.day ? true : false}
						setEntriesIndex={setEntriesIndex}
					/>
				))}
			</div>

			<div className={styles.column}>
				{arrData[1].map((entry) => (
					<EntryPreview 
						key={entry.day}
						entry={entry}
						setCurDayObj={setCurDayObj}
						handleCreateEntry={handleCreateEntry}
						isActive={activeEntry===entry.day ? true : false}
						setEntriesIndex={setEntriesIndex}
					/>
					))}
			</div>

			<div className={styles.column}>
				{arrData[2].map((entry) => (
						<EntryPreview 
						key={entry.day}
						entry={entry}
						setCurDayObj={setCurDayObj}
						handleCreateEntry={handleCreateEntry}
						isActive={activeEntry===entry.day ? true : false}
						setEntriesIndex={setEntriesIndex}
					/>
					))}
			</div>

			<div className={styles.column}>
				{arrData[3].map((entry) => (
						<EntryPreview 
						key={entry.day}
						entry={entry}
						setCurDayObj={setCurDayObj}
						handleCreateEntry={handleCreateEntry}
						isActive={activeEntry===entry.day ? true : false}
						setEntriesIndex={setEntriesIndex}
					/>
					))}
			</div>

			<div className={styles.column}>
				{arrData[4].map((entry) => (
						<EntryPreview 
						key={entry.day}
						entry={entry}
						setCurDayObj={setCurDayObj}
						handleCreateEntry={handleCreateEntry}
						isActive={activeEntry===entry.day ? true : false}
						setEntriesIndex={setEntriesIndex}
					/>
					))}
			</div>

			
			
			<Loading isFetching={isFetching} />




		</div>
	)
}