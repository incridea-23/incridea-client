import Modal from "@/src/components/modal";
import { AccommodationRequestsByUserDocument } from "@/src/generated/generated";
import { useQuery } from "@apollo/client";
import Spinner from "@/src/components/spinner";
import Image from "next/image";

type Props = {
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
};

const avatarList = [{
id:"1",
name:"avatar1",
url:"https://res.cloudinary.com/dh1bowbbe/image/upload/v1706813980/mario-removebg-preview_t2hziu.png"
},
{
id:"1",
name:"avatar2",
url:"https://res.cloudinary.com/dh1bowbbe/image/upload/v1706813980/avatar2-removebg-preview_qw3yvu.png"
},
{
    id:"1",
    name:"avatar3",
    url:"https://res.cloudinary.com/dh1bowbbe/image/upload/v1706813980/avatar1-removebg-preview_t9nfqo.png"
},
{
    id:"1",
    name:"avatar4",
    url:"https://res.cloudinary.com/dh1bowbbe/image/upload/v1706813980/mario-removebg-preview_t2hziu.png"
},    
]



const AvatarModal: React.FunctionComponent<Props> = ({
  showModal,
  setShowModal,
}) => {
 

  return (
    <Modal
      showModal={showModal}
      onClose={() => setShowModal(false)}
      title={"Choose your avatar"}
      size="medium">
      <div className="flex m-4 bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg bg-clip-padding rounded-lg p-1 items-center justify-center gap-2.5 h-80">
        <div className="flex flex-row gap-3 items-start justify-center m-4 text-lg">
          {/* {loading ? (
            <Spinner className="text-[#dd5c6e]" />
          ) : ( */}
            {avatarList.map((avatar,index) => (
                <div className="flex flex-col" key={index}>
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
