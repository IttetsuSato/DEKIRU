import Peer from "skyway-js";
import React,{ useState, useRef, useEffect, SfuRoom } from "react";

function Skyway2(){
  const peer = new Peer({key: '95ba327e-64d1-4c05-8f9f-ad00ac893e07'});
  const [remoteVideo, setRemoteVideo] = useState([]);
  const [localStream, setLocalStream] = useState('');
  const [room, setRoom] = useState('');
  const localVideoRef = useRef(null);

  //ユニークなルームIDを生成（今は定数）
  const roomId = 1;

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

      //peer.joinRoom()で接続 => tmpRoomに接続相手の情報が帰ってくる
      const tmpRoom = peer.joinRoom(roomId, {
        mode: 'sfu',
        stream: localStream,
      });

       //open: SkyWayサーバーとの接続が成功したタイミングで発火
      tmpRoom.once("open", () => {
        console.log("=== You joined ===\n");
      });
      //peerJoin: 誰かがroomに参加したときに発火
      tmpRoom.on("peerJoin", (peerId) => {
        console.log(`=== ${peerId} joined ===\n`);
      });
      //stream: 相手の映像の情報
      tmpRoom.on("stream", async (stream) => {
        setRemoteVideo([
          ...remoteVideo,
          { stream: stream, peerId: stream.peerId },
        ]);
      });
      //peerLeave: 誰かがroomから退室したときに発火
      tmpRoom.on("peerLeave", (peerId) => {
        setRemoteVideo(
          remoteVideo.filter((video) => {
            if (video.peerId === peerId) {
              video.stream.getTracks().forEach((track) => track.stop());
            }
            return video.peerId !== peerId;
          })
        );
        console.log(`=== ${peerId} left ===\n`);
      });
      //stateに映像情報をセット
      setRoom(tmpRoom);

    }
  }

  const onEnd = () => {
    if (room) {
      room.close();
      setRemoteVideo((prev) => {
        return prev.filter((video) => {
          video.stream.getTracks().forEach((track) => track.stop());
          return false;
        });
      });
    }
  }

  const castVideo = () => {
    return remoteVideo.map((video) => {
      return <RemoteVideo video={video} key={video.peerId} />;
    });
  };

  return (
    <div>
      <button onClick={() => onStart()}>start</button>
      <button onClick={() => onEnd()}>end</button>
      <video
      ref={localVideoRef}
      style={{transform: 'scale(-1,1)'}}
      playsInline autoPlay muted></video>
      {castVideo()}
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