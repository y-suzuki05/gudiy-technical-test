import Head from 'next/head'
import React from 'react'
import styled from 'styled-components'

type LayoutProps = {
  children: React.ReactNode
}

const StyledLayout = styled.div`
  display: flex;
  justify-content: center;
  background: #e3d7ff;
  width: 80%;
  height: 100%;
  padding: 30px;
  margin: 50px auto 50px;

  /* SP */
  @media (max-width: 768px) {
    width: 100%;
    margin: 0;
  }
`

export const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Head>
        <title>weather-app</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <StyledLayout>{children}</StyledLayout>
    </>
  )
}
