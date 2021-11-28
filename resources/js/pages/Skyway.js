import React, {useState, useRef} from 'react';
import Peer from 'skyway-js';
const peer = new Peer({key: '95ba327e-64d1-4c05-8f9f-ad00ac893e07'});


function Skyway() {
  const [myId, setMyId] = useState('');
  const [callId, setCallId] = useState('');
  const [localMessage, setLocalMessage] = useState('');
  const [messages, setMessages] = useState('');
  //DOM要素の取得
  const localVideo = useRef(null);
  const remoteVideo = useRef(null);
  const sendTrigger = useRef(null);

  //open: SkyWayサーバーとの接続が成功したタイミングで発火
  peer.on('open', () => {
    setMessages(messages + `=== サーバー接続成功 ===\n`);
    //PeerID取得
    setMyId(peer.id);
    // カメラ映像取得
    navigator.mediaDevices.getUserMedia({video: true, audio: true})
      .then( stream => {
      // 成功時にvideo要素にカメラ映像をセット
      localVideo.current.srcObject = stream;
    }).catch( error => {
      // 失敗時にはエラーログを出力
      console.error('mediaDevice.getUserMedia() error:', error);
      return;
    });
  });

  //call: 相手から接続要求が来たタイミングで発火
  peer.on('call', mediaConnection => {
    mediaConnection.answer(localVideo.current.srcObject);
    //相手の映像をvideo要素にセット
    mediaConnection.on('stream', async stream => {
      remoteVideo.current.srcObject = stream;
    });

    //close: 接続が切れたときに発火
    mediaConnection.once('close', () => {
      remoteVideo.current.srcObject.getTracks().forEach(track => track.stop());
      remoteVideo.current.srcObject = null;
    });
  });

  //error: 何らかのエラーで発火
  peer.on('error', err => {
    alert(err.message);
  });

  const makeCall = () => {
    if (!peer.open) {
      return;
    }
    //peer.call()で接続 => mediaConnectionに接続相手の情報が帰ってくる
    const mediaConnection = peer.call(callId, localVideo.current.srcObject);
    //相手の映像をvideo要素にセット
    mediaConnection.on('stream', async stream => {
      remoteVideo.current.srcObject = stream;
      await remoteVideo.current.play().catch(console.error);
    });

    //close: 接続が切れたときに発火
    mediaConnection.once('close', () => {
      remoteVideo.current.srcObject.getTracks().forEach(track => track.stop());
      remoteVideo.current.srcObject = null;
    });
  }


  //通話終了処理
  const endCall = () => {
    peer.destroy();
  }

  const onClickSend = () => {

  }

  return (
      <div className="container">
          <div className="row justify-content-center">
              <div className="col-md-8">
                  <div className="card">
                      <div>
                        <video
                        width="400px"
                        ref={localVideo}
                        style={{transform: 'scale(-1,1)'}}
                        autoPlay muted playsInline>
                        </video>
                      </div>

                      <div>
                        <div>YOUR ID:{myId}</div>
                        <input value={callId} onChange={e => setCallId(e.target.value)}></input>
                        <button onClick={makeCall}>発信</button>
                        <button onClick={endCall}>終了</button>
                      </div>

                      <div>
                        <input value={localMessage} onChange={e => setLocalMessage(e.target.value)}></input>
                        <button
                        ref={sendTrigger}
                        onClick={onClickSend}>送信
                        </button>
                      </div>

                      <div>
                        <video
                        width="400px"
                        ref={remoteVideo}
                        autoPlay muted playsInline>
                        </video>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  );
}

export default Skyway;