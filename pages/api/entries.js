import { entries } from '../../data/entries'

export default function handler(req,res) {
	const httpMethod = req.method;


	if(httpMethod === 'GET') {
		// query
		res.status(200).json(entries)
	} else if(httpMethod ==='POST') {
		// TODO
	}
}