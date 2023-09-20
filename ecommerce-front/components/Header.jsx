import styles from "@/styles/Header.module.scss";

export default function Header({ title, subtitle }) {
  return (
    <div className={styles["Header"]}>
      <div className={styles["header--hero"]}>
        <h1 className={styles["header--hero-title"]}>{title}</h1>
        <h2 className={styles["header--hero-subtitle"]}>{subtitle}</h2>
      </div>
    </div>
  );
}