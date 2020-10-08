--
create table client (
  id bigserial primary key,
  client_name varchar(255) unique not null,
  email varchar(255) unique not null,
  client_password varchar(255) not null,
  confirmed_at timestamptz null,
  "createdAt" date,
  "updatedAt" date
);
--
create table task (
  id bigserial primary key,
  title varchar(255) not null,
  task_description text not null,
  is_done boolean not null,
  task_priority int not null,
  due_date timestamptz not null,
  "createdAt" date,
  "updatedAt" date
);
-- 
create TABLE client_task (
  id bigserial primary key,
  client_id bigint not null references client(id) ON DELETE CASCADE,
  task_id bigint not null unique references task(id) ON DELETE CASCADE,
  "createdAt" date,
  "updatedAt" date
);