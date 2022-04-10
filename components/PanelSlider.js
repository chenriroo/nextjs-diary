import { useState } from 'react';
import styles from '../styles/PanelSlider.module.scss';
import DatePicker from './Datepicker';
import Entries from './Entries';

export default function SliderMenu({
	entries, inputDate, handleSelectEntry, handleCreateEntry, isFetching
	}) {



	return (
		<div className={styles.sliderPanel}>

			<DatePicker inputDate={inputDate} />

			<Entries 
				entries={entries}
				handleSelectEntry={handleSelectEntry}
				handleCreateEntry={handleCreateEntry}
				isFetching={isFetching}
			/>

		</div>
	)
}