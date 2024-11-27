'use client';

import { useEffect, useRef, useState } from 'react';
import io, { Socket } from 'socket.io-client';

const VideoCallDoctor = () => {
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const peerConnectionRef = useRef<RTCPeerConnection | null>(null);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [patientId, setPatientId] = useState<string>('');
  const [doctorId, setDoctorId] = useState<string>('');
  const [roomId, setRoomId] = useState<string>(''); // Room ID
  const [isRoomCreated, setIsRoomCreated] = useState<boolean>(false);
  const [isMeetingJoined, setIsMeetingJoined] = useState<boolean>(false);
  const [localStream, setLocalStream] = useState<MediaStream | null>(null); // Store the local stream

  useEffect(() => {
    const newSocket = io('http://localhost:5000'); // Update with your server URL
    setSocket(newSocket);

    peerConnectionRef.current = new RTCPeerConnection();
    const peerConnection = peerConnectionRef.current;

    const handleIceCandidate = (event: RTCPeerConnectionIceEvent) => {
      if (event.candidate) {
        newSocket.emit('send-ice-candidate', roomId, event.candidate);
      }
    };

    const handleTrackEvent = (event: RTCTrackEvent) => {
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = event.streams[0];
      }
    };

    if (peerConnection) {
      peerConnection.onicecandidate = handleIceCandidate;
      peerConnection.ontrack = handleTrackEvent;
    }

    const startVideo = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        setLocalStream(stream); // Store the stream
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }
        stream.getTracks().forEach((track) => peerConnection?.addTrack(track, stream));
      } catch (error) {
        console.error('Error accessing media devices:', error);
      }
    };

    if (isMeetingJoined) {
      startVideo();
    }

    if (roomId && isRoomCreated) {
      newSocket.emit('create-room', roomId);
    }

    newSocket.on('receive-answer', async (answer: RTCSessionDescriptionInit) => {
      if (peerConnection) {
        await peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
      }
    });

    newSocket.on('receive-ice-candidate', async (candidate: RTCIceCandidateInit) => {
      if (peerConnection) {
        await peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
      }
    });

    return () => {
      newSocket.disconnect();
      peerConnection?.close();
    };
  }, [roomId, isRoomCreated, isMeetingJoined]);

  // Function to generate a random room ID with alphanumeric characters
  const generateRoomId = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let roomId = '';
    for (let i = 0; i < 8; i++) { // Generates an 8-character room ID
      roomId += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return roomId;
  };

  // Create a room with a unique room ID when both IDs are provided
  const createRoom = () => {
    if (patientId && doctorId) {
      const newRoomId = generateRoomId(); // Generate a random alphanumeric room ID
      setRoomId(newRoomId);
      setIsRoomCreated(true);
    } else {
      console.error("Please enter both patient and doctor IDs");
    }
  };

  const joinMeeting = () => {
    setIsMeetingJoined(true);
  };

  // End the meeting by stopping the stream and closing the peer connection
  const endMeeting = () => {
    if (localStream) {
      localStream.getTracks().forEach(track => track.stop()); // Stop all tracks
    }
    peerConnectionRef.current?.close(); // Close the peer connection

    // Reset states
    setIsMeetingJoined(false);
    setLocalStream(null);
    if (localVideoRef.current) {
      localVideoRef.current.srcObject = null; // Stop displaying the local video
    }
    if (remoteVideoRef.current) {
      remoteVideoRef.current.srcObject = null; // Stop displaying the remote video
    }
  };

  return (
    <div>
      <h2>Doctor's Video Call</h2>
      <input
        type="text"
        placeholder="Enter Patient ID"
        value={patientId}
        onChange={(e) => setPatientId(e.target.value)}
        style={{ marginBottom: '10px', padding: '5px' }}
      />
      <input
        type="text"
        placeholder="Enter Doctor ID"
        value={doctorId}
        onChange={(e) => setDoctorId(e.target.value)}
        style={{ marginBottom: '10px', padding: '5px' }}
      />
      <button onClick={createRoom}>Create Room</button>

      {isRoomCreated && roomId && (
        <div>
          <p>Room ID: {roomId}</p>
          <button onClick={joinMeeting}>Join Meeting</button>
        </div>
      )}

      {isMeetingJoined && (
        <div>
          <h3>Meeting in Progress</h3>
          <video ref={localVideoRef} autoPlay muted style={{ width: '300px', border: '1px solid black' }} />
          <video ref={remoteVideoRef} autoPlay style={{ width: '300px', border: '1px solid black' }} />
          <button onClick={endMeeting} style={{ marginTop: '10px' }}>End Meeting</button>
        </div>
      )}
    </div>
  );
};

export default VideoCallDoctor;
