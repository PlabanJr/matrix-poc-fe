import * as sdk from "matrix-js-sdk";
import request from "request";
import { MatrixClient, RoomEvent } from "matrix-js-sdk";

import { applicationConfig } from "../../config";
import { EventEmitterEvents } from "matrix-js-sdk/lib/models/typed-event-emitter";

const client: MatrixClient = sdk.createClient({
  baseUrl: applicationConfig.matrix.homeServerUrl,
  accessToken: 'syt_cGFpbg_NPQVyQpYEtaGNrvXjmFU_0CZBKV'
});

async function onInit() {
  console.log(process.env);

  // await client
  //   // .login("m.login.token", {
  //   //   token: 'syt_cGVwcGVyX3Jvbmk_otsCXPiDXzzqDUVEUpnc_2k2E78'
  //   // })
  //   .then((data) => {
      startListening();

    //   localStorage.setItem("access_token", data.access_token);
    // });
  await client.startClient({ initialSyncLimit: 10 });
}

export function startListening() {
  client.on(RoomEvent.Timeline, function (event) {
    if (event.getType() !== "m.room.message") {
      return; // only use messages
    }
    console.log(
      event.sender.userId,
      ": =>",
      event.event.content!.body,
      "in the room",
      event.sender.roomId
    );
  });
}

async function createRoom(chatRoomPayload: {
  name: string;
  description: string;
}) {
  return client!.createRoom(chatRoomPayload);
}

async function sendMessage(roomId: string, message: string) {
  var content = {
    body: message,
    msgtype: "m.text",
  };
  const messageEvent = await client.sendEvent(
    roomId,
    "m.room.message",
    content
  );
  return messageEvent;
}
export function getMessages(roomId: string) {
  console.log(roomId, 'ddd');
  const messages: any[] = [];
  const users: any[] = [];
  const data = client.getRoom(roomId)?.timeline.forEach((t) => {
    console.log(t, 'dd');
    if (t.event.type === "m.room.message") messages.push(t.event);
    else if (t.event.type === "m.room.member") users.push(t.event);
  });
  return { messages, users };
}

export function getData() {
  const data = client;
}

export { sendMessage, createRoom, onInit };
