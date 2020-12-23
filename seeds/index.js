const mongoose = require("mongoose");
const Campground = require("../models/campGround");
const cities = require("./cities");
const seedHelpers = require("./seedHelpers");
const { descriptors, places } = require("./seedHelpers");

mongoose.connect("mongodb://localhost:27017/yelp-camp", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("mongoose db is connected!");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 333; i++) {
    const random1000 = Math.floor(Math.random() * 1000) + 1;
    const price = Math.floor(Math.random() * 30) + 10;
    const camp = new Campground({
      title: `${sample(descriptors)} ${sample(places)}`,
      // price:
      // description:
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      geometry : { 
        type : "Point", 
        coordinates : [ cities[random1000].longitude, cities[random1000].latitude ] 
        },
      images: [
        {
          url:
            "https://res.cloudinary.com/diref9giq/image/upload/v1608210657/YelpCamp/qddlgbeiuaoaj74dtkqx.jpg",
          filename: "YelpCamp/qddlgbeiuaoaj74dtkqx",
        },
        {
          url:
            "https://res.cloudinary.com/diref9giq/image/upload/v1608210665/YelpCamp/fn5zij9oayht1pi7xyf2.jpg",
          filename: "YelpCamp/fn5zij9oayht1pi7xyf2",
        },
      ],
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui consequuntur minima sed quae excepturi consectetur voluptate earum ratione reprehenderit hic possimus assumenda eius, rerum ipsa optio. Voluptatum sunt totam est.",
      price,
      author: "5fd39e2bffccb60566b5ad3e",
    });
    await camp.save();
  }
};

seedDB().then(() => mongoose.connection.close());
