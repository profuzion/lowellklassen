import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { ImageResponse } from "next/og";

export const alt = "See your brand clearly. The Brand Clarity Audit, $27 CAD.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const [glory, cover, portrait] = await Promise.all([
    readFile(join(process.cwd(), "public/fonts/glory-culture-alt.ttf")),
    readFile(join(process.cwd(), "public/audit/cover.png")),
    readFile(join(process.cwd(), "public/brand/lowell-profile.png")),
  ]);
  const coverSrc = `data:image/png;base64,${cover.toString("base64")}`;
  const portraitSrc = `data:image/png;base64,${portrait.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#161616",
          color: "#f4f2ed",
        }}
      >
        <div
          style={{
            width: "720px",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "68px 64px",
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
              fontSize: 84,
              lineHeight: 0.88,
              textTransform: "uppercase",
            }}
          >
            <div>See your brand</div>
            <div style={{ color: "#ffc82c" }}>clearly.</div>
          </div>
          <div style={{ display: "flex", fontSize: 26, color: "#c7c7c7" }}>
            The Brand Clarity Audit · $27 CAD
          </div>
        </div>
        <div
          style={{
            width: "480px",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            paddingRight: "56px",
          }}
        >
          <img
            src={coverSrc}
            width={390}
            height={505}
            alt=""
            style={{
              objectFit: "cover",
              objectPosition: "top",
              boxShadow: "0 24px 50px rgba(0,0,0,0.45)",
            }}
          />
        </div>
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
