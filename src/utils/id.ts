export const idToPid = ( id:string ) => {
    return `INC23-${id?.padStart(4, '0').toString()}`;
};

export const pidToId = ( pid:string ) => {
    return parseInt(pid?.split("-")[1]).toString();
};

export const idToTeamId = ( id:string ) => {
    return `T23-${id?.padStart(5, '0').toString()}`;
}

export const teamIdToId = ( teamId:string ) => {
    return parseInt(teamId?.split("-")[1]).toString();
}