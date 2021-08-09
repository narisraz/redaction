export class StatusService {

  constructor ($fire) {
    this.$fire = $fire
  }

  async listen(cb, action) {
    await this.$fire.firestore.collection('status').onSnapshot((querySnapshot ) => {
      let status = []
      console.log('listen status')
      querySnapshot.docs
        .map(doc => doc.data())
        .map(data => status.push(data))
      cb(action, status)
    });
  }

  async add(data) {
    const ref = await this.$fire.firestore.collection('status').add(data)
    data.id = ref.id
    this.update(data)
  }

  async remove(data) {
    await this.$fire.firestore.collection('status').doc(data.id).delete()
  }

  async update(data) {
    await this.$fire.firestore.collection('status').doc(data.id).set(data)
  }
}