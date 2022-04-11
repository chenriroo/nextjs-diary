export default function formatTime(arrInput) {
	const newArr = arrInput.map(entry => {
		const jsDate = new Date(entry.date);
		const year = jsDate.getFullYear();
		let month = jsDate.getMonth() + 1;
		const day = jsDate.getDate();
		const hour = jsDate.getHours();
		let minutes = jsDate.getMinutes();
		
		if(month <10) month = `0${month}`;
		if(day <10) day = `0${day}`;
		if(hour<10) hour = `0${hour}`
		if(minutes<10) minutes = `0${minutes}`

		const date = `${year}-${month}-${day}`
		const time = `${hour}:${minutes}`
		
		const entryObj = {
			id: entry.id,
			day: parseInt(day),
			date: date,
			time: time,
			content: entry.content
		}

		return entryObj
	})

	return newArr
}