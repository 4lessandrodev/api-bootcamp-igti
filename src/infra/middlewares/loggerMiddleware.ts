import winston from 'winston';

const { combine, timestamp, label, printf } = winston.format;
const customFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

export const logger = winston.createLogger({
  level: 'silly',
  format: combine(
    label({ label: 'information-logs' }),
    timestamp(),
    customFormat
  ),
  transports: [
    new (winston.transports.Console)(),
    new (winston.transports.File)({ filename: 'information-logs.log' })
  ]
});
