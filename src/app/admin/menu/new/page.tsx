import { submit } from './actions'

const Page = async () => {
  return (
    <form action={submit}>
      <h1>Let&apos;s create a new menu</h1>
      <label htmlFor="title">How would you like to name the menu?</label>
      <input type="text" name="title" />
      <input type="submit" />
    </form>
  )
}

export default Page
