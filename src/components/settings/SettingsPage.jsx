'use client'
import { useState } from "react";
import TitleCard from "@/components/ui/TitleCards";
import InputField from "../ui/InputField";
import toast from "react-hot-toast";
import Button from "../ui/Button";

export default function SettingsPage() {
    const [loading, setLoading] = useState(false)
    const [formValues, setFormValues]  = useState({
        currentPassword :'',
        newPassword: '',
        confirmPassword: ''
    })
    const{currentPassword, newPassword, confirmPassword} = formValues

    const handleChange = (e) => {
        e.preventDefault()
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value});
    };

    async function handleSubmit() {
        setLoading(true);
        try {
          const response = await fetch("/api/password/change", {
            method: "POST",
            body: JSON.stringify(formValues),
            headers: {
              "Content-Type": "application/json",
            },
          })
          if (response.ok) {
            setLoading(false);
            setFormValues({ currentPassword :'', newPassword: '', confirmPassword: ''})
            toast.success("Berhasil mengganti password");
          } else if (!response.ok) {
            setLoading(false);
            toast.error("Password Salah");
          }
        } catch (error) {
          setLoading(false);
          toast.error(error);
          console.error("Network Error:", error);
        }
      }

    return (
        <TitleCard title="Ganti Password" topMargin="mt-2"  >
            <div className="flex flex-col mx-auto lg:w-[60%] gap-6">
                <InputField
                    type="password"
                    value={currentPassword}
                    placeholder="********"
                    label="Password Lama"
                    name="currentPassword"
                    onChange={handleChange}
                />
                <InputField
                    type="password"
                    value={newPassword}
                    placeholder="********"
                    label="Password Baru"
                    name="newPassword"
                    onChange={handleChange}
                />
                <InputField
                    type="password"
                    value={confirmPassword}
                    placeholder="********"
                    label="Konfirmasi Password"
                    name="confirmPassword"
                    onChange={handleChange}
                />
                <Button handleSubmit={handleSubmit} text={"Ganti Password"} loading={loading} />
            </div>
        </TitleCard>
    )
}