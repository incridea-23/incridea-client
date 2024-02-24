export const idToPid = ( id:string ) => {
    return `INC24-${id?.padStart(4, '0').toString()}`;
};

export const pidToId = ( pid:string ) => {
    return pid.startsWith("INC24")?parseInt(pid?.split("-")[1]).toString():"";
};

export const idToTeamId = ( id:string ) => {
    return `T24-${id?.padStart(5, '0').toString()}`;
}

export const teamIdToId = ( teamId:string ) => {
    return parseInt(teamId?.split("-")[1]).toString();
}