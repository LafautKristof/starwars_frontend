import Image from "next/image";
import { notFound } from "next/navigation";

type Data = {
    _id: string;
    name: string;
    description?: string;
    image: string;
};

const allowedTypes = [
    "characters",
    "vehicles",
    "droids",
    "locations",
    "species",
    "creatures",
];

export default async function DetailPage({
    params,
}: {
    params: { type: string; id: string };
}) {
    const { type, id } = params;

    if (!allowedTypes.includes(type)) return notFound();

    const res = await fetch(`${process.env.MY_LARAVEL}/${type}/${id}`, {
        next: { revalidate: 60 },
    });

    if (!res.ok) return notFound();

    const data: Data = await res.json();

    return (
        <div className="flex flex-col items-center p-6 text-white">
            <div className="relative w-64 h-64 rounded-lg overflow-hidden shadow-lg">
                <Image
                    src={data.image}
                    alt={data.name}
                    fill
                    className="object-cover"
                />
            </div>
            <h1 className="mt-4 text-3xl font-orbitron">{data.name}</h1>
            {data.description && (
                <p className="mt-2 text-center max-w-prose">
                    {data.description}
                </p>
            )}
        </div>
    );
}
