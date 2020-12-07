CREATE TABLE `users` (
  `id` bigint NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `name` varchar(150) NOT NULL,
  `passwordHash` varchar(250) NOT NULL,
  `passwordSalt` varchar(250) NOT NULL,
  `activeToken` varchar(20),
  `age` bigint NOT NULL,
  `sex` varchar(150) NOT NULL,
  `rol` varchar(150) NOT NULL,
  `dateRegister` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
);
ALTER TABLE `users` ADD UNIQUE (`name`);

CREATE TABLE `consumptions` (
  `id` bigint NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `user` bigint NOT NULL
);
ALTER TABLE `consumptions` ADD FOREIGN KEY (`user`) REFERENCES `users` (`id`);

CREATE TABLE `goals` (
  `id` bigint NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `user` bigint NOT NULL,
  `goal` int,
  `consumptions` int
);
ALTER TABLE `goals` ADD FOREIGN KEY (`user`) REFERENCES `users` (`id`);


