import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

const ButtonKey = ({ children }: Props) => {
  return (
    <span
      style={{
        border: '1px solid white',
        paddingBlock: 4,
        paddingInline: 8,
        borderRadius: 4,
        marginInline: 4,
      }}
    >
      {children}
    </span>
  )
}

export default ButtonKey
