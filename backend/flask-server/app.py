from flask import Flask, request, redirect, url_for
from flask_socketio import SocketIO, emit, join_room
import uuid  # Import for generating unique room IDs

app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins="*")

@app.route('/create')
def create():
    # Generate a unique room ID
    room = str(uuid.uuid4())
    # Redirect to the meeting page with the room ID
    return redirect(url_for('meeting', room=room))

@app.route('/meeting/<room>')
def meeting(room):
    # Render the meeting page for the given room ID (assumes a frontend handles this)
    return f"You have been redirected to meeting room: {room}"  # Placeholder response

@socketio.on('create-meeting')
def handle_create_meeting(room):
    print(f"Creating meeting in room: {room}")
    emit('message', 'Meeting created, waiting for participants...', to=room)

@socketio.on("join_room")
def handle_join_room(data):
    room = data.get("room")  # Extract room name
    if isinstance(room, str):  # Ensure it's a string
        join_room(room)
    else:
        print(f"Invalid room type: {type(room)}")

@socketio.on('offer')
def handle_offer(data):
    room = data['roomId']
    print(f"Received offer from room {room}")
    emit('offer', data, to=room)  # Send the offer to the room

@socketio.on('answer')
def handle_answer(data):
    room = data['roomId']
    print(f"Received answer for room {room}")
    emit('answer', data, to=room)  # Send the answer to the room

@socketio.on('ice-candidate')
def handle_ice_candidate(data):
    room = data['roomId']
    print(f"Received ICE candidate for room {room}")
    emit('ice-candidate', data, to=room)  # Send the ICE candidate to the room

if __name__ == "__main__":
    socketio.run(app, host="0.0.0.0", port=5001)
