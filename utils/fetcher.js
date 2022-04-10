import { useEffect, useState } from "react";
import formatTime from "./formatTime";

export default function useFetchEntries(curDate) {
	const [isFetching, setFetching] = useState(false);
	const [entries, setEntries] = useState([]);

	useEffect(function fetching() {
		(async function() {
			const date = `${curDate.year}-${curDate.month}`;			
			setFetching(true);
			const res = await fetch(`http://localhost:5000/entries?date_like=${date}`);
			const data = await res.json();

			setTimeout(() => {
				setEntries(formatTime(data));
				setFetching(false);
			}, 3000);
			
		})();
	}, [curDate])
	return [isFetching, entries]
}

	// const res = await fetch(`
	// 	https://chenriroo-json-server-heroku.herokuapp.com/entries?date_like=${date}
	// 	`);
