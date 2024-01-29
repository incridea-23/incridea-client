import {
  RegisterProniteDocument,
  UserByIdDocument,
} from '@/src/generated/generated';
import { pidToId } from '@/src/utils/id';
import { useMutation, useQuery } from '@apollo/client';
import Button from '../button';
import Spinner from '../spinner';
import { useEffect, useState } from 'react';

function Pronite({
  pId,
  stopCamera,
  startCamera,
  clearScanResults
}: {
  pId: string;
  stopCamera: () => void;
  startCamera: () => void;
  clearScanResults: () => void;
}) {
  const [cameraOn, setCameraOn] = useState(true);
  const [registerPronite, { data, loading, error }] = useMutation(
    RegisterProniteDocument,
    {
      variables: {
        userId: pidToId(pId),
      },
    }
  );

  const { data: userData, loading: userLoading } = useQuery(UserByIdDocument, {
    variables: {
      id: pidToId(pId),
    },
  });

  useEffect(() => {
    if (
      data?.registerPronite.__typename === 'MutationRegisterProniteSuccess' ||
      data?.registerPronite.__typename === 'Error'
    ) {
      stopCamera();
      setCameraOn(false);
    }
  }, [data, stopCamera]);

  return (
    <>
      <div className="max-w-sm mt-1 mb-3">
        {!cameraOn ? (
          <Button
            onClick={() => {
              startCamera();
              clearScanResults();
              setCameraOn(true);
            }}
            intent={'success'}
            className="bg-blue-500 mx-auto hover:bg-blue-700 text-white font-bold py-2.5 px-7 rounded"
          >
            Scan Again
          </Button>
        ) : (
          <Button
            intent={'success'}
            className="bg-blue-500 mx-auto hover:bg-blue-700 text-white font-bold py-2.5 px-7 rounded"
            onClick={() => {
              registerPronite();
            }}
          >
            Register
          </Button>
        )}
      </div>
      {loading ? (
        <>
          <Spinner className="mt-3" intent={'white'} size={'small'} />
        </>
      ) : data?.registerPronite.__typename ===
        'MutationRegisterProniteSuccess' ? (
        <div className="p-3 bg-white/10 rounded-md bodyFont">
          <div className="text-lg leading-snug mb-1 text-green-500">
            <span className="font-bold">{pId}</span> registered for Pronite
          </div>
          <div className="text-white">
            <div className="text-lg leading-snug">
              {data.registerPronite.data.user.name}
            </div>
            <div className="text-sm leading-snug">
              {data.registerPronite.data.user.college?.name}
            </div>
            <div className="text-sm leading-snug">
              {data.registerPronite.data.user.phoneNumber}
            </div>
          </div>
        </div>
      ) : (
        <div className="text-red-500 font-semibold bodyFont bg-white/10 rounded-md">
          {userLoading && <Spinner intent={'white'} size={'small'} />}
          {data?.registerPronite.message && (
            <div>
              <p className="p-3 py-2">{data.registerPronite.message}</p>
              {userData?.userById.__typename === 'QueryUserByIdSuccess' &&
                !data.registerPronite.message.includes('authorized') && (
                  <div className="p-3 bg-white/10 rounded-md bodyFont">
                    <div className="text-lg leading-snug mb-1">
                      <span className="font-bold text-green-500">{pId}</span>
                    </div>
                    <div className="text-white">
                      <div className="text-lg leading-snug">
                        {userData.userById.data.name}
                      </div>
                      <div className="text-sm leading-snug">
                        {userData.userById.data.college?.name}
                      </div>
                      <div className="text-sm leading-snug">
                        {userData.userById.data.phoneNumber}
                      </div>
                    </div>
                  </div>
                )}
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default Pronite;
