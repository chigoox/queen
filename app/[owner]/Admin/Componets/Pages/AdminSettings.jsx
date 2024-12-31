import { useUploader } from "@/app/Hooks/useUploader";
import { addToDoc } from "@/app/myCodes/Database";
import { Button, Input, user } from "@nextui-org/react";
import { Upload, message, Button as ButtonA } from "antd";
import ImgCrop from "antd-img-crop";
import { getAuth, updateProfile } from "firebase/auth";
import { motion } from "motion/react";
import React, { useState } from "react";
import { addUniqueUsername } from "../../../../myCodes/DatabaseUtils";



const auth = getAuth();

const AdminSettings = ({ownerInfo}) => {
  const [info, setInfo] = useState({});
  const [photo, setPhoto] = useState(null);

const uid = auth?.currentUser.uid



  const handleUpdateProfile = async () => {
    const imageLogo = await useUploader(photo, `${auth?.currentUser.uid}/profilePicture`)
  
    if(info.userName){
      const userNameTaken = await addUniqueUsername(info.userName)
      if(!userNameTaken){
        message.error("Username already exists!");
        return;
      }
    }
    
    try {
      await updateProfile(auth.currentUser, {
        displayName: info.userName || auth.currentUser.displayName,
        photoURL: photo || auth.currentUser.photoURL,
        phoneNumber: info.phone || auth.currentUser.phoneNumber
        ,

      });
      await addToDoc('Owners', auth.currentUser.uid,{Owner:{...info, profilePicture:photo}, userName:info.userName})
      message.success("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      message.error("Failed to update profile.");
    }
  };

  
  
  const handleLogoUpload = async ( {file} ) => {
    const reader = new FileReader();
    reader.onload = () => {
      setPhoto(reader.result);
      
    };
    reader.readAsDataURL(file);
   
    
  };

  const setUpConntectedAccount = async () => {
  const data = await  fetch('/api/LinkConnectedAccount', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userName: ownerInfo?.userName,
        uid: uid,
      }),
    })

    let URL = await data.json()
       // await addToDoc('Temp', bookID, apointment)
        window.location.href = URL

  }
  

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <motion.div
        className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl font-bold text-center mb-6">Update Profile</h1>
<Button onPress={()=>{setUpConntectedAccount()}} className="my-4 font-semibold">Connect Stripe</Button>
        <div className="mb-4 center-col gap-2">
          <Input
            label="User Name"
            placeholder={ownerInfo?.userName || 'Chigoox'}
            fullWidth
            name="userName"
            value={info?.userName || ''}
            onChange={(e) => setInfo((prev)=>{return({...prev, [e.target.name]:e.target.value})})}
          />

          <Input
            label="Email"
            placeholder={ownerInfo?.email || 'cool@gh.com'}
            fullWidth
            name="email"
            value={info?.email || ''}
            onChange={(e) => setInfo((prev)=>{return({...prev, [e.target.name]:e.target.value})})}
          />

            <Input
            label="First Name"
            placeholder={ownerInfo?.firstName || 'John'}
            fullWidth
            name="firstName"
            value={info?.firstName || ''}
            onChange={(e) =>
                setInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }))
            }
            />

            <Input
            label="Last Name"
            placeholder={ownerInfo?.lastName || 'Pope'}
            fullWidth
            name="lastName"
            value={info?.lastName || ''}
            onChange={(e) =>
                setInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }))
            }
            />

            <Input
            label="Phone"
            placeholder={ownerInfo?.phone || '9087879823'}
            fullWidth
            name="phone"
            value={info?.phone || ''}
            onChange={(e) =>
                setInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }))
            }
            />

            <Input
            label="Site Name"
            placeholder={ownerInfo?.bookingSiteName || 'CrownedBL'}
            fullWidth
            name="bookingSiteName"
            value={info?.siteName || ''}
            onChange={(e) =>
                setInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }))
            }
            />

        </div>

        <div className="mb-4">
          {/* Logo Upload */}
          <ImgCrop rotate>
        <Upload
          name="logo"
          listType="picture"
          maxCount={1}
          onChange={handleLogoUpload}
          beforeUpload={(file) => {
            handleLogoUpload(file );
            return false;
          }}
        >
          <ButtonA>Upload Profile</ButtonA>
        </Upload>
          </ImgCrop>
        </div>

        <Button
          className="w-full bg-blue-500 text-white"
          onClick={handleUpdateProfile}
        >
          Save Changes
        </Button>
      </motion.div>

     
    </div>
  );
};

export default AdminSettings;
