import { useEffect, useState } from 'react'
import Head from 'next/head'
import Entry from '../components/Entry'
import Navigation from '../components/Navigation'
import styles from '../styles/Home.module.scss'
import formatTime from '../utils/formatTime'

export default function Home() {
	const [curEntry, setCurEntry] = useState({})
	const [entries, setEntries]= useState([])
	const [curDate, setCurDate] = useState({
		year: `${new Date().getFullYear()}`,
		month: `${new Date().getMonth()}`
	})

	function inputDate(e) {
		const target = e.target;
		setCurDate({
			...curDate,
			[target.name]: target.value
		})
	}

	async function handleCreateEntry(day) {
		let hours = new Date().getHours();
		let minutes = new Date().getMinutes();

		const res = await fetch (`https://chenriroo-json-server-heroku.herokuapp.com/`, {
			method: 'POST',
			headers: {
				'content-type': 'application/json'
			},
			body: JSON.stringify({
				date: new Date(curDate.year, curDate.month-1, day, hours, minutes),
				content: ""
			})
		})
		const data = await res.json();
		const formattedEntryObj = formatTime([data])
		setCurEntry(...formattedEntryObj)
	}

	function handleSelectEntry(e,entry) {
		setCurEntry(entry)
	}

	async function updateEntry(input) {
		const strDate = new Date(`${input.date} ${input.time}`)
		const objNewEntry = {
			date: strDate,
			content: input.content
		}

		const res = await fetch(`http://localhost:5000/entries/${input.id}`, {
			method: 'PUT',
			headers: {
				'content-type': 'application/json'
			},
			body: JSON.stringify(objNewEntry)
		})
		const data = await res.json();

		const formattedEntryObj = formatTime([data])
		setCurEntry(...formattedEntryObj)
	}

	async function deleteEntry(id) {
		console.log('delete:',id)
		await fetch(`https://chenriroo-json-server-heroku.herokuapp.com/${id}`, {
			method: 'DELETE',
		})
		setCurEntry({});
	}

	// Fetch entries on state date
	useEffect(() => {
		if(!curDate.month || !curDate.year) return

		const fetchEntries = async () => {
			const date = `${curDate.year}-${curDate.month}`
			const res = await fetch(`https://chenriroo-json-server-heroku.herokuapp.com/entries?date_like=${date}`);
			//const res = await fetch(`/api/entries`)
			const data = await res.json();
	
			setEntries(formatTime(data).map(entry => entry))
		}

		fetchEntries();
	},[curDate.month, curDate.year, curEntry]);


	return (
		<div className={styles.container}>
			<Head>
				<title>nextJS - Diary</title>
				<meta name="description" content="Generated by create next app" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			{Object.keys(curEntry).length > 0 ? 
				<Entry 
					entry={curEntry}
					updateEntry={updateEntry}
					deleteEntry={deleteEntry}/> : undefined }
			
			
			<Navigation 
				handleSelectEntry={handleSelectEntry}
				handleCreateEntry={handleCreateEntry}
				inputDate={inputDate}
				entries={entries}
			/>
		</div>
	)
}
