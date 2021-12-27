import Peer,{SfuRoom} from "skyway-js";
import React,{ useState, useRef, useEffect } from "react";
import { TextField, Button } from '@material-ui/core';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

import Video from './components/video';
import Chat from './components/chat';

import CallIcon from '@mui/icons-material/Call';
import CallEndIcon from '@mui/icons-material/CallEnd';
import SendIcon from '@mui/icons-material/Send';
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import VideocamIcon from '@mui/icons-material/Videocam';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import ChatIcon from '@mui/icons-material/Chat';

function Skyway(){
  const peer = new Peer({key: '95ba327e-64d1-4c05-8f9f-ad00ac893e07'});
  const [roonData, setRoonData] = useState({roon: null, messages: ''});
  const [localStream, setLocalStream] = useState('');
  const [remoteVideo, setRemoteVideo] = useState([]);
  const [messages, setMessages] = useState(''); //チャットメッセージ
  const [isConnected, setIsConnected] = useState(false); //false: 接続なし, true: 通話中
  const [isMuted, setIsMuted] = useState(true); //false: ミュート
  const [isOffScreen, setIsOffScreen] = useState(true); //false: 画面オフ
  const [isChat, setIsChat] = useState(false); //false: チャットオフ
  const localVideoRef = useRef(null);

  
  //ユニークなルームIDを生成（今は定数）
  const roomId = 1;
  
  //useEffect実行時、自身のカメラ映像取得
  useEffect(() => {
    changeStream();
  }, []);

  const changeStream = () => {
    navigator.mediaDevices.getUserMedia({video: isOffScreen, audio: isMuted})
    .then( stream => {
      // 成功時にvideo要素にカメラ映像をセット
      setLocalStream(stream);
      localVideoRef.current.srcObject = stream;
      localVideoRef.current.play().catch((e) => console.log(e));
    }).catch( error => {
      // 失敗時にはエラーログを出力
      console.error('mediaDevice.getUserMedia() error:', error);
      return;
    });
    console.log(`video: ${isOffScreen}, audio: ${isMuted}`)
  }
  
  const onStart = () => {
    if(peer){
      if (!peer.open) {
        return;
      }
      //peer.joinRoom()で接続 => roomに接続相手の情報が帰ってくる
      const room = peer.joinRoom(roomId, {
        mode: 'sfu',
        stream: localStream,
      });
      roonData.roon = room;
      let data = Object.assign({}, roonData);
      setRoonData(data);
      setEventListener(room);

    }
  }

  const addMessages = (text) => {
    roonData.messages += (text+ '\n');
    let data = Object.assign({}, roonData);
    setRoonData(data);
  }


  // if(roon){
  //   //peerJoin: 誰かがroomに参加したときに発火
  //   roon.on("peerJoin", (peerId) => {
  //     setMessages(messages + `=== ${peerId} が参加しました ===\n`);
  //   });
  // }
    
  const setEventListener = (room) => {
    const leaveTrigger = document.getElementById('leave-trigger');
    const sendTrigger = document.getElementById('send-trigger');
    const messageForm = document.getElementById('message-form');
    
    //open: SkyWayサーバーとの接続が成功したタイミングで発火
    room.once("open", () => {
      setMessages(messages + '=== ルームに参加しました ===\n');
      addMessages('=== ルームに参加しました ===\n');
      messages += '=== ルームに参加しました ===\n';
      setIsConnected(true);
    });

    //peerJoin: 誰かがroomに参加したときに発火
    room.on("peerJoin", (peerId) => {
      setMessages(messages + `=== ${peerId} が参加しました ===\n`);
      addMessages(`=== ${peerId} が参加しました ===\n`);
      messages += `=== ${peerId} が参加しました ===\n`;
    });

    //stream: 相手の映像の情報
    room.on("stream", async (stream) => {
      setRemoteVideo([
        ...remoteVideo,
        { stream: stream, peerId: stream.peerId },
      ]);
    });

    //data: チャット受信
    room.on("data", ({data, src}) => {

      setMessages(messages + `${src}: ${data}\n`);
      addMessages(`${src}: ${data}\n`);
      messages += `${src}: ${data}\n`;
      // messages.textContent += `${src}: ${data}\n`;
    })
    
    //peerLeave: 誰かがroomから退室したときに発火
    room.on("peerLeave", (peerId) => {
      setRemoteVideo(
        remoteVideo.filter((video) => {
          if (video.peerId === peerId) {
            video.stream.getTracks().forEach((track) => track.stop());
          }
          return video.peerId !== peerId;
        })
      );
      setMessages(messages + `=== ${peerId} が退室しました ===\n`);
        // messages.textContent += `=== ${peerId} が退室しました ===\n`;
    });

    //close: 自身が退室したときに発火
    room.once('close', () => {
      sendTrigger.removeEventListener('click', onClickSend);
      setMessages(messages + '== ルームから退室しました ===\n');
      // messages.textContent += '== ルームから退室しました ===\n';
      setRemoteVideo(
        remoteVideo.filter((video) => {
          video.stream.getTracks().forEach((track) => track.stop());
          return false;
        })
      );
      setIsConnected(false);
    });

    //送信ボタンの処理
    sendTrigger.addEventListener('click', () => onClickSend());
    const onClickSend = () => {
      const localMessage = messageForm.value;
        if(localMessage){
          room.send(localMessage);
          setMessages(messages + `あなた: ${localMessage}\n`);
          messages += `あなた: ${localMessage}\n`;
          // messages.textContent += `あなた: ${localMessage}\n`;
          messageForm.value = '';
        }
    }
    
    //退室ボタンの処理
    leaveTrigger.addEventListener('click', () => room.close(), { once: true });
  }
  
  const castVideo = () => {
    if(remoteVideo){
      return remoteVideo.map((video) => {
        if(video){
          return <Video video={video} key={video.peerId} />;
        }else{
          return (
            <div>
              <Box sx={{width: '75%', height: '100vh', 'backgroundColor': '#333'}}>
    
              </Box>
            </div>
            );
        }
      });
    }
  };
  

  return (
    <div>
      <Box sx={{ width: '100%', 'backgroundColor': '#333', position: 'relative'}}>
        {/* 相手の画面 */}
        <Box sx={{ height: '100vh', display: 'flex', 'justifyContent': 'center', margin: 'auto'}}>
          {castVideo()}
        </Box>

        {/* チャット */}
        <Box sx={{
          display: (isChat ? 'block' : 'none')
          }} >
          <Chat messages={roonData.messages} />
        </Box>

        {/* 操作バー */}
        <Box sx={{ width: '100%', position: 'absolute', bottom: 0, right: 0 }}>
          <Button id="call-trigger" color="primary" variant="contained" onClick={() => onStart()} startIcon={<CallIcon />}>開始</Button>
          <Button id="leave-trigger" color="secondary" variant="contained" startIcon={<CallEndIcon />}>終了</Button>
          <Button color="primary" variant="contained" onClick={() => {setIsMuted(prev => !prev); changeStream()}}>{isMuted ? <MicIcon /> : <MicOffIcon />}</Button>
          <Button color="primary" variant="contained" onClick={() => {setIsOffScreen(prev => !prev); changeStream()}}>{isOffScreen ? <VideocamIcon /> : <VideocamOffIcon />}</Button>
          <Button color="primary" variant="contained" onClick={() => {setIsChat(prev => !prev);}}><ChatIcon /></Button>
        </Box>

        {/* 自分の映像 */}
        <Box sx={{ width: '100%', position: 'absolute', top: 0, left: 0 }}>
          <Box sx={{ width: '25%' }}>
            <video
            width="100%"
            ref={localVideoRef}
            style={{transform: 'scale(-1,1)'}}
            playsInline autoPlay muted></video>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default Skyway;