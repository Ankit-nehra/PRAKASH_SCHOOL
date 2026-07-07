import styles from "./Loader.module.css";
import busImage from "../../assets/images/school-bus.jpg";

export default function Loader() { 
  return (
    <div className={styles.loaderContainer}>
      <div className={styles.busWrapper}>
        {/* Loading text on bus */}
        <div className={styles.busText}>
          Prakash Public School
        </div>

        <div className={styles.busImageWrapper}>
          <img
            src={busImage}
            alt="School Bus"
            className={styles.busImage}
          />
        </div>

        <div className={`${styles.wheel} ${styles.frontWheel}`}></div>
        <div className={`${styles.wheel} ${styles.backWheel}`}></div>
      </div>
    </div>
  );
}
