import { useState } from "react";

export default function useLoadingStatus() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // messages
  const [message, setMessage] = useState<string>("");
  const [error, setError] = useState<string>("");

  const startLoading = () => setIsLoading(true);

  const stopLoading = () => setIsLoading(false);

  return {
    isLoading,
    startLoading,
    stopLoading,
    message,
    setMessage,
    error,
    setError,
  };
}
