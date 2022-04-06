import { useState, useEffect } from "react";
import EntryPreview from "./EntryPreview"
import styles from "../styles/Entries.module.scss"

// Find a way to add 'type:'single' to days that have a single entry
const filterDayMultiEntries = (entries) => {
	const objDays = [];	// array with object of a day with multiple entries
	const arrDays = []; // Array with day(s) having multiple entries
	for(let i=1; i<=31; i++) {
		let foo={
			day: i,
			type: 'multi', 
			entries: []
		};
		entries.filter(entry => {
			if(entry.day === i) foo.entries.push(entry)	
		})
		if(foo.entries.length>1) {
			objDays.push(foo);
			arrDays.push(foo.day)
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



export default function Entries({ entries }) {
	const [arrData, setArrData] = useState([])
	const [selectedEntry, setSelectedEntry] = useState({})

	//console.log('propEntries:', entries)
	const arrEntries = prepareData(entries)
	// console.log('arrEntries', arrEntries)
	

	return (
		<div className={styles.entries}>

			<div className={styles.entries__column}>
				{arrEntries[0].map((entry,id) => (
					<EntryPreview 
						key={id}
						entry={entry}	
					/>
				))}
			</div>

			<div className={styles.entries__column}>
				{arrEntries[1].map((entry,id) => (
					<EntryPreview 
						key={id}
						entry={entry}	
					/>
					))}
			</div>

			<div className={styles.entries__column}>
				{arrEntries[2].map((entry,id) => (
						<EntryPreview 
						key={id}
						entry={entry}	
					/>
					))}
			</div>

			<div className={styles.entries__column}>
				{arrEntries[3].map((entry,id) => (
						<EntryPreview 
						key={id}
						entry={entry}	
					/>
					))}
			</div>

			<div className={styles.entries__column}>
				{arrEntries[4].map((entry,id) => (
						<EntryPreview 
						key={id}
						entry={entry}	
					/>
					))}
			</div>

		</div>
	)
}