import type {LoaderFunctionArgs} from "react-router";
import {getTripById} from "~/appwrite/trips";
import type { Route } from './+types/trip-detail';
import {parseTripData} from "~/lib/utils";
import {Header} from "../../../components";

export const loader = async ({ params }: LoaderFunctionArgs) => {
    const { tripId } = params;

    if(!tripId) throw new Error('Trip ID is required');

    const trip = await getTripById(tripId);

    return trip;
}

const TripDetail = ({ loaderData }: Route.ComponentProps) => {
    const tripData = parseTripData(loaderData?.trip);

    const { name } = tripData || {};

    return (
        <main className="trip-detail wrapper">
            <Header title="Trip Detail" description={`View and edit ${name} trip`} />

        </main>
    )
}
export default TripDetail
