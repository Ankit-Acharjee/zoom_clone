"use client";
import {
  DeviceSettings,
  VideoPreview,
  useCall,
} from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import "@stream-io/video-react-sdk/dist/css/styles.css";

const MeetingSetup = ({
  setIsSetupComplete,
}: {
  setIsSetupComplete: (value: boolean) => void;
}) => {
  const [isMicCamtoggledOn, setIsMicCamtoggledOn] = useState(false);
  const call = useCall();

  if (!call) {
    throw new Error("useCall must be used within StreamCall component");
  }
  

  useEffect(() => {
    // console.log('invoked')
    if (isMicCamtoggledOn) {
      call?.camera.disable();
      call?.microphone.disable();
      
    } else {
      call?.camera.enable();
      call?.microphone.enable();
    }
  }, [isMicCamtoggledOn, call?.camera, call?.microphone]);
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-3 text-white">
      <h1 className="text-2xl font-bold">Setup</h1>
      <VideoPreview />
      <div className="flex h-16 items-center justify-center gap-3">
        <label className="flex items-center justify-center gap-2 font-medium">
          <input
            type="checkbox"
            checked={isMicCamtoggledOn}
            onChange={(e) => setIsMicCamtoggledOn(e.target.checked)}
          />
          Join with mic and camera turned off
        </label>
        <DeviceSettings />
        <Button
          className="rounded-md bg-green-500 px-4 py-2.5"
          onClick={() => {
            call.join();

            setIsSetupComplete(true);
          }}
        >
          Join Meeting
        </Button>
      </div>
    </div>
  );
};

export default MeetingSetup;
