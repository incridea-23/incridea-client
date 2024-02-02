import Modal from "@/src/components/modal";
import { GetAvatarsDocument, MeDocument, UpdateProfileImageDocument,  } from "@/src/generated/generated";
import { useMutation, useQuery } from "@apollo/client";
import Spinner from "@/src/components/spinner";
import Image from "next/image";

type Props = {
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
};




const AvatarModal: React.FunctionComponent<Props> = ({
  showModal,
  setShowModal,
}) => {

  const [updateAvatarMutation, { data:updateImageResponse, loading: Updating, error }] =
    useMutation(UpdateProfileImageDocument,{
      refetchQueries: [{ query: MeDocument }],
    });


  const data = useQuery(GetAvatarsDocument) || [];
  let avatarList:{

      id: string;
      name: string;
      url: string;
  }[] = [];
  if(data.loading === false && data.data !== undefined){
    avatarList = JSON.parse(data.data?.getAvatars);
  }

  return (
    <Modal
      showModal={showModal}
      onClose={() => setShowModal(false)}
      title={"Choose your avatar"}
      size="small">
      <div className="flex m-4 bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg bg-clip-padding rounded-lg p-1 items-center justify-center gap-2.5 h-80">
        <div className="flex flex-row flex-wrap gap-3 items-start justify-center m-4 text-lg">
          {/* {loading ? (
            <Spinner className="text-[#dd5c6e]" />
          ) : ( */}
            {avatarList.map((avatar,index) => (
                <div className="flex flex-col hover:bg-slate-500 hover:rounded" key={index} onClick={()=>updateAvatarMutation({
                  variables:{
                    imageURL:avatar.url
                  }
                })}>
                    <Image src={avatar.url} alt={avatar.name} className="rounded-full h-20 w-20" width={100} height={100} />
                    <div className="text-center">{avatar.name}</div>
                </div>
            ))}

          {/* )} */}
        </div>
      </div>
    </Modal>
  );
};

export default AvatarModal;
