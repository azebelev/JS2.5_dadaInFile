const fs = require('fs')
const path = require('path')
const { v4: uuidv4 } = require("uuid")

class User {
  constructor({ login, pass, items }) {
    this.login = login
    this.pass = pass
    this.items = items || []
  }

  jsonLikeTransform() {
    return {
      login: this.login,
      pass: this.pass,
      items: this.items
    }
  }

  static async save(users) {
    await fs.writeFile(path.join(__dirname, '..', 'data.json'), JSON.stringify(users),
      error => {
        if (error) console.log("error", error)
      })
  }

  static getUsers() {
    return new Promise((resolve, rejects) => {
      fs.readFile(path.join(__dirname, '..', 'data.json'), 'utf-8',
        (error, content) => {
          if (error) rejects(error)
          else resolve(JSON.parse(content))
        })
    })
  }

  static async findUser({ login, pass }) {
    const users = await User.getUsers()
    const user = users.find(user => (user.login === login && user.pass === pass))
    return user
  }

  async deleteTaskById(id) {
    let users = await User.getUsers()
    users = users.map(user => {
      if (user.login === this.login && user.pass === this.pass) {
        user.items = user.items.filter(task => task.id !== id)
      }
      return user
    })
    await User.save(users)
  }

  // user = {login,pass}
  static async editTask({ login, pass }, taskChange) {
    let users = await User.getUsers()
    users = users.map(user => {
      if (user.login === login && user.pass === pass) {
        user.items = user.items.map(task => {
          if (task.id === taskChange.id) {
            task = taskChange
          }
          return task
        })
      }
      return user
    })
    User.save(users)
  }

  static async saveNewUser(obj) {
    const users = await User.getUsers()
    const user = new User(obj)
    users.push(user.jsonLikeTransform())
    return new Promise((resolve, rejects) => {
      fs.writeFile(path.join(__dirname, '..', 'data.json'), JSON.stringify(users),
        error => {
          if (error) rejects(error)
          else resolve()
        })
    })
  }

  async addTask(text) {
    const id = uuidv4()
    const users = await User.getUsers()
    const userIdx = users.findIndex(user => user.login === this.login && user.pass === this.pass)
    users[userIdx].items.push({ id, text, checked: false })

    await User.save(users)


    return id

  }
}



module.exports = User