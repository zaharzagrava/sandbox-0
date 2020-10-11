import { ErrorMessage, Field, FieldProps, Form, Formik } from 'formik';
import React, { ReactElement, useState } from 'react';
import ReactModal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { useGetTasks, usePostTask, usePutTask } from '../../backendapi/rest';
import { ClientActionCreators } from '../../redux/client';
import { NTask, StateType, TaskDT } from '../../types';
import ReactDatePicker from 'react-datepicker';
import { useQueryCache } from 'react-query';
import * as yup from 'yup'; // for everything
import SandboxErrorMessage from '../SandboxErrorMessage/SandboxErrorMessage';

// interface Props = {};

let initialValues: TaskDT = {
  id: -1,
  title: '',
  task_description: '',
  is_done: false,
  task_priority: 1,
  due_date: new Date(),
};

const validationSchema = yup.object({
  title: yup.string().required('Required'),
  task_description: yup.string().required('Required'),
  task_priority: yup.number().required('Requried'),
  due_date: yup.date().required('Requried'),
});

ReactModal.setAppElement('#root');

function TaskEditDetails(): ReactElement {
  const [firstTaskRender, setFirstTaskRender] = useState(true);

  const dispatch = useDispatch();
  const taskEditDetails = useSelector<
    StateType,
    { isOpen: boolean; taskId?: number }
  >(
    (state) =>
      state.client.taskEditDetails as { isOpen: boolean; taskId?: number }
  );

  let { data: tasks, status, error } = useGetTasks(NTask, {});

  const queryCache = useQueryCache();

  const [putTask] = usePutTask(undefined);
  const [postTask] = usePostTask(undefined);

  if (!taskEditDetails.isOpen) {
    if (!firstTaskRender) setFirstTaskRender(true);
    return <></>;
  }

  // Check if query is still loading
  if (status === 'loading') return <div>Loading...</div>;
  if (error) return <div>Error!</div>;

  // Editable mode. so set some default values
  const editMode = taskEditDetails.taskId !== undefined;
  if (editMode) {
    tasks = tasks as TaskDT[];
    const task = tasks.find((elem) => elem.id === taskEditDetails.taskId);
    if (task !== undefined && firstTaskRender) {
      initialValues = {
        id: task.id,
        title: task.title,
        task_description: task.task_description,
        is_done: task.is_done,
        task_priority: task.task_priority,
        due_date: task.due_date,
      };
      console.log('@initialValues');

      console.log(initialValues);

      setFirstTaskRender(false);
    }
  }

  async function onClose(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    dispatch(ClientActionCreators.taskEditDetailsUpdated(false));
  }

  async function onSubmitPutTaskForm(values: TaskDT) {
    await putTask(values);
    queryCache.invalidateQueries([NTask, {}, 'GET']);
  }

  async function onSubmitPostTaskForm(values: TaskDT) {
    const newTask = await postTask(values);
    queryCache.invalidateQueries([NTask, {}, 'GET']);
    dispatch(ClientActionCreators.taskEditDetailsUpdated(true, newTask?.id));
  }

  return (
    <ReactModal isOpen={taskEditDetails.isOpen} onRequestClose={onClose}>
      <Formik
        initialValues={initialValues}
        enableReinitialize={true}
        validationSchema={validationSchema}
        onSubmit={editMode ? onSubmitPutTaskForm : onSubmitPostTaskForm}
      >
        <Form>
          <div className="container">
            <div className="row py-3">
              <div className="col d-flex justify-content-end">
                <button onClick={onClose} className="close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
            </div>
            <div className="row py-2">
              <Field
                name="title"
                placeholder="Task Title"
                className="form-control"
              />
              <ErrorMessage
                component={SandboxErrorMessage as React.FunctionComponent<{}>}
                name="title"
              />
            </div>
            <div className="row py-2">
              <Field
                as="textarea"
                name="task_description"
                placeholder="Task Description"
                className="form-control"
              />
              <ErrorMessage
                component={SandboxErrorMessage as React.FunctionComponent<{}>}
                name="task_description"
              />
            </div>
            <div className="row py-2">
              <label>
                <Field type="checkbox" name="is_done" />
                {` Is Done`}
                <ErrorMessage
                  component={SandboxErrorMessage as React.FunctionComponent<{}>}
                  name="is_done"
                />
              </label>
            </div>
            <div className="row py-2">
              <Field
                name="task_priority"
                placeholder="Task Priority"
                className="form-control"
              />
              <ErrorMessage
                component={SandboxErrorMessage as React.FunctionComponent<{}>}
                name="task_priority"
              />
            </div>
            <div className="row py-2">
              <Field name={'due_date'}>
                {({ field, form, meta }: FieldProps) => (
                  <ReactDatePicker
                    selected={(field.value && new Date(field.value)) || null}
                    onChange={(date, event) => {
                      date = date as Date;
                      form.setFieldValue('due_date', date);
                    }}
                  />
                )}
              </Field>
              <ErrorMessage
                component={SandboxErrorMessage as React.FunctionComponent<{}>}
                name="due_date"
              />
            </div>
            <div className="row py-2 d-flex justify-content-center">
              <button type="submit" className="btn btn-primary">
                {editMode ? <>Save</> : <>Create</>}
              </button>
            </div>
          </div>
        </Form>
      </Formik>
    </ReactModal>
  );
}

export default TaskEditDetails;
