import {TypeOrmModuleOptions} from '@nestjs/typeorm';

// export const typeOrmConfig: TypeOrmModuleOptions = {
//   type: 'mysql',
//   host: 'localhost',
//   port: 3306,
//   username: 'root',
//   password: '123456',
//   database: 'sql_invoicing',
//   entities: [__dirname + '/../**/*.entity.{js,ts}'],
// };
export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: '164.132.153.125',
  port: 3306,
  username: 'tbc',
  password: 'tbc',
  database: 'tabacapp',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
};

/*Execute this on MySql to let nest connect to database:
  ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '123456';
  FLUSH PRIVILEGES;
  --(caching_sha2_password is introduced in MySQL 8.0, but the Node.js version is not implemented yet)
  //https://stackoverflow.com/questions/50093144/mysql-8-0-client-does-not-support-authentication-protocol-requested-by-server/53382070
*/
