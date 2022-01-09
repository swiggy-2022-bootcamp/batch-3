alter table questions add column votes int not null default 0;

alter table answers add column votes int not null default 0;
