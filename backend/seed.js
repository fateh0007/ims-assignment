
/**
 * npm run seed
 * Creates one sample course.
 */
require('dotenv').config();
const mongoose = require('mongoose');
const Course = require('./models/Course');

mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/lms-demo', {useNewUrlParser:true,useUnifiedTopology:true})
  .then(()=> seed())
  .catch(e=> console.error(e));

async function seed(){
  await Course.deleteMany({});
  const course = new Course({
    title: 'Introduction to Machine Learning',
    slug: 'introduction-to-ml',
    description: 'Short intro course used for UI demo.',
    price: 500,
    sections: [
      { title: 'Introduction To Machine Learning', lessons: [{title:'What is Machine Learning?', videoUrl:''}] },
      { title: 'Concepts Of Machine Learning', lessons: [
        {title:'Rent Cost of Flat', videoUrl:''},
        {title:'Linear Regression', videoUrl:''},
        {title:'Polymer Regression', videoUrl:''}
      ]},
      { title: 'Application Of Machine Learning', lessons: [
        {title:'Applications overview', videoUrl:''},
        {title:'Real-life case study', videoUrl:''}
      ]},
      { title: 'Neural Network And Deep Learning', lessons: [
        {title:'Basics of Neural Networks', videoUrl:''},
        {title:'Activation functions', videoUrl:''}
      ]}
    ]
  });
  await course.save();
  console.log('Seeded course:', course.slug);
  process.exit(0);
}
