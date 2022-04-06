export default function DatePicker({ inputDate }) {

	function generateYears() {
		const curYear = new Date().getFullYear();
		const years = [];
		for(let i=0; i<20; i++) {
			years.push(curYear - i)
		}
		return years
	}


	return (
		<div>
		<label>Year</label>
		<select className="datepicker-year" name="year" onClick={inputDate}>
			{generateYears().map((year,index) => (<option key={index} value={year}>{year}</option>))}
		</select>

		<label>Month</label>
		<select className="datepicker-month" name="month" onClick={inputDate}>
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
	</div>
	)
}