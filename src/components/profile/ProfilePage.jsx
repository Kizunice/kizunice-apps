'use client'
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import TitleCard from "../ui/Cards/TitleCards"
import InputText from "../ui/Input/InputText"
import TextAreaInput from "../ui/Input/TextAreaInput"

export default function ProfilePage(){
    const [loading, setLoading] = useState(true)
    const [formValues, setFormValues]  = useState({})
    const [userData, setUserData]  = useState({})
    const {data:session} =  useSession()
    // const {name,email} = session?.user

    // const getProfileData = async () => {
    //   setUserData(session.user)
    //   // const users = await getCurrentUser()
    //     // try {
    //     //   const res = await fetch("/api/profile", {
    //     //     method: "GET",
    //     //   });
    //     //   const data = await res.json();
    //     //   console.log(data)
    //     //   setLoading(false);
    //     // } catch (err) {
    //     //   console.log("[collections_GET]", err);
    //     // }
    //   };

    // useEffect(() => {
    // getProfileData();
    // }, []);

    const updateFormValue = ({updateType, value}) => {
        console.log(updateType)
    }

    return(
      <TitleCard title="Profile" topMargin="mt-2"  >

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputText labelTitle="Name" defaultValue={session?.user.name} updateFormValue={updateFormValue}/>
              <InputText labelTitle="Email " defaultValue={session?.user.email} updateFormValue={updateFormValue}/>
              <InputText labelTitle="Tempat Lahir" defaultValue="Jakarta" updateFormValue={updateFormValue}/>
              <InputText labelTitle="Tanggal Lahir" type="date" defaultValue="2004-08-17" updateFormValue={updateFormValue}/>
              <InputText labelTitle="Asal Negara" defaultValue="Indonesia" updateFormValue={updateFormValue}/>
              <TextAreaInput labelTitle="About" defaultValue="Doing what I love, part time traveller" updateFormValue={updateFormValue}/>
          </div>
          <div className="divider" ></div>
          

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputText labelTitle="Language" defaultValue="English" updateFormValue={updateFormValue}/>
              <InputText labelTitle="Timezone" defaultValue="IST" updateFormValue={updateFormValue}/>
              {/* <ToogleInput updateType="syncData" labelTitle="Sync Data" defaultValue={true} updateFormValue={updateFormValue}/> */}
          </div>

          <div className="mt-16"><button className="btn btn-primary float-right" onClick={() => updateProfile()}>Update</button></div>
      </TitleCard>
    )
}

