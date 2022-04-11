import { useState, useEffect } from "react";
import EntryPreview from "./EntryPreview"
import Loading from "./Loading";
import styles from "../styles/Entries.module.scss"

// Find a way to add 'type:'single' to days that have a single entry
const filterDayMultiEntries = (entries) => {
	const objDays = [];	// array with object of a day with multiple entries
	const arrDays = []; // Array with day(s) having multiple entries
	for(let i=1; i<=31; i++) {
		let multiEntry={
			day: i,
			type: 'multi', 
			entries: []
		};
		entries.filter(entry => {
			if(entry.day === i) multiEntry.entries.push(entry)	
		})
		if(multiEntry.entries.length>1) {
			objDays.push(multiEntry);
			arrDays.push(multiEntry.day)
		}
	}
	return [arrDays, objDays];
}

const prepareData = (entries) => {
	const arr1=[], arr2=[], arr3=[], arr4=[], arr5=[];
	
	const existingDays = new Set(entries.map(entry => entry.day)); // Get day(s) with entry
	const arrPlaceholders = [];
	for(let i=1; i<=31; i++) {	// Create empty entry object for days without entry
		if(existingDays.has(i)) continue
		arrPlaceholders.push({
			id: "",
			day: i,
			date: "",
			time: "",
			content: "",
			type: 'empty'
		})
	}

	const [arrDaysMultipleEntries, arrObjectsDaysMultipleEntries] = filterDayMultiEntries(entries);

	const arrEntries = entries
		.filter(entry => !arrDaysMultipleEntries.includes(entry.day))
		.concat(arrObjectsDaysMultipleEntries, arrPlaceholders)
		.sort((a,b) => a.day-b.day)
		.map(entry => {
			if(!entry.hasOwnProperty('type')) {
				return { ...entry, type: 'single' }
			} else return { ...entry }
		} )

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
	entries, handleSelectEntry, handleCreateEntry, isFetching, curEntry
	}) {
	const [arrData, setArrData] = useState([[],[],[],[],[]])

	console.log(curEntry)

	useEffect(() => {
		setArrData(prepareData(entries))
	},[entries])

	return (
		
		<div className={styles.entries}>

			<div className={styles.entries__column}>
				{arrData[0].map((entry) => (
					<EntryPreview 
						key={entry.day}
						entry={entry}
						handleSelectEntry={handleSelectEntry}
						handleCreateEntry={handleCreateEntry}
						isActive={curEntry===entry.day ? true : false}
					/>
				))}
			</div>

			<div className={styles.entries__column}>
				{arrData[1].map((entry) => (
					<EntryPreview 
						key={entry.day}
						entry={entry}
						handleSelectEntry={handleSelectEntry}
						handleCreateEntry={handleCreateEntry}
						isActive={curEntry===entry.day ? true : false}
					/>
					))}
			</div>

			<div className={styles.entries__column}>
				{arrData[2].map((entry) => (
						<EntryPreview 
						key={entry.day}
						entry={entry}
						handleSelectEntry={handleSelectEntry}
						handleCreateEntry={handleCreateEntry}
						isActive={curEntry===entry.day ? true : false}
					/>
					))}
			</div>

			<div className={styles.entries__column}>
				{arrData[3].map((entry) => (
						<EntryPreview 
						key={entry.day}
						entry={entry}
						handleSelectEntry={handleSelectEntry}
						handleCreateEntry={handleCreateEntry}
						isActive={curEntry===entry.day ? true : false}
					/>
					))}
			</div>

			<div className={styles.entries__column}>
				{arrData[4].map((entry) => (
						<EntryPreview 
						key={entry.day}
						entry={entry}
						handleSelectEntry={handleSelectEntry}
						handleCreateEntry={handleCreateEntry}
						isActive={curEntry===entry.day ? true : false}
					/>
					))}
			</div>

			
			
			<Loading isFetching={isFetching} />




		</div>
	)
}