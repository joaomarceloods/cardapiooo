import { connectDatabase } from '@/database/connect'
import { Menu } from '@/database/model'
import formatMoney from '@/lib/formatMoney'
import { EllipsisOutlined } from '@ant-design/icons'
import mongoose from 'mongoose'
import Image from 'next/image'
import { FC } from 'react'

const empty = (s: string) => s.replace(/\s\n/, '').length === 0

const reduceItems = (items: any[], i: any) => {
  if (i.type !== 'product') return items
  if (empty(i.data.title)) return items
  if (!i.data.price) return items
  return [...items, i]
}

const reduceSections = (sections: any[], s: any) => {
  // if (empty(s.title)) return sections
  const items = s.items.reduce(reduceItems, [])
  if (items.length === 0) return sections
  return [...sections, { ...s, items }]
}

const cleanup = (menu: any) => {
  return {
    ...menu,
    sections: menu.sections.reduce(reduceSections, []),
  }
}

const Page: FC<{ params: { id: string } }> = async ({ params: { id } }) => {
  await connectDatabase()

  const rawMenu = await Menu.findOne({
    _id: new mongoose.Types.ObjectId(id),
    visible: true,
  }).lean()

  const menu = cleanup(rawMenu)

  const divider = (
    <div style={{ height: 1, background: 'whitesmoke', marginLeft: 16 }} />
  )

  return (
    <div>
      <h1
        style={{
          paddingInline: 16,
          paddingBlock: 64,
          margin: 0,
          fontSize: '2rem',
          textAlign: 'center',
        }}
      >
        {menu.title}
      </h1>
      {divider}
      {menu.sections.length === 0 && <div>This menu is empty</div>}
      {menu.sections.map((section: any) => (
        <div key={section._id}>
          <div>
            <h2
              style={{
                fontSize: '1.2rem',
                paddingInline: 16,
                paddingBlock: 8,
                fontWeight: 'bold',
                margin: 0,
              }}
            >
              {section.title}
            </h2>
            {divider}
          </div>

          {section.items.length === 0 && <div>This section is empty</div>}

          {section.items.map((i: any) => {
            return (
              <div key={i._id}>
                <div
                  style={{
                    display: 'flex',
                    paddingBlock: 8,
                    paddingInline: 16,
                    gap: 16,
                  }}
                >
                  <div
                    style={{
                      flex: 1,
                      gap: 8,
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    <div
                      style={{
                        gap: 16,
                        display: 'flex',
                        justifyContent: 'space-between',
                      }}
                    >
                      <h3
                        style={{
                          margin: 0,
                          fontSize: '1rem',
                          fontWeight: 'normal',
                        }}
                      >
                        {i.data.title}
                      </h3>
                      <div style={{ fontWeight: 'normal' }}>
                        {i.data.price && formatMoney(i.data.price)}
                      </div>
                    </div>
                    {i.data.description && (
                      <div
                        style={{
                          margin: 0,
                          color: 'gray',
                          fontSize: '0.8rem',
                        }}
                      >
                        {i.data.description}
                      </div>
                    )}
                  </div>

                  <div
                    style={{
                      position: 'relative',
                      width: 80,
                      height: 60,
                      background: 'whitesmoke',
                      borderRadius: 4,
                      overflow: 'hidden',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      fontSize: '2rem',
                      color: 'lightgray',
                    }}
                  >
                    <EllipsisOutlined />
                    {i.data.photo && (
                      <Image
                        src={i.data.photo}
                        alt={i.data.title}
                        fill={true}
                        objectFit="fit"
                        sizes="80px"
                      />
                    )}
                  </div>
                </div>
                {divider}
              </div>
            )
          })}
        </div>
      ))}
      <div style={{ height: 120 }} />
    </div>
  )
}

export default Page
