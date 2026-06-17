import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          background: "#f8fafc",
          color: "#18181b",
          display: "flex",
          height: "100%",
          justifyContent: "center",
          padding: "64px",
          width: "100%",
        }}
      >
        <div
          style={{
            alignItems: "flex-start",
            background: "white",
            border: "2px solid #dc2626",
            display: "flex",
            flexDirection: "column",
            gap: "28px",
            padding: "56px",
            width: "100%",
          }}
        >
          <div
            style={{
              color: "#dc2626",
              fontSize: 34,
              fontWeight: 700,
              letterSpacing: 0,
            }}
          >
            RedCanvas
          </div>
          <div
            style={{
              fontSize: 82,
              fontWeight: 800,
              letterSpacing: 0,
              lineHeight: 1,
            }}
          >
            Threads und Pixel-Place
          </div>
          <div
            style={{
              color: "#52525b",
              fontSize: 32,
              lineHeight: 1.25,
            }}
          >
            Ein anonymes Community-Board mit gesicherten Anzeigenamen und
            gemeinsamer Pixel-Leinwand.
          </div>
        </div>
      </div>
    ),
    size
  );
}
