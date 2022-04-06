import { useState } from 'react';
import styles from '../styles/PanelSlider.module.scss';
import DatePicker from './Datepicker';
import Entries from './Entries';

export default function SliderMenu({fetchMonth, entries, inputDate}) {



	return (
		<div className={styles.sliderPanel}>

			<DatePicker inputDate={inputDate} />

			

		</div>
	)
}

//<Entries entries={entries}/>