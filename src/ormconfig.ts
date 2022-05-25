import { ConnectionOptions, DataSource } from 'typeorm';
const config: ConnectionOptions = {
  type: 'sqlite',
  database: 'todo-list',
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  // migrations: [__dirname + '/../migrations/**/*{.ts,.js}'],
  synchronize: true,
  // logging: true,
  // subscribers: [],
};

export default config;
