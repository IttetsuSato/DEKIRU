import React,{ useState, useRef, useEffect } from "react";
import Box from '@mui/material/Box';
import { TextField, Button } from '@material-ui/core';
import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Send';

const Chat = (props) => {
  const {messages} = props;
  
  return (
    <div>
      <Box sx={{width: '25%', 'backgroundColor': 'rgba(255,255,255,0.96)', height: '100vh', position: 'absolute', top: 0, right: 0, zIndex: 'modal', display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
        <Box sx={{'white-space': 'pre-wrap', 'word-wrap': 'break-word', 'font-size': '0.8rem', padding: '8px'}}>
          {messages}
        </Box>
        <Box sx={{ display: 'flex', 'font-size': '0.7rem'}}>
            <TextField
            id="message-form"
            label="メッセージを入力"
            multiline
            fullWidth
            rows={3}
            variant="outlined"
            name="name"
            inputProps={{style: {fontSize: 10}}}
            InputLabelProps={{style: {fontSize: 12}}}
            />
            <Box>
              <IconButton id="send-trigger" color="primary">
                <SendIcon />
              </IconButton>
            </Box>
        </Box>
      </Box>
    </div>
  );
};

export default Chat;