export class TaskService {

  constructor ($fire) {
    this.$fire = $fire
  }

  async listen(cb, action) {
    await this.$fire.firestore.collection('tasks').onSnapshot((querySnapshot ) => {
      let tasks = []
      console.log('listen tasks')
      querySnapshot.docs
        .map(doc => doc.data())
        .filter(data => data.status != 0)
        .map(data => tasks.push(data))
      cb(action, tasks)
    });
  }

  async add(data) {
    const ref = await this.$fire.firestore.collection('tasks').add(data)
    data.id = ref.id
    this.update(data)
  }

  async remove(data) {
    await this.$fire.firestore.collection('tasks').doc(data.id).delete()
  }

  async update(data) {
    await this.$fire.firestore.collection('tasks').doc(data.id).set(data)
  }

  async updateStatus(id, status) {
    const ref = await this.$fire.firestore.collection('tasks').doc(id).get()
    const task = ref.data()
    task.status = status.code
    this.update(task)
  }
}