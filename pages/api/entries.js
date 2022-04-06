import { entries } from '../../data/entries'

export default function handler(req,res) {
	const httpMethod = req.method;



	if(httpMethod === 'GET') {
		res.status(200).json(entries)
	}
}