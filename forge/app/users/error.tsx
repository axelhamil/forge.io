"use client";
import { ReactElement, useEffect } from "react";

function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}): ReactElement {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div>
      <h2>Something went wrong!</h2>
      <button onClick={() => reset()}>Try again</button>
      <p>{error.message}</p>
    </div>
  );
}

export default Error;
