import styles from '../styles/Loading.module.scss'


export default function Loading ({isFetching}) {



	return (
		<div className={`${styles.loaderContainer} ${isFetching ? styles.visible : ''}`}>
			<div className={styles.spinner}></div>
		</div>

	)
}