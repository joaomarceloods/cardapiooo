import { BusinessUser } from '@/database/model'
import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import { submit } from './actions'

const Page = async () => {
  const { userId } = auth()
  const businessUser = await BusinessUser.findOne({ user: userId }).exec()

  if (businessUser) {
    redirect(`/admin/business/${businessUser.business}`)
  }

  return (
    <form action={submit}>
      <h1>Before we start&hellip;</h1>
      <label htmlFor="title">
        What is the name of your restaurant or bar?
      </label>
      <input type="text" name="title" />
    </form>
  )
}

export default Page
