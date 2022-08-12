const admin = require('firebase-admin');
const serviceAccount = require('./admin-key.json');
const { firestore } = require('firebase-admin');
const { Timestamp } = firestore;

const app = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = firestore();

const users = [
  {
    testuid: 1,
    username: 'HomerJ1956',
    email: 'HomerJ1956@gmail.com',
    firstName: 'Homer',
    lastName: 'Simpson',
    gender: 'Male',
    DOB: Timestamp.fromDate(new Date(1956, 4, 12)),
    location: 'Springfield',
    sports: ['Football', 'Cricket'],
    friends: [],
    following: [],
    events: [],
    wishlist: [],
    hostRating: 0,
    password: 'test123',
  },
  {
    testuid: 2,
    username: 'BlueSteel',
    email: 'BlueSteel@gmail.com',
    firstName: 'Marjorie',
    lastName: 'Simpson',
    gender: 'Female',
    DOB: Timestamp.fromDate(new Date(1959, 0, 1)),
    location: 'Springfield',
    sports: ['Rugby', 'Cycling'],
    friends: [],
    following: [],
    events: [],
    wishlist: [],
    hostRating: null,
    password: 'test123',
  },
  {
    testuid: 3,
    username: 'Bartman',
    email: 'Bartman@gmail.com',
    firstName: 'Bartholomew',
    lastName: 'Simpson',
    gender: 'Male',
    DOB: Timestamp.fromDate(new Date(1985, 3, 1)),
    location: 'Springfield',
    sports: ['Snowboarding', 'Cycling'],
    friends: [],
    following: [],
    events: [],
    wishlist: [],
    hostRating: null,
    password: 'test123',
  },
  {
    testuid: 4,
    username: 'Leez',
    email: 'Leez@gmail.com',
    firstName: 'Lisa',
    lastName: 'Simpson',
    gender: 'Female',
    DOB: Timestamp.fromDate(new Date(1987, 4, 9)),
    location: 'Springfield',
    sports: ['Yoga'],
    friends: [],
    following: [],
    events: [],
    wishlist: [],
    hostRating: null,
    password: 'test123',
  },
  {
    testuid: 5,
    username: 'Lenny',
    email: 'Lenny@gmail.com',
    firstName: 'Margaret',
    lastName: 'Simpson',
    gender: 'Female',
    DOB: Timestamp.fromDate(new Date(1989, 0, 14)),
    location: 'Springfield',
    sports: ['Running', 'Cycling'],
    friends: [],
    following: [],
    events: [],
    wishlist: [],
    hostRating: null,
    password: 'test123',
  },
  {
    testuid: 6,
    username: 'theDoc',
    email: 'theDoc@gmail.com',
    firstName: 'Apu',
    lastName: 'Nahasapeemapetilon',
    gender: 'Male',
    DOB: Timestamp.fromDate(new Date(1957, 10, 10)),
    location: 'Springfield',
    sports: ['Rugby', 'Cycling', 'Yoga'],
    friends: [],
    following: [],
    events: [],
    wishlist: [],
    hostRating: null,
    password: 'test123',
  },
  {
    testuid: 7,
    username: 'StupidSexyFlanders',
    email: 'StupidSexyFlanders@gmail.com',
    firstName: 'Nedward',
    lastName: 'Flanders',
    gender: 'Male',
    DOB: Timestamp.fromDate(new Date(1935, 4, 11)),
    location: 'Springfield',
    sports: ['Cycling'],
    friends: [],
    following: [],
    events: [],
    wishlist: [],
    hostRating: null,
    password: 'test123',
  },
  {
    testuid: 8,
    username: 'GrampA',
    email: 'GrampA@gmail.com',
    firstName: 'Abraham',
    lastName: 'Simpson',
    gender: 'Male',
    DOB: Timestamp.fromDate(new Date(1902, 11, 25)),
    location: 'Springfield',
    sports: ['Rugby', 'Cycling'],
    friends: [],
    following: [],
    events: [],
    wishlist: [],
    hostRating: null,
    password: 'test123',
  },
  {
    testuid: 9,
    username: 'Monty86',
    email: 'Monty86@gmail.com',
    firstName: 'Charles',
    lastName: 'Burns',
    gender: 'Male',
    DOB: Timestamp.fromDate(new Date(1886, 8, 15)),
    location: 'Springfield',
    sports: ['Rugby'],
    friends: [],
    following: [],
    events: [],
    wishlist: [],
    hostRating: null,
    password: 'test123',
  },
  {
    testuid: 10,
    username: 'ChucklesWJS',
    email: 'ChucklesWJS@gmail.com',
    firstName: 'Waylon',
    lastName: 'Smithers',
    gender: 'Male',
    DOB: Timestamp.fromDate(new Date(1954, 11, 25)),
    location: 'Springfield',
    sports: [
      'Rugby',
      'Cycling',
      'Yoga',
      'Snowboarding',
      'Running',
      'Football',
      'Cricket',
      'Tennis',
    ],
    friends: [],
    following: [],
    events: [],
    wishlist: [],
    hostRating: null,
    password: 'test123',
  },
];

const seed = () => {
  // Get all auth users
  return admin
    .auth()
    .listUsers(1000)
    .then((listUsersResult) => {
      return listUsersResult.users;
    })
    .then((userRecords) => {
      // delete auth users
      const promises = [];
      userRecords.forEach((userRecord) => {
        promises.push(admin.auth().deleteUser(userRecord.uid));
      });
      return Promise.all(promises);
    })
    .then(() => {
      // delete firestore users
      return admin
        .firestore()
        .collection('users')
        .get()
        .then((userDocs) => {
          const promises = [];
          userDocs.forEach((userDoc) => {
            promises.push(db.collection('users').doc(userDoc.id).delete());
          });
          return promises;
        });
    })
    .then(() => {
      // create Auth users
      users.forEach((user) => {
        admin
          .auth()
          .createUser({
            email: user.email,
            password: 'test123',
          })
          .then((userRecord) => {
            // create Firestore user
            admin
              .firestore()
              .collection('users')
              .doc(userRecord.uid)
              .set({
                testuid: user.testuid,
                uid: userRecord.uid,
                username: user.username,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                gender: user.gender,
                DOB: user.DOB,
                location: user.location,
                sports: user.sports,
                friends: user.friends,
                following: user.following,
                events: user.events,
                wishlist: user.wishlist,
                hostRating: user.hostRating,
              })
              .then(() => {
                console.log(
                  `Successfully added ${user.username} to Auth and firestore`
                );
              });
          });
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

seed();

