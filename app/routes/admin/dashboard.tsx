import React from 'react'
import {Header, StatsCard, TripCard} from "../../../components";

const Dashboard = () => {
    const user = { name: 'Alejandro'}
    const dashboardStats = {
        totalUsers: 12423,
        usersJoined: {
            currentMonth: 215, lastMonth: 138
        },
        totalTrips: 3452,
        tripsCreated: {
            currentMonth: 170, lastMonth: 244
        },
        userRole: {
            total: 55, currentMonth: 20, lastMonth: 17
        }
    }

    const {totalUsers, usersJoined, totalTrips, tripsCreated, userRole} = dashboardStats;

    return (
        <main className="dashboard wrapper">
            <Header
                title={`Welcome ${user?.name ?? 'Guest'} 👋`}
                description={"Track activity, trends and popular destinations in real time"}
            />

            <section className="flex flex-col gap-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gaps-6 w-full">
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
                        headerTitle="Active Users"
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
