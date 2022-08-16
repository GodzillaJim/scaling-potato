import { Server } from "socket.io";
import { ClientChanges } from "../../../../types/editor";
import { ChangeSet, Text } from "@codemirror/state";
import { Update } from "@codemirror/collab";
import { DefaultEventsMap } from "socket.io/dist/typed-events";

export default class DocumentAuthority {
  doc: Text;
  private readonly updates: Update[] = [];

  constructor(initDoc: string[] = [""], newUpdates?: Update[]) {
    this.doc = Text.of(initDoc);
    if (newUpdates) this.updates = newUpdates;
  }

  public receiveUpdates(
    changes: ClientChanges,
    socket: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>,
    roomId: string
  ) {
    if (this.getUpdates().length === changes.version) {
      changes.updates.forEach((update) => {
        const deserializedUpdate = ChangeSet.fromJSON(update.updateJSON);
        this.updates.push({
          changes: deserializedUpdate,
          clientID: update.clientID,
        });
        this.doc = deserializedUpdate.apply(this.doc);
      });
      this.sendUpdates(changes, socket, roomId);
    } else {
      console.log("Version mismatch!");
    }
  }

  sendUpdates(changes: ClientChanges, socket: Server, roomId: string) {
    socket.to(roomId).emit("serverUpdates", { room: roomId, ...changes });
  }

  getUpdates() {
    return this.updates;
  }
}
