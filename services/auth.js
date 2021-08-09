export class AuthService {

  constructor ($fire) {
    this.$fire = $fire
  }

  async authenticate(login, password, success, failed) {
    const ref = await this.$fire.firestore
      .collection('users')
      .where('login', '==', login)
      .where('password', '==', password)
      .get()
    if (!ref.empty) {
      const user = ref.docs
        .map(doc => doc.data())[0]
      success(user)
    } else {
      failed()
    }
  }
}