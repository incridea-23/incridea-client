import Modal from "@/src/components/modal";
import {
  GetAvatarsDocument,
  MeDocument,
  UpdateProfileImageDocument,
} from "@/src/generated/generated";
import { useMutation, useQuery } from "@apollo/client";
import Image from "next/image";

type Props = {
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
};

const AvatarModal: React.FunctionComponent<Props> = ({
  showModal,
  setShowModal,
}) => {
  const [updateAvatarMutation] = useMutation(UpdateProfileImageDocument, {
    refetchQueries: [{ query: MeDocument }],
  });

  const data = useQuery(GetAvatarsDocument) || [];
  let avatarList: {
    id: string;
    name: string;
    url: string;
  }[] = [];
  if (data.loading === false && data.data !== undefined) {
    avatarList = JSON.parse(data.data?.getAvatars);
  }

  return (
    <Modal
      showModal={showModal}
      onClose={() => setShowModal(false)}
      title={"Choose your avatar"}
      size="md"
    >
      <div className="w-full h-full flex justify-center">
        <div className="max-h-[40vh] w-full grid md:grid-cols-2 grid-cols-1 m-4 bg-white/10 backdrop-filter backdrop-blur-lg bg-clip-padding rounded-lg p-2 items-center justify-center gap-2 overflow-y-scroll">
          {avatarList.map((avatar, index) => (
            <div
              className="rounded-xl border border-primary-200/30 items-center justify-center flex h-full p-2 hover:bg-primary-200/20 transition-colors duration-300"
              key={index}
              onClick={() => {
                updateAvatarMutation({
                  variables: {
                    imageURL: avatar.url,
                  },
                });
                setShowModal(false);
              }}
            >
              <Image
                src={avatar.url}
                alt={avatar.name}
                className="h-[100px] cursor-pointer"
                width={100}
                height={100}
              />
              {/* <div className="text-center">{avatar.name}</div> */}
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
};

export default AvatarModal;
