export type getResponseType = {
    info: Info;
    data: Data[];
};

export type Data = {
    _id: string;
    name: string;
    description: string;
    image: string;
};
export type Info = {
    total: number;
    page: number;
    limit: number;
    next: string;
    prev: string;
};
