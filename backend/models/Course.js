
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LessonSchema = new Schema({
  title: String,
  videoUrl: String,
  order: Number
});

const SectionSchema = new Schema({
  title: String,
  lessons: [LessonSchema]
});

const CourseSchema = new Schema({
  title: String,
  slug: { type: String, unique: true },
  description: String,
  coverImage: String,
  price: Number,
  sections: [SectionSchema],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Course', CourseSchema);
