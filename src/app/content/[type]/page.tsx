import { notFound } from "next/navigation";
import DetailComponent from "@/app/components/DetailComponent";
import { Data } from "../../type";

const allowedTypes = [
    "characters",
    "vehicles",
    "droids",
    "locations",
    "species",
    "creatures",
];

export default async function ContentPage({
    params,
}: {
    params: { type: string };
}) {
    const { type } = await params;

    if (!allowedTypes.includes(type)) {
        return notFound(); // onbekend type = 404
    }

    const res = await fetch(`${process.env.MY_LARAVEL}/${type}`, {
        cache: "force-cache",
    });

    if (!res.ok) {
        return notFound();
    }

    const data: Data[] = await res.json();

    return (
        <div className="grid portrait:grid-cols-2 landscape:grid-cols-4 gap-4 p-4">
            {data.map((item) => (
                <DetailComponent key={item._id} data={item} type={type} />
            ))}
        </div>
    );
}
