import { CompteService } from '~/services/comptes'
import { UserService } from '~/services/users'
import { PlatformService } from '~/services/platforms'
import { TaskService } from '~/services/tasks'
import { StatusService } from '~/services/status'
import { AuthService } from '~/services/auth'

export default ({ $fire }, inject) => {
  const comptes = new CompteService($fire)
  const users = new UserService($fire)
  const platforms = new PlatformService($fire)
  const tasks = new TaskService($fire)
  const status = new StatusService($fire)
  const auth = new AuthService($fire)
  
  inject('comptes', comptes)
  inject('users', users)
  inject('platforms', platforms)
  inject('tasks', tasks)
  inject('status', status)
  inject('auth', auth)
}