'use client'

import StyledComponentsRegistry from '@/lib/AntdRegistry'
import { ClerkProvider, UserButton } from '@clerk/nextjs'
import { ConfigProvider, Flex, Layout, Typography, theme } from 'antd'
import Link from 'next/link'
import { FC, PropsWithChildren } from 'react'

const LayoutClient: FC<PropsWithChildren> = ({ children }) => {
  const { token } = theme.useToken()

  return (
    <StyledComponentsRegistry>
      <ClerkProvider>
        <ConfigProvider>
          <Layout>
            <Layout.Header style={{ padding: token.margin }}>
              <Flex
                justify="space-between"
                align="center"
                style={{
                  height: '100%',
                  maxWidth: token.screenLG,
                  margin: '0 auto',
                }}
              >
                <Link href="/admin">
                  <Typography.Text style={{ color: 'white' }}>
                    Cardapiooo
                  </Typography.Text>
                </Link>
                <UserButton afterSignOutUrl="/" />
              </Flex>
            </Layout.Header>
            <Layout.Content style={{ background: token.colorBgBase }}>
              <div style={{ maxWidth: token.screenLG, margin: '0 auto' }}>
                {children}
              </div>
            </Layout.Content>
          </Layout>
        </ConfigProvider>
      </ClerkProvider>
    </StyledComponentsRegistry>
  )
}

export default LayoutClient
