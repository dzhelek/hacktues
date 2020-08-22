-- creatng database and user
CREATE DATABASE hacktues$default CHARACTER SET utf8;
CREATE USER 'hacktues'@'%' identified with mysql_native_password by 'p8)yx?fpa2+hh!hv';

-- giving rights to the user
GRANT ALL ON *.* TO 'hacktues'@'%';
FLUSH PRIVILEGES;
