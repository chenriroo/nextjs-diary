import styles from '../styles/Loading.module.scss'


export default function Loading ({text, isFetching}) {



	return (
		<div className={styles.loaderContainer}>
			<div className={styles.spinner}></div>
		</div>

	)
}