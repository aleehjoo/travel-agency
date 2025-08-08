import {Header} from "../../../components";
import {ComboBoxComponent} from "@syncfusion/ej2-react-dropdowns";
import type { Route } from './+types/create-trip';

interface Country {
    name: string;
    coordinates: number[];
    value: string;
    openStreetMap?: string;
}

export const loader = async (): Promise<Country[]> => {
    const response = await fetch('https://restcountries.com/v3.1/all?fields=flag,name,latlng,maps');
    const data = await response.json();

    return data.map((country: any) => ({
        name: country.flag + country.name.common,
        coordinates: country.latlng,
        value: country.name.common,
        openStreetMap: country.maps?.openStreetMap,
    }))
}

const CreateTrip = ({ loaderData }: Route.ComponentProps) => {
    const handleSubmit = async () => {};
    const handleChange = () => {
        (key: keyof TripFormData, value: string | number) => {

        }
    }
    const countries = loaderData as Country[];

    const countryData = countries.map((country) => ({
        text: country.name,
        value: country.value
    }))

    return (
        <main className="flex flex-col gap-10 pb-20 wrapper">
            <Header title="Add a new trip" description="View and edit AI-generated travel plans" />
            <section className="mt-2.5 wrapper-md">
                <form className="trip-form" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="country">
                            Country
                        </label>
                        <ComboBoxComponent
                            id="country"
                            dataSource={countryData}
                            fields={{text: 'text', value: 'value'}}
                            placeholder="Select a country"
                            className="combo-box"
                            change={(e: {value: string | undefined}) => {
                                if(e.value) {
                                    handleChange('country', e.value)
                                }
                            }}
                            allowFiltering
                            filtering={(e) => {
                                const query = e.text.toLowerCase();

                                e.updateData(
                                    countries.filter((country) =>
                                    country.name.toLowerCase().includes(query)).map(((country) => ({
                                        text: country.name,
                                        value: country.value,
                                    })))
                                )
                            }}
                        />
                    </div>

                    <div>
                        <label htmlFor="duration">Duration</label>
                        <input
                            id="duration"
                            name="duration"
                            placeholder="Enter number of days (3, 7, ...)"
                            className="form-input placeholder:text-gray-100"
                            onChange={(e) => handleChange(key: "duration", Number(e.target.value))}
                        />
                    </div>
                </form>
            </section>
        </main>
    )
}
export default CreateTrip
