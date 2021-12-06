import Peer,{SfuRoom} from "skyway-js";
import React,{ useState, useRef, useEffect } from "react";
import { TextField, Button } from '@material-ui/core';

import CallIcon from '@mui/icons-material/Call';
import CallEndIcon from '@mui/icons-material/CallEnd';
import SendIcon from '@mui/icons-material/Send';

function Skyway2(){
  const peer = new Peer({key: '95ba327e-64d1-4c05-8f9f-ad00ac893e07'});
  const [remoteVideo, setRemoteVideo] = useState([]);
  const [localStream, setLocalStream] = useState('');
  const localVideoRef = useRef(null);

  
  //ユニークなルームIDを生成（今は定数）
  const roomId = 1;
  
  //useEffect実行時、自身のカメラ映像取得
  useEffect(() => {
    navigator.mediaDevices.getUserMedia({video: true, audio: true})
    .then( stream => {
      // 成功時にvideo要素にカメラ映像をセット
      setLocalStream(stream);
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
        localVideoRef.current.play().catch((e) => console.log(e));
      }
    }).catch( error => {
      // 失敗時にはエラーログを出力
      console.error('mediaDevice.getUserMedia() error:', error);
      return;
    });
  }, []);
  
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
      console.log(room);
      setEventListener(room);
    }
  }
    
  const setEventListener = (room) => {
    const leaveTrigger = document.getElementById('leave-trigger');
    const sendTrigger = document.getElementById('send-trigger');
    const messageForm = document.getElementById('message-form');
    const messages = document.getElementById('messages');
    
    
    //open: SkyWayサーバーとの接続が成功したタイミングで発火
    room.once("open", () => {
      messages.textContent += '=== ルームに参加しました ===\n';
    });

    //peerJoin: 誰かがroomに参加したときに発火
    room.on("peerJoin", (peerId) => {
      messages.textContent += `=== ${peerId} が参加しました ===\n`;
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
      messages.textContent += `${src}: ${data}\n`;
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
        messages.textContent += `=== ${peerId} が退室しました ===\n`;
    });

    //close: 自身が退室したときに発火
    room.once('close', () => {
      sendTrigger.removeEventListener('click', onClickSend);
      messages.textContent += '== ルームから退室しました ===\n';
      setRemoteVideo(
        remoteVideo.filter((video) => {
          video.stream.getTracks().forEach((track) => track.stop());
          return false;
        })
      );
    });

    //送信ボタンの処理
    sendTrigger.addEventListener('click', () => onClickSend());
    const onClickSend = () => {
      const localMessage = messageForm.value;
        if(localMessage){
          room.send(localMessage);
          messages.textContent += `あなた: ${localMessage}\n`;
          messageForm.value = '';
        }
    }
    
    //退室ボタンの処理
    leaveTrigger.addEventListener('click', () => room.close(), { once: true });
  }
  
  const castVideo = () => {
    return remoteVideo.map((video) => {
      return <RemoteVideo video={video} key={video.peerId} />;
    });
  };

  return (
    <div>
      <video
      ref={localVideoRef}
      style={{transform: 'scale(-1,1)'}}
      playsInline autoPlay muted></video>
      <Button id="call-trigger" color="primary" variant="contained" onClick={() => onStart()} startIcon={<CallIcon />}>開始</Button>
      <Button id="leave-trigger" color="secondary" variant="contained" startIcon={<CallEndIcon />}>終了</Button>
      {castVideo()}
      <pre className="messages" id="messages"></pre>
      <form>
          <TextField id="message-form" label="チャット" variant="outlined" name="name"  />
          <Button id="send-trigger" color="primary" variant="contained" startIcon={<SendIcon />}>送信</Button>
      </form>

    </div>
  );
};

const RemoteVideo = (props) => {
  const {video} = props;
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.srcObject = video.stream;
      videoRef.current.play().catch((e) => console.log(e));
    }
  }, [props.video]);
  return <video ref={videoRef} playsInline autoPlay muted></video>;
};

export default Skyway2;