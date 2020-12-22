import React from 'react';
import imgLogo from '../pics/dashboard/Logo-black.png';
import styles from '../modules/dashboard.module.css';
import avatar from '../pics/dashboard/Avatar-male.png';
import weather from '../pics/dashboard/weather.png';
import dumbbell from '../pics/dashboard/dumbbell.png';
import weightlifter from '../pics/dashboard/weightlifter.png';
import flame from '../pics/dashboard/flame.png';
import scale from '../pics/dashboard/scale.png';
import lineTop from '../pics/dashboard/line-top.png';
import workoutDia from '../pics/dashboard/workout-diagram.png';
import weightDia from '../pics/dashboard/weight-diagram.png';
import calories from '../pics/dashboard/calories.png';
import carbs from '../pics/dashboard/carbs.png';
import protein from '../pics/dashboard/protein.png';
import fat from '../pics/dashboard/fat.png';


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
            <div className={styles.profileWrapper}>
                <span>Name</span>
                <a href="#"><img src={avatar} /></a>
            </div>
            </nav>
            <div className={styles.dateWeatherWrapper}>
                <div className={styles.date}>Monday, December 14, 2020</div>
                <div className={styles.weatherTownWrapper}>
                    <div className={styles.weatherIcon}><img src={weather} /></div>
                    <div className={styles.town}>Hamburg, 7°</div>
                </div>
            </div>
            <main className={styles.panel}>
                <div className={styles.tilesWrapper}>
                    <div className={styles.workoutsWrapper}>
                        <div className={styles.tilesIcon}><img src={dumbbell} /></div>
                        <span className={styles.tilesCounter}>Workouts done<br/>10</span>
                    </div>
                    <div className={styles.exercisesWrapper}>
                        <div className={styles.tilesIcon}><img src={weightlifter} /></div>
                        <san className={styles.tilesCounter}>Exercises created<br/>12</san>
                    </div>
                    <div className={styles.streakWrapper}>
                        <div className={styles.tilesIcon}><img src={flame} /></div>
                        <span className={styles.tilesCounter}>Streak (days)<br/>10</span>
                    </div>
                    <div className={styles.weightWrapper}>
                        <div className={styles.tilesIcon}><img src={scale} /></div>
                        <span className={styles.tilesCounter}>Weight difference<br/>-2</span>
                    </div>
                </div>
                <div className={styles.mainInfoWrapper}>
                    <div className={styles.workoutOverview}>
                        <h4>Workout Overview</h4>
                        <img src={lineTop}/>
                        <div className={styles.workoutDiagram}><img src={workoutDia} /></div>
                    </div>
                    <div className={styles.nutrition}>
                        <h4>Nutrition</h4>
                        <img src={lineTop}/>
                        <div className={styles.nutritionIcons}>
                            <img src={calories} />
                            <span className={styles.caloriesFigures}>3000</span>
                            <img src={carbs} />
                            <span className={styles.carbsFigures}>350</span>
                            <img src={protein} />
                            <span className={styles.proteinFigures}>200</span>
                            <img src={fat} />
                            <span className={styles.fatFigures}>120</span>
                        </div>
                    </div>
                    <div className={styles.weightDifference}>
                        <h4>Weight</h4>
                        <img src={lineTop}/>
                        <div className={styles.weightDiagram}><img src={weightDia} /></div>
                    </div>
                </div>
            </main>
        </div>
    )
}
