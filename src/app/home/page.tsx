'use server';
import { redirect } from 'next/navigation'
import { sendItToSignup } from '@/auth/tokencheckServer';
const Dashboard = async() => {
    await sendItToSignup()
    redirect("/home/dashboard")
}
export default Dashboard