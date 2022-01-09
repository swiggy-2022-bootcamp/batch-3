create table question_voters
(
    pk serial unique not null,
    user_pk int not null,
    question_pk int not null,
    vote int not null default 0,
    foreign key (user_pk) references users (pk),
    foreign key (question_pk) references questions (pk),
    unique (user_pk, question_pk)
);
