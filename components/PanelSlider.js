import styles from '../styles/PanelSlider.module.scss';
import DatePicker from './Datepicker';
import Entries from './Entries';

export default function SliderMenu({
	curEntries, inputDate, handleSelectEntry, handleCreateEntry, isFetching, isHidden, curEntry, curDate
	}) {

	return (
		<div className={`${styles.sliderPanel} ${isHidden ? styles.collapse : ''}`}>

			<DatePicker inputDate={inputDate} />

			<Entries 
				curEntries={curEntries}
				handleSelectEntry={handleSelectEntry}
				handleCreateEntry={handleCreateEntry}
				isFetching={isFetching}
				curEntry={curEntry}
				curDate={curDate}
			/>

		</div>
	)
}