import { initializeApp } from 'firebase/app';
import {
    getFirestore,
    collection,
    getDocs,
    onSnapshot,
    doc,
    getDoc,
    updateDoc,
    arrayUnion,
} from 'firebase/firestore';
import styles1 from '../styles/Leaderboard.module.css';
import styles2 from '../styles/Score.module.css';
import { useState, useEffect } from 'react';
let app, device, DeviceData, numberOfDevices, tableData, HighScore;

const fireBaseStartApp = () => {
    //const [Table, setTable] = useState([])

    // Import the functions you need from the SDKs you need
    // TODO: Add SDKs for Firebase products that you want to use
    // https://firebase.google.com/docs/web/setup#available-libraries

    // Your web app's Firebase configuration
    const firebaseConfig = {
        apiKey: 'AIzaSyCi3fWR5GzEs-PSnnZE8166B4S8jEA8mN0',
        authDomain: 'ticketdispenser.firebaseapp.com',
        projectId: 'ticketdispenser',
        storageBucket: 'ticketdispenser.appspot.com',
        messagingSenderId: '801262064617',
        appId: '1:801262064617:web:4563de9fce7b3aac82b178',
    };

    // Initialize Firebase
    app = initializeApp(firebaseConfig);
    // console.log('App launched');
};

//This gets the database on realtime based on the device (Promise)
const getDatabase = () => {
    return new Promise((resolve, reject) => {
        const db = getFirestore(app);
        onSnapshot(doc(db, 'LeaderboardsAndParameters', device), (doc) => {
            resolve({ ...doc.data(), id: doc.id });
        });
    });
};

const getMainLeaderboard = () => {
    return new Promise((resolve, reject) => {
        const db = getFirestore(app);
        let data = [];

        const unsubscribe = onSnapshot(
            collection(db, 'LeaderboardsAndParameters'),
            (snapshot) => {
                snapshot.forEach((element) => {
                    data.push({ ...element.data(), id: element.id });
                });
                resolve(data);
            },
            (error) => {
                reject(error);
            }
        );
    });
};

function ListenDatabaseAndGetLeaderboard() {
    // fireBaseStartApp();
    const db = getFirestore(app);
    let Table = [];
    let data = [];
    let HighScore;

    const getData = () => {
        if (data[0]) {
            data = data.flatMap((n) => n.Leaderboard);
            data.sort(
                (firstItem, secondItem) => secondItem.Score - firstItem.Score
            );
            if (data.length > 10) {
                let dataCopy = [];
                for (let i = 0; i < 10; i += 1) {
                    dataCopy.push(data[i]);
                }
                Table = dataCopy;
            } else {
                Table = data;
            }
        }
    };

    let DataDB = getMainLeaderboard().then((dataE) => {
        data = dataE;

        getData();
        HighScore = Table[0].Score;

        Table.length > 0
            ? console.log(HighScore)
            : console.log('Waiting for leaderboard');
        return {
            Leaderboard: Table,
            HighScore: HighScore,
        };
    });

    console.log(DataDB);
    return DataDB;
}

//With the data given from the database build an array with the 10 biggest values ordered by score
function BuildLeaderboard({ type, screen }) {
    // console.log('building leaderboard');
    fireBaseStartApp();
    const db = getFirestore(app);
    const [Table, setTable] = useState([]);
    let data = [];
    useEffect(() => {
        const getData = () => {
            if (data[0]) {
                data = data.flatMap((n) => n.Leaderboard);
                data.sort(
                    (firstItem, secondItem) =>
                        secondItem.Score - firstItem.Score
                );
                if (data.length > 10) {
                    let dataCopy = [];
                    for (let i = 0; i < 10; i += 1) {
                        dataCopy.push(data[i]);
                    }
                    setTable(dataCopy);
                } else {
                    setTable(data);
                }
            }
        };

        HighScore = Table[0] && Table[0].Score;

        const unsubscribe = onSnapshot(
            collection(db, 'LeaderboardsAndParameters'),
            (snapshot) => {
                data = [];
                snapshot.forEach((element) => {
                    data.push({ ...element.data(), id: element.id });
                });
                getData();
            },
            (error) => {
                console.log('error: ', error);
            }
        );

        getData();
        return () => {
            unsubscribe();
        };
    }, []);

    // return (
    //   <table>
    //     <tbody>
    //       {Table.length
    //         ? Table.map((e, key) => (
    //             <tr key={key}>
    //               <th>{e.Alias}</th>
    //               <th>{e.Score}</th>
    //             </tr>
    //           ))
    //         : null}
    //     </tbody>
    //   </table>
    // );

    const renderSwitch = (type) => {
        switch (type) {
            case 'leaderboard':
                return (
                    //   <ul className={styles.leaderboard}>
                    <ul
                        className={
                            screen === 'leaderboard'
                                ? styles1.leaderboard
                                : styles2.leaderboard
                        }
                    >
                        {Table &&
                            Table.map((e, i) => {
                                return (
                                    <li key={i + 1}>
                                        <p>{`${i + 1}.`}</p>
                                        {/* <p>{e.user}</p> */}
                                        <p>{e.Alias}</p>
                                        {/* <p>{e.score}</p> */}
                                        <p>{e.Score}</p>
                                    </li>
                                );
                            })}
                    </ul>
                );
            case 'highScore':
                return (
                    <h1 className='highScore'>{Table[0] && Table[0].Score}</h1>
                );
            case 'highInitials':
                return (
                    <>
                        <div>{Table[0] && Table[0].Alias.split('')[0]}</div>
                        <div>{Table[0] && Table[0].Alias.split('')[1]}</div>
                        <div>{Table[0] && Table[0].Alias.split('')[2]}</div>
                    </>
                );
            default:
                return null;
        }
    };

    // return type === 'leaderboard' ? (
    //   <ul className={styles.leaderboard}>
    //     {Table &&
    //       Table.map((e, i) => {
    //         return (
    //           <li key={i + 1}>
    //             <p>{`${i + 1}.`}</p>
    //             {/* <p>{e.user}</p> */}
    //             <p>{e.Alias}</p>
    //             {/* <p>{e.score}</p> */}
    //             <p>{e.Score}</p>
    //           </li>
    //         );
    //       })}
    //   </ul>
    // ) : (
    //   (type = 'highScore' ? (
    //     <h1>{Table[0] && Table[0].Score}</h1>
    //   ) : (
    //     <>
    //       <div>{Table[0] && Table[0].Alias.split('')[0]}</div>
    //       <div>{Table[0] && Table[0].Alias.split('')[1]}</div>
    //       <div>{Table[0] && Table[0].Alias.split('')[2]}</div>
    //     </>
    //   ))
    // );
    return <>{renderSwitch(type)}</>;
}

function HighScoreComp() {
    const [HighScoreInComponent, setHighScoreInComponent] = useState(null);

    useEffect(() => {
        setHighScoreInComponent(HighScore);
    }, [HighScore]);

    return <h1>{HighScoreInComponent}</h1>;
}

// BuildLeaderboard();

//Add data to the Leaderboard Array
async function addDataToLeaderboard(Alias, Score, Email, Communications, Age) {
    const db = getFirestore(app);

    const dbRef = doc(db, 'LeaderboardsAndParameters', device);

    const newData = {
        Alias: Alias,
        Score: Score,
        // Email: Email,
        // Communications: Communications,
        // Age: Age,
    };
    await updateDoc(dbRef, {
        Leaderboard: arrayUnion(newData),
    });
}

//set target device
const setDevice = (newValue) => {
    device = newValue;
};

const setNumberOfDevices = (newValue) => {
    numberOfDevices = newValue;
};

//Functions
export {
    fireBaseStartApp,
    getDatabase,
    addDataToLeaderboard,
    getMainLeaderboard,
    BuildLeaderboard,
    HighScoreComp,
    ListenDatabaseAndGetLeaderboard,
};

//Variables
export {
    DeviceData,
    device,
    setDevice,
    numberOfDevices,
    setNumberOfDevices,
    tableData,
};
