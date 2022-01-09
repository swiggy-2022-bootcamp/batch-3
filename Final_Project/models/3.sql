create table answers
(
    pk serial unique not null,
    answer text not null,
    user_pk int not null,
    question_pk int not null,
    foreign key (user_pk) references users (pk),
    foreign key (question_pk) references questions (pk),
    unique (user_pk, question_pk)
);
