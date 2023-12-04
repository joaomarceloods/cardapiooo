import { connectDatabase } from '@/database/connect'
import { Menu } from '@/database/model'
import formatMoney from '@/lib/formatMoney'
import { EllipsisOutlined } from '@ant-design/icons'
import mongoose from 'mongoose'
import Image from 'next/image'
import { FC } from 'react'
import styles from './page.module.css'

const empty = (s: string) => s.replace(/\s\n/, '').length === 0

const reduceItems = (items: any[], i: any) => {
  if (i.type !== 'product') return items
  if (empty(i.data.title)) return items
  if (!i.data.price) return items
  return [...items, i]
}

const reduceSections = (sections: any[], s: any) => {
  if (empty(s.title)) return sections
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

  const divider = <div className={styles.divider} />

  return (
    <div className={styles.menu}>
      <h1 className={styles.menuTitle}>{menu.title}</h1>
      <div className={styles.divider} />
      {menu.sections.length > 1 && (
        <div className={styles.sectionBarContainer}>
          <div className={styles.sectionBar}>
            {menu.sections.map((section: any) => (
              <a key={section._id} href={`#${section._id}`}>
                {section.title}
              </a>
            ))}
          </div>
          <div className={styles.divider} />
        </div>
      )}
      {menu.sections.length === 0 && <div>This menu is empty</div>}
      {menu.sections.map((section: any) => (
        <div key={section._id} id={section._id} className={styles.sectionContainer}>
          <div>
            <h2 className={styles.sectionTitle}>{section.title}</h2>
            <div className={styles.divider} />
          </div>

          {section.items.length === 0 && <div>This section is empty</div>}

          {section.items.map((i: any) => {
            return (
              <div key={i._id}>
                <div className={styles.itemContainer}>
                  <div className={styles.itemCopyContainer}>
                    <div className={styles.itemTitleContainer}>
                      <h3 className={styles.itemTitle}>{i.data.title}</h3>
                      <div className={styles.itemPrice}>
                        {i.data.price && formatMoney(i.data.price)}
                      </div>
                    </div>
                    {i.data.description && (
                      <div className={styles.itemDescription}>
                        {i.data.description}
                      </div>
                    )}
                  </div>
                  <div className={styles.itemPhotoContainer}>
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

                <div className={styles.divider} />
              </div>
            )
          })}
        </div>
      ))}
      <div className={styles.menuBottom} />
    </div>
  )
}

export default Page
