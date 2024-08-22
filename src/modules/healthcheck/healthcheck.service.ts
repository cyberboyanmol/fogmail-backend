import { getConfig } from '@/config';
import os, { uptime } from 'os';

export class HealthCheckService {
  constructor() {}
  public static getSystemHealth() {
    return {
      cpuUsage: os.loadavg(),
      totalMemory: `${(os.totalmem() / 1024 / 1024).toFixed(2)} MB`,
      freeMemory: `${(os.freemem() / 1024 / 1024).toFixed(2)} MB`,
    };
  }
  public static getApplicationHealth() {
    return {
      environment: getConfig().NODE_ENV,
      uptime: `${process.uptime().toFixed(2)} Seconds`,
      memoryUsage: {
        heapTotal: `${(process.memoryUsage().heapTotal / 1024 / 1024).toFixed(2)} MB`,
        heapUsed: `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`,
      },
    };
  }
}
