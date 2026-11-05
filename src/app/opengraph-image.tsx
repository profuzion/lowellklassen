import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { ImageResponse } from "next/og";

export const alt = "Lowell Klassen. Branding and website design, redefined.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const [glory, portrait] = await Promise.all([
    readFile(join(process.cwd(), "public/fonts/glory-culture-alt.ttf")),
    readFile(join(process.cwd(), "public/brand/lowell-profile.png")),
  ]);
  const portraitSrc = `data:image/png;base64,${portrait.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#161616",
          color: "#f4f2ed",
          padding: "72px",
        }}
      >
        <img
          src={portraitSrc}
          width={112}
          height={112}
          alt=""
          style={{ borderRadius: 56, objectFit: "cover" }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontFamily: "Glory Culture Alt",
            fontSize: 92,
            lineHeight: 0.9,
            textTransform: "uppercase",
          }}
        >
          <div>Branding & website design</div>
          <div style={{ color: "#ffc82c" }}>Redefined.</div>
        </div>
        <div style={{ fontSize: 28, color: "#c7c7c7" }}>Hi, I’m Lowell Klassen.</div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Glory Culture Alt",
          data: glory,
          style: "normal",
          weight: 400,
        },
      ],
    },
  );
}
