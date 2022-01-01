import Peer,{SfuRoom} from "skyway-js";
import React,{ useState, useRef, useEffect } from "react";
import { TextField, Button } from '@material-ui/core';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
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
import ScreenShareIcon from '@mui/icons-material/ScreenShare';
import StopScreenShareIcon from '@mui/icons-material/StopScreenShare';

function Skyway(){
  const peer = new Peer({key: '95ba327e-64d1-4c05-8f9f-ad00ac893e07'});
  const [roomData, setRoomData] = useState({room: null, messages: ''});
  const [localStream, setLocalStream] = useState('');
  const [remoteVideo, setRemoteVideo] = useState([]);
  const [isConnected, setIsConnected] = useState(false); //false: 接続なし, true: 通話中
  const [userDisplay, setUserDisplay] = useState(false); //true: 画面共有
  const [userAudio, setUserAudio] = useState(true); //false: ミュート
  const [userVideo, setUserVideo] = useState(true); //false: カメラオフ
  const [isChat, setIsChat] = useState(false); //false: チャットオフ
  const localVideoRef = useRef(null);

  
  //ユニークなルームIDを生成（今は定数）
  const roomId = 1;
  
  //useEffect実行時、自身のカメラ映像取得
  useEffect(() => {
    changeStream();
  }, [userVideo, userAudio, userDisplay]);

  //画面共有と自分の映像の取得・切り替え
  const changeStream = () => {
    if(userDisplay){
        navigator.mediaDevices.getDisplayMedia({video: true, audio: userAudio})
      .then( stream => {
        // 成功時にvideo要素に共有映像をセット
        setLocalStream(stream);
        //共有終了時、画面共有の変数をfalseに
        stream.getTracks()[0].addEventListener('ended', () => {
          setUserDisplay(false);
        });
        localVideoRef.current.srcObject = stream;
        localVideoRef.current.play();
      }).catch( error => {
        console.error('mediaDevice.getDisplayMedia() error:', error);
        setUserDisplay(false);
        return;
      });
    }else{
      navigator.mediaDevices.getUserMedia({video: userVideo, audio: userAudio})
      .then( stream => {
        // 成功時にvideo要素にカメラ映像をセット
        setLocalStream(stream);
        localVideoRef.current.srcObject = stream;
        localVideoRef.current.play();
      }).catch( error => {
        // 失敗時にはエラーログを出力
        console.error('mediaDevice.getUserMedia() error:', error);
        return;
      });
    }
  }
  
  //入室ボタンの処理
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
      roomData.room = room;
      let data = Object.assign({}, roomData);
      setRoomData(data);
      setEventListener(room);
      setIsConnected(true);

    }
  }

  //退室ボタンの処理
  const onClose = () => {
    roomData.room.close();
    setIsConnected(false);
  }

  //チャットに変更があったとき、stateを更新する処理(setStateではうまく動かない)
  const addMessages = (text) => {
    roomData.messages += (text+ '\n');
    let data = Object.assign({}, roomData);
    setRoomData(data);
  }

  //ルームの各イベントに対して処理を追加
  const setEventListener = (room) => {
    const sendTrigger = document.getElementById('send-trigger');
    const messageForm = document.getElementById('message-form');
    
    //open: SkyWayサーバーとの接続が成功したタイミングで発火
    room.once("open", () => {
      addMessages('=== ルームに参加しました ===');
      setIsConnected(true);
    });

    //peerJoin: 誰かがroomに参加したときに発火
    room.on("peerJoin", (peerId) => {
      addMessages(`=== ${peerId} が参加しました ===`);
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
      addMessages(`${src}: ${data}`);
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
      addMessages(`=== ${peerId} が退室しました ===`);
    });

    //close: 自身が退室したときに発火
    room.once('close', () => {
      sendTrigger.removeEventListener('click', onClickSend);
      addMessages('== ルームから退室しました ===');
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
          addMessages(`あなた: ${localMessage}`);
          messageForm.value = '';
        }
    }
  }
  
  const castVideo = () => {
    if(remoteVideo){
      return remoteVideo.map((video) => {
        if(video){
          return <Video video={video} key={video.peerId} />;
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
        <Box sx={{display: (isChat ? 'block' : 'none')}} >
          <Chat messages={roomData.messages} />
        </Box>

        {/* 操作バー */}
        <Box sx={{ width: '100%', position: 'absolute', bottom: 0, right: 0, 'backgroundColor': 'rgba(255,255,255,0.96)' }}>
          <Stack justifyContent="center" direction="row" spacing={4}>
              <Box>
                <Button color="primary" variant="text" onClick={() => {setUserAudio(prev => !prev)}}>
                  {userAudio
                  ? <Stack alignItems="center"><MicIcon />ミュート</Stack>
                  : <Stack alignItems="center"><MicOffIcon />ミュート解除</Stack>
                  }
                </Button>
                <Button color="primary" variant="text" onClick={() => {setUserVideo(prev => !prev)}}>
                  {userVideo
                  ? <Stack alignItems="center"><VideocamIcon />カメラオフ</Stack>
                  : <Stack alignItems="center"><VideocamOffIcon />カメラオン</Stack>
                  }
                </Button>
                <Button color="primary" variant="text" onClick={() => {setUserDisplay(prev => !prev)}}>
                  {userDisplay
                  ? <Stack alignItems="center"><ScreenShareIcon />共有終了</Stack>
                  : <Stack alignItems="center"><StopScreenShareIcon/>画面共有</Stack>
                  }
                </Button>
                <Button color="primary" variant="text" onClick={() => {setIsChat(prev => !prev)}}><Stack alignItems="center"><ChatIcon />チャット</Stack></Button>
              </Box>
              <Stack justifyContent="center">
                {isConnected
                ?<Button size="small" color="secondary" variant="contained" onClick={() => onClose()} startIcon={<CallEndIcon />}>終了</Button>
                :<Button size="small" color="primary" variant="contained" onClick={() => onStart()} startIcon={<CallIcon />}>開始</Button>
                }
              </Stack>
            </Stack>
        </Box>

        {/* 自分の映像 */}
        <Box sx={{ width: '100%', position: 'absolute', top: 0, left: 0 }}>
          <Box sx={{ width: '20%' }}>
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