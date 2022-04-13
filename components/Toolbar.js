import styles from '../styles/Toolbar.module.scss'

export default function Toolbar({ curEntries, menuIsOpen, setMenuIsOpen }) {

	return (
		<div className={styles.container}>


			<div className={styles.btnContainer}>
				<div 
				className={styles.iconHamburger}
				onClick={()=>setMenuIsOpen(!menuIsOpen)}>
				</div>
			</div>

			<div
			className={`${styles.btnContainer} ${menuIsOpen && styles.btnActive}`}
			onClick={()=>setMenuIsOpen(!menuIsOpen)}>
				<div className={styles.iconHamburger}></div>
			</div>

			<div className={styles.btnContainer}>
				<div 
				className={styles.iconHamburger}
				onClick={()=>setMenuIsOpen(!menuIsOpen)}>
				</div>
			</div>

		</div>

	)
}