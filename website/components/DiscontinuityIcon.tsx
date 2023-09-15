import Image from 'next/image'

export interface IconProps {
  width?: number
  height?: number
}

export const ColorIcon = ({ width = 24, height = 24 }: IconProps) => (
  <div>
    <Image
      priority
      src="/static/images/icon.svg"
      height={height}
      width={width}
      alt="Discontinuity AI Logo"
    />
  </div>
)