const mongoose = require('mongoose')
const faker = require('faker')
const _ = require('lodash')
require('./boot')

// Pull attendee model off mongoose.
const Attendee = mongoose.model('attendee')

/**
 * Attendee Factory class.
 */
class AttendeeFake {
  constructor() {
    const [firstName, lastName] = [
      faker.name.firstName(),
      faker.name.lastName()
    ]
    this.firstName = firstName
    this.lastName = lastName
    this.name = firstName + ' ' + lastName
    this.email = faker.internet.email()
    this.phone = faker.phone.phoneNumber()
    this.department = _.sample(AttendeeFake.Departments)
    this.faculty = _.sample(AttendeeFake.Faculties)
    this.extra = {
      stack: _.sample(AttendeeFake.Stacks)
    }
  }

  get() {
    return this
  }

  static make() {
    const _data = new AttendeeFake()
    return _data.get()
  }
}

AttendeeFake.Departments = [
  'Computer Science',
  'Electrical Engineering',
  'Mass Comm',
  'Aeronautical Engineering',
  'Mechanical Engineering'
]

AttendeeFake.Faculties = ['ICT', 'Engineering', 'Pure and Applied Sciences']

AttendeeFake.Stacks = ['UI/UX', 'Web Development and Cloud Computing']

// Connect to database and run seeder.
mongoose
  .connect('mongodb://127.0.0.1:27017/marki', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(async () => {
    const done = 0,
      elms = []
    for (let i = 1; i <= 100; i++) {
      elms.push(new Attendee(AttendeeFake.make()).save())
    }
    return Promise.all(elms)
  })
  .then(() => {
    mongoose.disconnect()
    console.log('Successfully seeded database')
  })
  .catch(error => console.error('Database seeding failed: ' + error))
