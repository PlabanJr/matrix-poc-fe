import { useEffect, useState } from "react";
import { onInit } from "./api/matrix";

export default function Home() {
  onInit();
  useEffect(() => {
    // service.sendMessage("!ielVhbjhuurTVrpCXh:matrix.org", "hello new message");
    // service.createRoom({ name: "new world", description: "hello" });
  }, []);

  return <></>;
}
