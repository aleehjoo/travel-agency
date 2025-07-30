import React from 'react'
import {Header, StatsCard, TripCard} from "../../../components";

const Dashboard = () => {
    //placeholder name
    const user = { name: 'Alejandro'}
    //placeholder statistics
    const dashboardStats = {
        totalUsers: 4236,
        usersJoined: {
            currentMonth: 150,
            lastMonth: 211
        },
        totalTrips: 4235,
        tripsCreated: {
            currentMonth: 115,
            lastMonth: 235
        },
        userRole: {
            total: 67,
            currentMonth: 27,
            lastMonth: 19
        }
    }

    const { totalUsers, usersJoined, totalTrips, tripsCreated, userRole } = dashboardStats;

    return (
        <main className="dashboard wrapper">
            <Header
                title={`Welcome ${user?.name ?? 'Guest'} 👋`}
                description={"Track activity, trends and popular destinations in real time"}
            />

            <section className="flex flex-col gap-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                    <StatsCard
                        headerTitle="Total Users"
                        total={totalUsers}
                        currentMonthCount={usersJoined.currentMonth}
                        lastMonthCount={usersJoined.lastMonth}
                    />
                    <StatsCard
                        headerTitle="Total Trips"
                        total={totalTrips}
                        currentMonthCount={tripsCreated.currentMonth}
                        lastMonthCount={tripsCreated.lastMonth}
                    />
                    <StatsCard
                        headerTitle="Total Users"
                        total={userRole.total}
                        currentMonthCount={userRole.currentMonth}
                        lastMonthCount={userRole.lastMonth}
                    />
                </div>
            </section>

            <TripCard />
        </main>
    )
}
export default Dashboard
