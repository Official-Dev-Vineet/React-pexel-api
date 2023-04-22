import React, { useEffect, useState } from "react";

const OnlineStatus = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  useEffect(() => {
    const handleStatusChange = () => {
      setIsOnline(navigator.onLine);
    };
    // Listen to the online status
    window.addEventListener("online", handleStatusChange);

    // Listen to the offline status
    window.addEventListener("offline", handleStatusChange);

    // Specify how to clean up after this effect for performance improvement
    return () => {
      window.removeEventListener("online", handleStatusChange);
      window.removeEventListener("offline", handleStatusChange);
    };
  }, [isOnline]);
  return <div>{isOnline ? "online" : "offline"}</div>;
};

export default OnlineStatus;
