import isEqual from 'lodash.isequal';
import { toJS } from 'mobx/lib/mobx';
import io from 'socket.io-client';
import routes from './routes';
import listStore from '../store/ListStore';

const socket = io(routes.root);


export function subscribeToList() {
  socket.on('pm2:admin/lists', (data) => {
    const list = data.list.map(item => {
      const newItem = { ...item }
      delete newItem.monit
      newItem.pm2_env = {
        status: item.status,
        pm_cwd: item.pm_cwd,
        pm_uptime: item.exec_interpreter,
        unstable_restarts: item.unstable_restarts,
        restart_time: item.restart_time,
      };
      return newItem;
    })
    const oldList = toJS(listStore.list).map(item => {
      const newItem = { ...item }
      delete newItem.monit
      newItem.pm2_env = {
        status: item.status,
        pm_cwd: item.pm_cwd,
        pm_uptime: item.exec_interpreter,
        unstable_restarts: item.unstable_restarts,
        restart_time: item.restart_time,
      };
      return newItem;
    })
    const isArrEqual = isEqual(list, oldList);
    if (!isArrEqual) {
      console.log('Lists:update')
      listStore.setServers(data.list);
    }
    listStore.setUptime(data.list);
  })
  socket.emit('subscribeToPM2')
}

export function unsubscribeFromList() {
  socket.emit('unsubscribeFromPM2');
}
