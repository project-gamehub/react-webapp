import AcceptRequestButton from "./AcceptRequestButton";
import RejectRequestButton from "./RejectRequestButton";

const AcceptOrReject = ({ userId }) => {
    return (
        <div className="friend-page-msg-and-unfriend disp-flx">
            <AcceptRequestButton userId={userId} />
            <RejectRequestButton userId={userId} />
        </div>
    );
};

export default AcceptOrReject;
