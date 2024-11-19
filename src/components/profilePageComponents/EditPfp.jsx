import axios from "axios";
import { useRef, useState } from "react";
import "../../styles/profilePageStyles/editPfp.css";
import CloseEditPfpInterface from "./CloseEditPfpInterface";
import { USER_SERVICE_URL } from "../../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { updateUserAvatar } from "../../config/userDataSlice";

const EditPfp = ({ setShowEditPfpInterface }) => {
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState("");
    const dispatch = useDispatch();
    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];

        const validTypes = ["image/png", "image/jpeg", "image/jpg"];
        if (selectedFile && !validTypes.includes(selectedFile.type)) {
            toast.error("Only .png, .jpg, and .jpeg files are allowed.");
            setFile(null);
            return;
        }

        if (selectedFile && selectedFile.size > 2 * 1024 * 1024) {
            toast.error("File size exceeds 2 MB.");
            setFile(null);
            return;
        }
        setFile(selectedFile);
        setPreview(URL.createObjectURL(selectedFile));
    };

    const accessToken = useSelector((state) => state.userDataSlice.accessToken);

    const handleUploadClick = async (e) => {
        if (!file) {
            toast.error("Please select a file.");
            return;
        }

        const formData = new FormData();
        formData.append("image", file);
        if (!accessToken) {
            toast.error("User not logged in");
            return;
        }

        try {
            const response = await axios.post(
                USER_SERVICE_URL + "/upload-image",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "access-token": accessToken
                    }
                }
            );
            toast.success("Image uploaded successfully!");
            const imageUrl = response.data.data;

            dispatch(updateUserAvatar(imageUrl));
        } catch (error) {
            toast.error(
                error?.response?.data?.message || "Image upload failed"
            );
        }
    };

    const triggerFileInput = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    return (
        <div className="edit-pfp-interface">
            <CloseEditPfpInterface
                setShowEditPfpInterface={setShowEditPfpInterface}
            />
            <div className="edit-input-container">
                <div className="custom-file-input" onClick={triggerFileInput}>
                    {preview ? (
                        <div>Select another image</div>
                    ) : (
                        <>
                            <div>Click here to select an image</div>
                            <div className="edit-input-note">(Max. 2mb)</div>
                        </>
                    )}
                </div>
                <input
                    type="file"
                    accept=".png,.jpg,.jpeg"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                />
                {preview && (
                    <div className="display-preview-pfp">
                        <div className="pfp-container">
                            <img src={preview} alt="Preview" />
                        </div>
                        <button
                            className="upload-edit-pfp-button"
                            onClick={handleUploadClick}
                        >
                            Upload
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default EditPfp;
