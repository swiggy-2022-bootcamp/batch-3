create table users
(
    pk serial unique not null,
    username varchar(255) unique not null,
    registration_name text not null,
    password text not null,
    primary key (pk)
);
