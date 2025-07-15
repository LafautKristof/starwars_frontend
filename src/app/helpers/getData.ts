import { getResponseType } from "../type";

const getData = async () => {
    const baseUrl = process.env.STAR_WARS_URL;
    const apiLaravel = process.env.MY_LARAVEL;

    const endpoints = [
        { source: "characters", target: "characters", total: 964 },
        {
            source: "creatures",
            target: "creatures",
            total: 75,
        },
        { source: "droids", target: "droids", total: 60 },
        {
            source: "locations",
            target: "locations",
            total: 326,
        },
        { source: "organizations", target: "organizations", total: 135 },
        { source: "species", target: "species", total: 82 },
        { source: "vehicles", target: "vehicles", total: 267 },
    ];

    const importAll = async () => {
        for (const { source, target, total } of endpoints) {
            console.log(`Ophalen van source ${source}`);
            try {
                const res = await fetch(
                    `${baseUrl}/${source}?page=1&limit=${total}`
                );
                const data: getResponseType = await res.json();
                // console.log(data);
                for (const item of data.data) {
                    //console.log(data.data);
                    try {
                        const postRes = await fetch(`${apiLaravel}/${target}`, {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify(item),
                        });
                        console.log(`${apiLaravel}/${target}`);

                        if (!postRes.ok) {
                            console.warn(
                                `Item ${item._id} niet opgeslagen (status ${postRes.status})`
                            );
                        } else {
                            console.log(
                                `Item ${item._id} succesvol opgeslagen`
                            );
                        }
                    } catch (error) {
                        console.error(`Fout bij item ${item._id}:`, error);
                    }
                }
            } catch (error) {
                console.error(`Fout bij source ${source}:`, error);
            }
        }
    };
    importAll();
    console.log("alles verwerkt");
};
export default getData;
