import React from 'react';
import { TextField, Button } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => createStyles({
  textArea: {
      marginRight: theme.spacing(2),
  },
}));

function UserCreateFrom(props) {

  const classes = useStyles();
  const { data, inputChange, btnFunc } = props;


  return (
      <form>
          <TextField id="name" label="名前" variant="outlined" className={classes.textArea} name="name" value={data.name} onChange={inputChange} />
          <TextField id="email" label="メール" variant="outlined" className={classes.textArea} name="email" value={data.email} onChange={inputChange} />
          <Button color="primary" variant="contained" href="/users" onClick={btnFunc}>登録</Button>
      </form>

  );
}

export default UserCreateFrom;