import styles from '../styles/PanelSlider.module.scss';
import DatePicker from './Datepicker';
import Entries from './Entries';

export default function SliderMenu({
	entries, inputDate, handleSelectEntry, handleCreateEntry, isFetching, isHidden
	}) {

	return (
		<div className={`${styles.sliderPanel} ${isHidden ? styles.collapse : ''}`}>

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