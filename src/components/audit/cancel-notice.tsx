"use client";

import { useEffect, useState } from "react";

export function CancelNotice() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const cancelled =
      new URLSearchParams(window.location.search).get("checkout") === "cancelled";
    setShow(cancelled);
  }, []);

  if (!show) return null;

  return (
    <div className="audit-notice" role="status">
      <p>No charge was made. The Audit is here whenever you’re ready.</p>
    </div>
  );
}
