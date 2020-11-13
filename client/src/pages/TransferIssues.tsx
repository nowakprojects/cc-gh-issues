import React from 'react';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import {
  Button,
  Typography,
  makeStyles,
  createStyles,
  Theme,
} from '@material-ui/core';
import { QueryStatus } from 'react-query';
import { RepoSelect } from '../components/RepoSelect';
import { Loader } from '../components/Loader';
import { useAuthState } from '../hooks/useAuthState';
import { useRepos } from '../hooks/useRepos';
import { TransferIssuesFormData } from '../types/transferIssues';

const initialValues: TransferIssuesFormData = {
  fromRepo: '',
  toRepo: '',
};

const validationSchema: yup.ObjectSchema<TransferIssuesFormData> = yup
  .object({
    fromRepo: yup.string().required('Please select a base repo'),
    toRepo: yup.string().required('Please select a target repo'),
  })
  .defined();

export const TransferIssues = () => {
  const classes = useStyles();
  const { user } = useAuthState();

  const { data, status } = useRepos(user?.repos_url!);
  const { Loading, Error } = QueryStatus;

  if (status === Loading) {
    return <Loader />;
  }

  if (status === Error) {
    return (
      <Typography variant="body1" color="error">
        Sorry, something went wrong when fetching repos
      </Typography>
    );
  }

  return (
    <>
      <Typography variant="h5" align="center">
        Transfer issues
      </Typography>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => console.log(values)}
      >
        {({ handleSubmit }) => (
          <Form className={classes.container} onSubmit={handleSubmit}>
            <RepoSelect name="fromRepo" label="Base repo" repos={data!} />
            <RepoSelect name="toRepo" label="Target repo" repos={data!} />
            <Button type="submit" fullWidth variant="contained" color="primary">
              Transfer Issues
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexDirection: 'column',
      gap: `${theme.spacing(2)}px`,
      width: '100%',
      maxWidth: 500,
    },
  })
);
