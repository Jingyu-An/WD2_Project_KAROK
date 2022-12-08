import React, {useState} from "react";
import {Modal, useMantineTheme} from "@mantine/core";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {uploadImage} from "../../Actions/uploadAction";
import {updateUser} from "../../API/UserRequests";

//mantine is a library and this Modal is of its components

const ProfileModal = ({ modalOpened, setModalOpened, data }) => {
  const theme = useMantineTheme();
  const{password, ...other} = data
  const [formData, setFormData] = useState(other);
  const [profileImage, setProfileImage] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const dispatch = useDispatch();
  const param = useParams();

  const {user} = useSelector((state) => state.authReducer.authData)


  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  }

  const onImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      let img = e.target.files[0];
      e.target.name === "profileImage"
        ? setProfileImage(img)
        : setCoverImage(img)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    let UserData = formData;
    if (profileImage) {
      const data = new FormData();
      const fileName = Date.now() + profileImage.name;
      data.append("name", fileName);
      data.append("file", profileImage)
      UserData.profilePicture = fileName;
      try {
        dispatch(uploadImage(data));
      } catch (e) {
        console.log(e)
      }
    }
    if (coverImage) {
      const data = new FormData();
      const fileName = Date.now() + coverImage.name;
      data.append("name", fileName);
      data.append("file", coverImage)
      UserData.coverPicture = fileName;
      try {
        dispatch(uploadImage(data));
      } catch (e) {
        console.log(e)
      }
    }
    dispatch(updateUser(param.id, UserData));
    setModalOpened(false);
  }


  return (
    <Modal
      overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
      overlayOpacity={0.55}
      overlayBlur={3}
      opened={modalOpened}
      size="auto"
      onClose={() => setModalOpened(false)}
    >
      <form className="infoForm">
        <h3>Your info</h3>

        <div>
          <inputi
            value={formData.firstname}
            onChange={handleChange}
            type="text"
            className="infoInput"
            name="FirstName"
            placeholder="First Name"
          />

          <input
            value={formData.lastname}
            onChange={handleChange}
            type="text"
            className="infoInput"
            name="LastName"
            placeholder="Last Name"
          />
        </div>

        <div>
          <input
            value={formData.worksAt}
            onChange={handleChange}
            type="text"
            className="infoInput"
            name="worksAT"
            placeholder="Works at"
          />
        </div>

        <div>
          <input
            value={formData.livesIn}
            onChange={handleChange}
            type="text"
            className="infoInput"
            name="livesIN"
            placeholder="LIves in"
          />

          <input
            value={formData.country}
            onChange={handleChange}
            type="text"
            className="infoInput"
            name="Country"
            placeholder="Country"
          />
        </div>

        <div>
          <input
            value={formData.relationship}
            onChange={handleChange}
            type="text"
            className="infoInput"
            placeholder="RelationShip Status"
          />
        </div>


        <div>
          Profile Image
          <input type="file" name='profileImg'/>
          Cover Image
          <input type="file" name="coverImg"/>
        </div>

        <button className="button infoButton">Update</button>
      </form>
    </Modal>
  );
}

export default ProfileModal;