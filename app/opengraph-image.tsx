import { ImageResponse } from "next/og"

export const runtime = "edge"

export const alt = "Neural Nexus - Where AI Research Meets Real-World Innovation"
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = "image/png"

export default async function Image() {
  return new ImageResponse(
    <div
      style={{
        fontSize: 48,
        background: "#2D3047",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "#F5F5F5",
        padding: 40,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: 40,
        }}
      >
        <div
          style={{
            width: 80,
            height: 80,
            background: "#1B998B",
            borderRadius: 8,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginRight: 20,
            color: "white",
            fontWeight: "bold",
            fontSize: 36,
          }}
        >
          NN
        </div>
        <h1
          style={{
            fontSize: 72,
            fontWeight: "bold",
            margin: 0,
          }}
        >
          Neural Nexus
        </h1>
      </div>
      <p
        style={{
          fontSize: 36,
          color: "#1B998B",
          margin: 0,
          marginBottom: 40,
        }}
      >
        Where AI Research Meets Real-World Innovation
      </p>
      <div
        style={{
          fontSize: 28,
          opacity: 0.8,
        }}
      >
        AbdElKader Seif El Islem RAHMANI
      </div>
      <div
        style={{
          fontSize: 24,
          opacity: 0.7,
          marginTop: 10,
        }}
      >
        PhD Researcher • Deep Learning Engineer • Full-Stack AI Innovator
      </div>
    </div>,
    {
      ...size,
    },
  )
}
