import { entries } from '../../data/entries'

export default function handler(req,res) {
	const httpMethod = req.method;
	const id = req.query.id;
	const date = req.query.date;
	if(httpMethod === 'GET') {
		// query
		res.status(200).json(entries)
	} else if(httpMethod ==='POST') {
		const { id, date, content } = req.body;
		res.status(200).json({ // send back the inputted data
			id: id,
			date: date,
			content: content
		})
	}
}