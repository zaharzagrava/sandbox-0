--
create table client (
  id bigserial primary key,
  client_name varchar(255) unique not null,
  email varchar(255) unique not null,
  client_password varchar(255) not null,
  confirmed_at timestamptz null,
  firebase_id varchar(255),
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
  task_id bigint not null references task(id) ON DELETE CASCADE,
  "createdAt" date,
  "updatedAt" date
);
--
-- Test client data
--
insert into client(
    client_name,
    email,
    client_password,
    confirmed_at,
    firebase_id,
    "createdAt",
    "updatedAt"
  )
VALUES (
    'UTest',
    'test@utest.com',
    123123,
    null,
    null,
    '2020-10-08',
    '2020-10-08'
  );
insert into client(
    client_name,
    email,
    client_password,
    confirmed_at,
    firebase_id,
    "createdAt",
    "updatedAt"
  )
VALUES (
    'UTest2',
    'test2@utest.com',
    123123,
    null,
    null,
    '2020-10-08',
    '2020-10-08'
  );
--
-- Test task data
--
insert into task(
    title,
    task_description,
    is_done,
    task_priority,
    due_date,
    "createdAt",
    "updatedAt"
  )
VALUES (
    'First Task',
    'Description of the first task',
    false,
    1,
    '2020-10-15',
    '2020-10-08',
    '2020-10-08'
  );
insert into task(
    title,
    task_description,
    is_done,
    task_priority,
    due_date,
    "createdAt",
    "updatedAt"
  )
VALUES (
    'Second Task',
    'Description of the second task',
    false,
    2,
    '2020-10-15',
    '2020-10-08',
    '2020-10-08'
  );
insert into task(
    title,
    task_description,
    is_done,
    task_priority,
    due_date,
    "createdAt",
    "updatedAt"
  )
VALUES (
    'Third Task',
    'Description of the third task',
    false,
    3,
    '2020-10-15',
    '2020-10-08',
    '2020-10-08'
  );
--
-- Test client_task data
--
insert into client_task(client_id, task_id, "createdAt", "updatedAt")
values (1, 1, '2020-10-08', '2020-10-08');
insert into client_task(client_id, task_id, "createdAt", "updatedAt")
values (1, 2, '2020-10-08', '2020-10-08');
insert into client_task(client_id, task_id, "createdAt", "updatedAt")
values (2, 3, '2020-10-08', '2020-10-08');
--
--
--
SELECT "task"."id",
  "task"."title",
  "task"."task_description",
  "task"."is_done",
  "task"."task_priority",
  "task"."due_date",
  "clients"."id" AS "clients.id",
  "clients"."client_name" AS "clients.client_name",
  "clients"."email" AS "clients.email",
  "clients"."client_password" AS "clients.client_password",
  "clients"."confirmed_at" AS "clients.confirmed_at",
  "clients"."createdAt" AS "clients.createdAt",
  "clients"."updatedAt" AS "clients.updatedAt",
  "clients->client_task"."client_id" AS "clients.client_task.client_id",
  "clients->client_task"."task_id" AS "clients.client_task.task_id",
  "clients->client_task"."createdAt" AS "clients.client_task.createdAt",
  "clients->client_task"."updatedAt" AS "clients.client_task.updatedAt"
FROM "task" AS "task"
  INNER JOIN (
    "client_task" AS "clients->client_task"
    INNER JOIN "client" AS "clients" ON "clients"."id" = "clients->client_task"."client_id"
  ) ON "task"."id" = "clients->client_task"."task_id"
  AND "clients"."client_id" = 1;