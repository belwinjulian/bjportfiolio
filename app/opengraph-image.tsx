import { ImageResponse } from 'next/og'

export const alt = 'Belwin Julian - Full Stack Developer'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 72,
          background: 'linear-gradient(to bottom right, #0a0a0a, #18181b)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#ededed',
        }}
      >
        <div style={{ fontWeight: 'bold' }}>Belwin Julian</div>
        <div style={{ fontSize: 36, marginTop: 20, color: '#a1a1aa' }}>
          Full Stack Developer
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
