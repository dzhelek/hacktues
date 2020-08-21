-- creatng database and user
CREATE DATABASE hacktues;
CREATE USER nimda WITH PASSWORD '573l43vurhu7';

-- optimizing PostgreSQL's configuration
ALTER ROLE nimda SET client_encoding TO 'UTF8';
ALTER ROLE nimda SET default_transaction_isolation TO 'read committed';
ALTER ROLE nimda SET timezone TO 'Europe/Sofia';

-- giving rights to the user
GRANT ALL PRIVILEGES ON DATABASE hacktues TO nimda;
ALTER USER nimda CREATEDB;
