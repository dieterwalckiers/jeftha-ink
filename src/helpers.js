export const byPosition = (edge1, edge2) => {
    const { node: { position: p1 } } = edge1;
    const { node: { position: p2 } } = edge2;
    if (p1 === undefined) {
        return -1;
    }
    if (p2 === undefined) {
        return 1;
    }
    return p2 - p1;
}