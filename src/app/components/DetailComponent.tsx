import Image from "next/image";
import Link from "next/link";

type Data = {
    _id: string;
    name: string;
    image: string;
};
type Props = {
    data: Data;
    type: string;
};

const DetailComponent = ({ data, type }: Props) => {
    return (
        <Link href={`/content/${type}/${data._id}`}>
            <div className="w-full aspect-square relative overflow-hidden rounded-lg shadow">
                <Image
                    src={data.image}
                    alt={data.name}
                    fill
                    className="object-cover"
                />
            </div>
            <p className="mt-2 text-center text-white font-bold">{data.name}</p>
        </Link>
    );
};

export default DetailComponent;
