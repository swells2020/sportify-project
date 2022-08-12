const admin = require("firebase-admin");
const serviceAccount = require("./admin-key.json");
const { firestore } = require("firebase-admin");
const { Timestamp } = firestore;

const app = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = firestore();

const users = [
  {
    testuid: 1,
    username: "HomerJ1956",
    email: "HomerJ1956@gmail.com",
    firstName: "Homer",
    lastName: "Simpson",
    gender: "Male",
    DOB: Timestamp.fromDate(new Date(1956, 4, 12)),
    location: "Springfield",
    sports: ["Football", "Cricket"],
    friends: [],
    following: [],
    events: [],
    wishlist: [],
    hostRating: 0,
    password: "test123",
  },
  {
    testuid: 2,
    username: "BlueSteel",
    email: "BlueSteel@gmail.com",
    firstName: "Marjorie",
    lastName: "Simpson",
    gender: "Female",
    DOB: Timestamp.fromDate(new Date(1959, 0, 1)),
    location: "Springfield",
    sports: ["Rugby", "Cycling"],
    friends: [],
    following: [],
    events: [],
    wishlist: [],
    hostRating: null,
    password: "test123",
  },
  {
    testuid: 3,
    username: "Bartman",
    email: "Bartman@gmail.com",
    firstName: "Bartholomew",
    lastName: "Simpson",
    gender: "Male",
    DOB: Timestamp.fromDate(new Date(1985, 3, 1)),
    location: "Springfield",
    sports: ["Snowboarding", "Cycling"],
    friends: [],
    following: [],
    events: [],
    wishlist: [],
    hostRating: null,
    password: "test123",
  },
  {
    testuid: 4,
    username: "Leez",
    email: "Leez@gmail.com",
    firstName: "Lisa",
    lastName: "Simpson",
    gender: "Female",
    DOB: Timestamp.fromDate(new Date(1987, 4, 9)),
    location: "Springfield",
    sports: ["Yoga"],
    friends: [],
    following: [],
    events: [],
    wishlist: [],
    hostRating: null,
    password: "test123",
  },
  {
    testuid: 5,
    username: "Lenny",
    email: "Lenny@gmail.com",
    firstName: "Margaret",
    lastName: "Simpson",
    gender: "Female",
    DOB: Timestamp.fromDate(new Date(1989, 0, 14)),
    location: "Springfield",
    sports: ["Running", "Cycling"],
    friends: [],
    following: [],
    events: [],
    wishlist: [],
    hostRating: null,
    password: "test123",
  },
  {
    testuid: 6,
    username: "theDoc",
    email: "theDoc@gmail.com",
    firstName: "Apu",
    lastName: "Nahasapeemapetilon",
    gender: "Male",
    DOB: Timestamp.fromDate(new Date(1957, 10, 10)),
    location: "Springfield",
    sports: ["Rugby", "Cycling", "Yoga"],
    friends: [],
    following: [],
    events: [],
    wishlist: [],
    hostRating: null,
    password: "test123",
  },
  {
    testuid: 7,
    username: "StupidSexyFlanders",
    email: "StupidSexyFlanders@gmail.com",
    firstName: "Nedward",
    lastName: "Flanders",
    gender: "Male",
    DOB: Timestamp.fromDate(new Date(1935, 4, 11)),
    location: "Springfield",
    sports: ["Cycling"],
    friends: [],
    following: [],
    events: [],
    wishlist: [],
    hostRating: null,
    password: "test123",
  },
  {
    testuid: 8,
    username: "GrampA",
    email: "GrampA@gmail.com",
    firstName: "Abraham",
    lastName: "Simpson",
    gender: "Male",
    DOB: Timestamp.fromDate(new Date(1902, 11, 25)),
    location: "Springfield",
    sports: ["Rugby", "Cycling"],
    friends: [],
    following: [],
    events: [],
    wishlist: [],
    hostRating: null,
    password: "test123",
  },
  {
    testuid: 9,
    username: "Monty86",
    email: "Monty86@gmail.com",
    firstName: "Charles",
    lastName: "Burns",
    gender: "Male",
    DOB: Timestamp.fromDate(new Date(1886, 8, 15)),
    location: "Springfield",
    sports: ["Rugby"],
    friends: [],
    following: [],
    events: [],
    wishlist: [],
    hostRating: null,
    password: "test123",
  },
  {
    testuid: 10,
    username: "ChucklesWJS",
    email: "ChucklesWJS@gmail.com",
    firstName: "Waylon",
    lastName: "Smithers",
    gender: "Male",
    DOB: Timestamp.fromDate(new Date(1954, 11, 25)),
    location: "Springfield",
    sports: [
      "Rugby",
      "Cycling",
      "Yoga",
      "Snowboarding",
      "Running",
      "Football",
      "Cricket",
      "Tennis",
    ],
    friends: [],
    following: [],
    events: [],
    wishlist: [],
    hostRating: null,
    password: "test123",
  },
];

const events = [
  {
    title: "Yoga with Apu",
    date: Timestamp.fromDate(new Date(2022, 7, 2, 16, 30)),
    location: "Manchester Arndale Centre",
    type: "Yoga",
    capacity: 20,
    description:
      "Dr. Nahasapeemapetilon will be leading a hot Yoga class each Tuesday in August at 4:30pm in the Arndale Centre.",
    level: "Beginner",
    participants: ["Leez"],
    hostUsername: "theDoc",
    tags: ["#yoga", "#wellness", "#selfcare"],
  },
  {
    title: "Yoga with Apu",
    date: Timestamp.fromDate(new Date(2022, 7, 9, 16, 30)),
    location: "Manchester Arndale Centre",
    type: "Yoga",
    capacity: 20,
    description:
      "Dr. Nahasapeemapetilon will be leading a hot Yoga class each Tuesday in August at 4:30pm in the Arndale Centre.",
    level: "Beginner",
    participants: ["Leez", "Monty86"],
    hostUsername: "theDoc",
    tags: ["#yoga", "#wellness", "#selfcare"],
  },
  {
    title: "Yoga with Apu",
    date: Timestamp.fromDate(new Date(2022, 7, 16, 16, 30)),
    location: "Manchester Arndale Centre",
    type: "Yoga",
    capacity: 20,
    description:
      "Dr. Nahasapeemapetilon will be leading a hot Yoga class each Tuesday in August at 4:30pm in the Arndale Centre.",
    level: "Beginner",
    participants: ["Leez", "StupidSexyFlanders"],
    hostUsername: "theDoc",
    tags: ["#yoga", "#wellness", "#selfcare"],
  },
  {
    title: "Yoga with Apu",
    date: Timestamp.fromDate(new Date(2022, 7, 23, 16, 30)),
    location: "Manchester Arndale Centre",
    type: "Yoga",
    capacity: 20,
    description:
      "Dr. Nahasapeemapetilon will be leading a hot Yoga class each Tuesday in August at 4:30pm in the Arndale Centre.",
    level: "Beginner",
    participants: ["Leez", "StupidSexyFlanders", "HomerJ1956"],
    hostUsername: "theDoc",
    tags: ["#yoga", "#wellness", "#selfcare"],
  },
  {
    title: "Derby Velodrome Splits",
    date: Timestamp.fromDate(new Date(2022, 8, 15, 7, 00)),
    location: "Derby Velodrome",
    type: "Cycling",
    capacity: 5,
    description: "Timed splits around Derby velodrome.",
    level: "Beginner",
    participants: ["Leez", "Monty86", "theDoc", "StupidSexyFlanders"],
    hostUsername: "Bartman",
    tags: ["#timetrials", "#twowheeledfun", "#britishcycling"],
  },
  {
    title: "Bank Holiday Sunday T20 Blast",
    date: Timestamp.fromDate(new Date(2022, 7, 28, 12, 00)),
    location: "Headingly Cricket Ground",
    type: "Cricket",
    capacity: 22,
    description:
      "Meet at 12:00 at the enterance to the ground for some light-hearted cricket fun.",
    level: "Beginner",
    participants: [
      "Leez",
      "Monty86",
      "ChucklesWJS",
      "GrampA",
      "Lenny",
      "theDoc",
    ],
    hostUsername: "HomerJ1956",
    tags: ["#owzat"],
  },
  {
    title: "Pro Tennis Ladder - Newcastle Tennis Club",
    date: Timestamp.fromDate(new Date(2022, 7, 17, 19, 00)),
    location: "Newcastle Tennis Club",
    type: "Tennis",
    capacity: 8,
    description:
      "Come and join a professional standard mini tennis tournament at Newcastle Tennis Club on Wednesday August 17th. Courts will be availiable from 7pm.",
    level: "Professional",
    participants: [],
    hostUsername: "ChucklesWJS",
    tags: ["#wimbledonherewecome"],
  },
  {
    title: "Monsal Trail Parkrun",
    date: Timestamp.fromDate(new Date(2022, 7, 6, 09, 00)),
    location: "Hassop Station",
    type: "Yoga",
    capacity: Number.POSITIVE_INFINITY,
    description:
      "Come join us each Saturday morning at 9am for the Monsal Trail parkrun. If you would like to recieve a time, please remember to bring your barcode. If you would like a barcode, please register for one at www.parkrun.co.uk. Parking is limited so please use public transport where possible!",
    level: "Beginner",
    participants: ["Leez", "Monty86"],
    hostUsername: "ChucklesWJS",
    tags: ["#runnersworld", "#backtonature"],
  },
  {
    title: "Monsal Trail Parkrun",
    date: Timestamp.fromDate(new Date(2022, 7, 13, 09, 00)),
    location: "Hassop Station",
    type: "Yoga",
    capacity: Number.POSITIVE_INFINITY,
    description:
      "Come join us each Saturday morning at 9am for the Monsal Trail parkrun. If you would like to recieve a time, please remember to bring your barcode. If you would like a barcode, please register for one at www.parkrun.co.uk. Parking is limited so please use public transport where possible!",
    level: "Beginner",
    participants: ["Leez", "Monty86", "GrampA", "Lenny"],
    hostUsername: "ChucklesWJS",
    tags: ["#runnersworld", "#backtonature"],
  },
  {
    title: "Monsal Trail Parkrun",
    date: Timestamp.fromDate(new Date(2022, 7, 20, 09, 00)),
    location: "Hassop Station",
    type: "Yoga",
    capacity: Number.POSITIVE_INFINITY,
    description:
      "Come join us each Saturday morning at 9am for the Monsal Trail parkrun. If you would like to recieve a time, please remember to bring your barcode. If you would like a barcode, please register for one at www.parkrun.co.uk. Parking is limited so please use public transport where possible!",
    level: "Beginner",
    participants: ["Leez", "Monty86", "GrampA", "Lenny", "StupidSexyFlanders"],
    hostUsername: "ChucklesWJS",
    tags: ["#runnersworld", "#backtonature"],
  },
  {
    title: "Monsal Trail Parkrun",
    date: Timestamp.fromDate(new Date(2022, 7, 27, 09, 00)),
    location: "Hassop Station",
    type: "Yoga",
    capacity: Number.POSITIVE_INFINITY,
    description:
      "Come join us each Saturday morning at 9am for the Monsal Trail parkrun. If you would like to recieve a time, please remember to bring your barcode. If you would like a barcode, please register for one at www.parkrun.co.uk. Parking is limited so please use public transport where possible!",
    level: "Beginner",
    participants: [
      "Leez",
      "Monty86",
      "GrampA",
      "Lenny",
      "StupidSexyFlanders",
      "HomerJ1956",
    ],
    hostUsername: "ChucklesWJS",
    tags: ["#runnersworld", "#backtonature"],
  },
  {
    title: "Bank Holiday Snowboarding at Tamworth",
    date: Timestamp.fromDate(new Date(2022, 7, 29)),
    location: "Tamworth Snowdome",
    type: "Snowboarding",
    capacity: 4,
    description:
      "Looking for 4 others to join me for a snowboarding session sometime on the bankholiday Monday (August 29th). BYOB.",
    level: "Beginner",
    participants: ["Leez", "Monty86"],
    hostUsername: "Bartman",
    tags: ["#cooldownthissummer"],
  },
  {
    title: "LGBT+ Charity 5-a-Side",
    date: Timestamp.fromDate(new Date(2022, 7, 23, 16, 30)),
    location: "Buxton Pavillion Gardens",
    type: "Football",
    capacity: 10,
    description:
      "Looking to host a charity 5v5 Football game in Buxton's pavillion gardens to raise money for various local LGBT+ causes.",
    level: "Beginner",
    participants: ["Lenny", "ChucklesWJS"],
    hostUsername: "theDoc",
    tags: ["#inclusivefootball", "LGBT+"],
  },
  {
    title: "Women's Outdoor Goat Yoga",
    date: Timestamp.fromDate(new Date(2022, 7, 30, 20, 00)),
    location: "Bluebell Farm, Derby",
    type: "Yoga",
    capacity: 5,
    description:
      "Please come and join us for an afternoon of yoga amongst the animals at Bluebell dairy, Derby",
    level: "Beginner",
    participants: ["Leez", "Lenny"],
    hostUsername: "BlueSteel",
    tags: ["#yoga", "#wellness", "#selfcare"],
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
        .collection("users")
        .get()
        .then((userDocs) => {
          const promises = [];
          userDocs.forEach((userDoc) => {
            promises.push(db.collection("users").doc(userDoc.id).delete());
          });
          return promises;
        });
    })
    .then(() => {
      // create Auth users
      users.forEach((user) => {
        return admin
          .auth()
          .createUser({
            email: user.email,
            password: "test123",
          })
          .then((userRecord) => {
            // create Firestore user
            admin
              .firestore()
              .collection("users")
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
    .then(() => {
      // delete firestore events
      return admin
        .firestore()
        .collection("events")
        .get()
        .then((eventDocs) => {
          const promises = [];
          eventDocs.forEach((eventDoc) => {
            promises.push(db.collection("events").doc(eventDoc.id).delete());
          });
          return promises;
        });
    })
    .then(() => {
      events.forEach((event) => {
        admin
          .firestore()
          .collection("events")
          .add({
            capacity: event.capacity,
            date: event.date,
            description: event.description,
            location: event.location,
            level: event.level,
            participants: event.participants,
            title: event.title,
            type: event.type,
            hostUsername: event.hostUsername,
            tags: event.tags,
          })
          .then(() => {
            console.log(`Successfully added ${event.title} to firestore`);
          });
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

seed();
