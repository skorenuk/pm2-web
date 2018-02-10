// @flow
import { observable, action, IObservableArray, toJS } from 'mobx';

export type Server = {
  monit: { memory: number, cpu: number };
  name: string;
  pid: number;
  pm2_env: {
    status: string;
    pm_cwd: string;
    exec_interpreter: string;
    pm_uptime: string;
    unstable_restarts: string;
    restart_time: number;
  };
  pm_id: number;
}

class ListStore {
  @observable list: IObservableArray<Server>;

  constructor() {
    this.list = observable.array([]);
  }

  @action
  addServer(servers: Server[]) {
    this.list.push(...servers);
  }

  @action
  updateServer(server: Server) {
    const index = this.list.findIndex((srv: Server) => srv.pm_id === server.pm_id);
    this.list[index] = server;
    console.log(this.list.peek());
  }

  getServer(id: number) {
    return toJS(this.list.find((item: Server) => item.pm_id === id));
  }
}

const listStore: ListStore = new ListStore();

export default listStore;
export { ListStore }
