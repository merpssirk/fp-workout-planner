import React from 'react';
import imgLogo from '../pics/home/Logo.png';
import styles from '../modules/dashboard.module.css';

export default function Dashboard() {
    return (
        <div className={styles.background}>
            <nav className={styles.navBar}>
                <ul>
                    <a href="home"><img src={imgLogo} /></a>
                    <li><a href="motivation">Edit Workout</a></li>
                    <li><a href="services">Daily Activties</a></li>
                    <li><a href="testimonials">Workout Overview</a></li>
                </ul>
            </nav>
            <section className={styles.profileWrapper}>
                <span>Name</span>
                {/* <img src={avatar} /> */}
            </section>
            <div className={styles.dateWeatherWrapper}>
                <div className={styles.date}></div>
                <div className={styles.weatherIcon}></div>
                <div className={styles.town}></div>
            </div>
            <main className={styles.panel}>
                <div className={styles.tilesWrapper}>
                    <div className={styles.workoutsWrapper}>
                        <div className={styles.tilesIcon}></div>
                        <div className={styles.tilesCounter}></div>
                    </div>
                    <div className={styles.exercisesWrapper}>
                        <div className={styles.tilesIcon}></div>
                        <div className={styles.tilesCounter}></div>
                    </div>
                    <div className={styles.streakWrapper}>
                        <div className={styles.tilesIcon}></div>
                        <div className={styles.tilesCounter}></div>
                    </div>
                    <div className={styles.weightWrapper}>
                        <div className={styles.tilesIcon}></div>
                        <div className={styles.tilesCounter}></div>
                    </div>
                </div>
                <div className={styles.mainInfoWrapper}>
                    <div className={styles.workoutOverview}>
                        <h2>Workout Overview</h2>
                        <div className={styles.workoutDiagram}></div>
                    </div>
                    <div className={styles.nutrition}>
                        <h2>Nutrition</h2>
                        <div className={styles.nutritionIcons}></div>
                    </div>
                    <div className={styles.weightNutrition}>
                        <h2>Weight</h2>
                        <div className={styles.weightDiagramm}></div>
                    </div>
                </div>
            </main>
        </div>
    )
}
