import { ImageResponse } from "next/og";

export const ogSize = {
  width: 1200,
  height: 630,
};
export const ogContentType = "image/png";


export async function createOgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          overflow: "hidden",
          background:
            "radial-gradient(circle at 18% 18%, rgba(0,229,255,0.18) 0%, rgba(0,229,255,0.04) 24%, rgba(14,14,14,0) 42%), radial-gradient(circle at 82% 78%, rgba(0,229,255,0.1) 0%, rgba(0,229,255,0.02) 22%, rgba(14,14,14,0) 40%), linear-gradient(180deg, #091017 0%, #0d1117 48%, #0a0d12 100%)",
          color: "#ffffff",
          fontFamily:
            '"Noto Sans TC", "PingFang TC", "Microsoft JhengHei", Arial, sans-serif',
        }}
      >
        <div
          style={{
            position: "absolute",
            width: '100%',
            height: '100%',
            inset: "32px",
            display: "flex",
            flexDirection: "column",
            border: "1px solid rgba(255,255,255,0.08)",
            background: "rgba(255,255,255,0.03)",
            boxShadow: "0 24px 80px rgba(0,0,0,0.28)",
            overflow: "hidden",
          }}
        >

            <div
              style={{
                position: "absolute",
                right: "-300px",
                bottom: "-400px",
                width: "1000px",
                height: "1000px",
                borderRadius: "999px",
                background: "rgba(0,229,255,0.05)",
              }}
            />

            <div
              style={{
                position: "absolute",
                inset: "0",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 1,
                width: '100%',
                height: '100%',
              }}
            >

                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-end",
                    fontSize: "184px",
                    fontWeight: 800,
                    lineHeight: 0.9,
                    letterSpacing: "-0.08em",
                    color: "#f8fbff",
                  }}
              >
                yoga
                <div
                    style={{
                      display: "flex",
                      width: "34px",
                      height: "34px",
                      marginBottom: "14px",
                      borderRadius: "999px",
                      background: "#00E5FF",
                      boxShadow: "0 0 24px rgba(0,229,255,0.7)",
                      flexShrink: 0,
                      margin: "0 18px 0 32px",
                    }}
                  />
                dev

              </div>
            </div>
        </div>
      </div>
    ),
    ogSize
  );
}
