import { cpus } from 'os';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const cluster = require('cluster');

export class ClusterManager {
  static clusterize(workerFunction: () => void) {
    const specifiedWorkers = this.getSpecifiedWorkerCount();

    // Если -workers не указан, запускаем приложение без кластеризации
    if (specifiedWorkers === undefined && !this.isClusterizationRequested()) {
      workerFunction();
      return;
    }

    const workersToLaunch = specifiedWorkers || cpus().length;

    if (cluster.isMaster) {
      // Создаем дочерний процесс для каждого указанного ядра
      for (let i = 0; i < workersToLaunch; i++) {
        cluster.fork();
      }

      cluster.on('exit', (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} died. Restarting...`);
        cluster.fork();
      });
    } else {
      workerFunction();
    }
  }

  private static isClusterizationRequested(): boolean {
    return process.argv.includes('-workers');
  }

  private static getSpecifiedWorkerCount(): number | undefined {
    const workersArgIndex = process.argv.indexOf('-workers');
    if (workersArgIndex !== -1 && process.argv[workersArgIndex + 1]) {
      const count = parseInt(process.argv[workersArgIndex + 1], 10);
      if (!isNaN(count)) {
        return count;
      }
    }
    return undefined;
  }
}
