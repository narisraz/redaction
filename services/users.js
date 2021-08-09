export class UserService {

  constructor ($fire) {
    this.$fire = $fire
  }

  async listen(cb, action) {
    await this.$fire.firestore.collection('users').onSnapshot((querySnapshot ) => {
      let users = []
      console.log('listen users')
      querySnapshot.docs
        .map(doc => users.push(doc.data()))
      cb(action, users)
    });
  }

  async add(data) {
    const ref = await this.$fire.firestore.collection('users').add(data)
    data.id = ref.id
    this.update(data)
  }

  async remove(data) {
    await this.$fire.firestore.collection('users').doc(data.id).delete()
  }

  async update(data) {
    await this.$fire.firestore.collection('users').doc(data.id).set(data)
  }
}