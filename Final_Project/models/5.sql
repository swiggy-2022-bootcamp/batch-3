create table answer_voters
(
    pk serial unique not null,
    user_pk int not null,
    answer_pk int not null,
    vote int not null default 0,
    foreign key (user_pk) references users (pk),
    foreign key (answer_pk) references answers (pk),
    unique (user_pk, answer_pk)
);
