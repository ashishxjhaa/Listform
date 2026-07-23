import Image from "next/image"

interface LogoProps {
  className?: string
}

const Logo = ({ className }: LogoProps) => {
  return (
    <Image
      src="/listform.svg"
      alt="Listform"
      width={140}
      height={32}
      priority
      className={className}
    />
  )
}

export default Logo
