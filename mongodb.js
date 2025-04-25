// Select or create the database
use libraryDB;

// -------------------------------
// Insert Authors
// -------------------------------
db.authors.insertMany([
  {
    _id: ObjectId("000000000000000000000001"),
    name: "mo",
    birth_year: 2004,
    nationality: "Algerian"
  },
  {
    _id: ObjectId("000000000000000000000002"),
    name: "Adel",
    birth_year: 2004,
    nationality: "America"
  }
]);

// -------------------------------
// Insert Books
// -------------------------------
db.books.insertMany([
  {
    title: "MongoDB 101",
    author_id: ObjectId("000000000000000000000001"),
    published_year: 2022,
    genres: ["Database", "Technology"],
    available: true
  },
  {
    title: "React 101",
    author_id: ObjectId("000000000000000000000002"),
    published_year: 2020,
    genres: ["Programming", "Web"],
    available: false
  }
]);

// -------------------------------
// Insert Borrower
// -------------------------------
const bookId = db.books.findOne({ title: "MongoDB 101" })._id;

db.borrowers.insertOne({
  name: "Walid",
  membership_date: ISODate("2023-01-15T00:00:00Z"),
  borrowed_books: [bookId]
});

// -------------------------------
// Queries
// -------------------------------
print("\nBooks published after 2020:");
printjson(db.books.find({ published_year: { $gt: 2020 } }).toArray());

print("\nAvailable books:");
printjson(db.books.find({ available: true }).toArray());

print("\nBooks with genre 'Web':");
printjson(db.books.find({ genres: "Web" }).toArray());

// -------------------------------
// Update Operations
// -------------------------------
db.books.updateOne(
  { title: "MongoDB 101" },
  { $set: { available: false } }
);

db.books.updateOne(
  { title: "React 101" },
  { $push: { genres: "Frontend" } }
);

// -------------------------------
// Delete Operation
// -------------------------------
db.borrowers.deleteOne({ name: "Walid" });

// -------------------------------
// Index Creation
// -------------------------------
db.books.createIndex({ title: 1 });

// -------------------------------
// Aggregation: Count by Genre
// -------------------------------
print("\nBooks per genre:");
printjson(db.books.aggregate([
  { $unwind: "$genres" },
  { $group: { _id: "$genres", count: { $sum: 1 } } }
]).toArray());

// -------------------------------
// Aggregation: Lookup Authors
// -------------------------------
print("\nBooks with author info:");
printjson(db.books.aggregate([
  {
    $lookup: {
      from: "authors",
      localField: "author_id",
      foreignField: "_id",
      as: "author_info"
    }
  }
]).toArray());
