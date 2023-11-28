'use client'

import StyledComponentsRegistry from '@/lib/AntdRegistry'
import { ClerkProvider, UserButton } from '@clerk/nextjs'
import { ConfigProvider, Flex, Layout, Typography } from 'antd'
import { FC, PropsWithChildren } from 'react'

const LayoutClient: FC<PropsWithChildren> = ({ children }) => {
  return (
    <StyledComponentsRegistry>
      <ClerkProvider>
        <ConfigProvider>
          <Layout>
            <Layout.Header>
              <Flex
                justify="space-between"
                align="center"
                style={{ height: '100%' }}
              >
                <Typography.Text style={{ color: 'white' }}>
                  Cardapiooo
                </Typography.Text>
                <UserButton afterSignOutUrl="/" />
              </Flex>
            </Layout.Header>
            <Layout.Content>{children}</Layout.Content>
          </Layout>
        </ConfigProvider>
      </ClerkProvider>
    </StyledComponentsRegistry>
  )
}

export default LayoutClient
