create table questions
(
    pk serial unique not null,
    title text not null,
    body text not null,
    user_pk int not null,
    foreign key (user_pk) references users (pk)
);
