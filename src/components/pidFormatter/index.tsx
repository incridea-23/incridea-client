import { FC } from 'react';

export const idToPid: FC<
    {
        id: string;
    }
>= ({ id }) => {
    return <>
        {`INC23-${id?.padStart(4, '0').toString()}`}
    </>;
};

export const pidToId: FC<
    {
        pid: string;
    }
>= ({ pid }) => {
    return <>
        {parseInt(pid?.split("-")[1]).toString()}
    </>;
};