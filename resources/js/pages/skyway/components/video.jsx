import React,{ useState, useRef, useEffect } from "react";
import Box from '@mui/material/Box';

const Video = (props) => {
  const {video} = props;
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.srcObject = video.stream;
      videoRef.current.play().catch((e) => console.log(e));
    }
  }, [video]);

  return <video width="100%" ref={videoRef} playsInline autoPlay muted></video>;
};

export default Video;