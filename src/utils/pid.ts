export const idToPid = ( id:string ) => {
    return `INC23-${id?.padStart(4, '0').toString()}`;
};

export const pidToId = ( pid:string ) => {
    return parseInt(pid?.split("-")[1]).toString();
};