// @flow
import { observable, action, IObservableArray, toJS, ObservableMap } from 'mobx';
import moment from 'moment';

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
    axm_monitor: {
      'Active handles': { value: number; };
      'Active requests': { value: number; };
      'Loop delay': { value: string; };
    };
    exec_interpreter: string;
    exec_mode: string;
    instances: number;
    node_args: string[];
    node_version: string;
    pm_err_log_path: string;
    pm_out_log_path: string;
    pm_uptime: number;
    pmx: boolean;
    restart_time: number;
    unstable_restarts: number;
    watch: boolean | string[];
    NODE_ENV: string;
  };
  pm_id: number;
}

class ListStore {
  @observable list: IObservableArray<Server>;
  @observable upTime: ObservableMap;

  constructor() {
    this.list = observable.array([]);
    this.upTime = new ObservableMap();
  }

  @action
  addServer(servers: Server[]) {
    this.list.push(...servers);
  }

  @action
  updateServer(server: Server) {
    const index = this.list.findIndex((srv: Server) => srv.pm_id === server.pm_id);
    this.list[index] = server;
  }

  @action
  setServers(servers: Server[]) {
    this.list.replace(servers);
  }

  @action
  setUptime(servers: Server[]) {
    servers.forEach((server: Server) => {
      const start = moment(server.pm2_env.pm_uptime);
      this.upTime.set(server.pm_id, start.toNow(true));
    })
  }

  getServer(id: number) {
    return toJS(this.list.find((item: Server) => item.pm_id === id));
  }
}

const listStore: ListStore = new ListStore();

export default listStore;
export { ListStore }
