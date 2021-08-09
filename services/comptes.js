export class CompteService {

  constructor ($fire) {
    this.$fire = $fire
  }

  async listen(cb, action) {
    await this.$fire.firestore.collection('comptes').onSnapshot((querySnapshot ) => {
      let comptes = []
      console.log('listen comptes')
      querySnapshot.docs
        .map(doc => comptes.push(doc.data()))
      cb(action, comptes)
    });
  }

  async add(data) {
    const ref = await this.$fire.firestore.collection('comptes').add(data)
    data.id = ref.id
    this.update(data)
  }

  async remove(data) {
    await this.$fire.firestore.collection('comptes').doc(data.id).delete()
  }

  async update(data) {
    await this.$fire.firestore.collection('comptes').doc(data.id).set(data)
  }
}