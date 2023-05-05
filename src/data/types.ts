export type node = {
    name: string;
}

export type  relation = {
    name: string;
    domain: node;
    range: node;
}