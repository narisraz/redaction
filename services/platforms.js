export class PlatformService {

  constructor ($fire) {
    this.$fire = $fire
  }

  async listen(cb, action) {
    await this.$fire.firestore.collection('platforms').onSnapshot((querySnapshot ) => {
      let platforms = []
      console.log('listen platforms')
      querySnapshot.docs
        .map(doc => platforms.push(doc.data()))
      cb(action, platforms)
    });
  }

  async add(data) {
    const ref = await this.$fire.firestore.collection('platforms').add(data)
    data.id = ref.id
    this.update(data)
  }

  async remove(data) {
    await this.$fire.firestore.collection('platforms').doc(data.id).delete()
  }

  async update(data) {
    await this.$fire.firestore.collection('platforms').doc(data.id).set(data)
  }
}