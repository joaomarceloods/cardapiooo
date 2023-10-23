import MenuEditor from '@/components/menu-editor/menu-editor';
import { MenuEditorState } from '@/components/menu-editor/provider/types';
import { MongoClient } from 'mongodb';

export default async function Home() {
  const menuProps = await getMenuProps()

  return <MenuEditor menuProps={menuProps} />
}

async function getMenuProps() {
  const uri = process.env.MONGODB_URI

  if (uri === undefined) {
    throw new Error('MONGODB_URI is undefined')
  }

  const client = new MongoClient(uri);

  try {
    const database = client.db('FirstDB');
    const menus = database.collection<MenuEditorState.Menu>('boards');

    const query = {};
    const menu = await menus.findOne(query);

    console.log(menu);

    if (menu === null) {
      throw new Error('menu is null')
    }

    return menu
  } finally {
    await client.close();
  }
}
