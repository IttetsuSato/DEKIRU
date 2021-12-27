import React,{ useState, useRef, useEffect } from "react";
import Box from '@mui/material/Box';
import { TextField, Button } from '@material-ui/core';
import SendIcon from '@mui/icons-material/Send';

const Chat = (props) => {
  const {messages} = props;
  
  return (
    <div>
      <Box sx={{width: '25%', 'backgroundColor': 'rgba(255,255,255,0.96)', height: '100vh', position: 'absolute', top: 0, right: 0, zIndex: 'modal', display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
        <pre>{messages}</pre>
        <Box sx={{ display: 'flex'}}>
            <TextField id="message-form" label="チャット" variant="outlined" name="name"  />
            <Button id="send-trigger" color="primary" variant="contained"><SendIcon /></Button>
        </Box>
      </Box>
    </div>
  );
};

export default Chat;