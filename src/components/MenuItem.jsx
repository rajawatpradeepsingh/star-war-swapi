import { Heading } from '@chakra-ui/react'
import Link from 'next/link'
import React from 'react'

export default function MenuItem({title,address,color}) {
  return (
   <Link href={address} >
    <Heading size="md" color={color}>{title}</Heading>
   </Link>
  )
}
