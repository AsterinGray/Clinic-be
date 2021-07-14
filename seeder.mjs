import seeder from 'mongoose-seed'

const db = 'mongodb://localhost:27017/compfest'

const data = [
  {
    model: 'User',
    documents: [
      {
        first_name: 'Admin',
        last_name: 'Clinic',
        age: '18',
        username: 'admin',
        email: 'admin@mail.com',
        password: 'admin',
        role: 'Administrator',
      },
    ],
  },
]

seeder.connect(db, () => {
  seeder.loadModels(['models/User.ts'])
  seeder.populateModels(data, (err, done) => {
    if (err) return console.log('seed err', err)

    if (done) return console.log('seed done', done)

    seeder.disconnect()
  })
})
