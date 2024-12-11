import React, { useState } from "react";
import { sendFormData } from "./services/api";

interface FormInfo {
  firstName: string;
  lastName: string;
  mail: string;
  message: string;
}

function App() {
  const [formInfo, setFormInfo] = useState<FormInfo>({
    firstName: "",
    lastName: "",
    mail: "",
    message: "",
  });
  const [readOnlyBtn, setReadOnlyBtn] = useState(true);

  const handleInputChange = ({
    key,
    value,
  }: {
    key: keyof FormInfo;
    value: string;
  }) => {
    setFormInfo((prev) => ({
      ...prev,
      [key]: value,
    }));
    if (
      formInfo.firstName !== "" ||
      formInfo.lastName !== "" ||
      formInfo.mail !== "" ||
      formInfo.message !== ""
    ) {
      setReadOnlyBtn(false);
    } else setReadOnlyBtn(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Formun sayfayı yenilemesini engelliyoruz

    try {
      const result = await sendFormData(formInfo); // Form verilerini backend'e gönderiyoruz
      console.log("Form gönderildi:", result);
      alert("Form başarıyla gönderildi!");
    } catch (error) {
      console.error("Hata oluştu:", error);
      alert("Form gönderilirken bir hata oluştu.");
    }
  };

  return (
    <div className="flex items-center justify-center text-center h-svh bg-[#b2d1ff]">
      <div className=" bg-[#f5f7fa] h-svh w-11/12 flex justify-center gap-10 p-10">
        <div className="contact-form-menu  my-4 w-full rounded-3xl  bg-[#ffffff] px-8 py-10 flex flex-col">
          <div className="text-left text-orange-500  font-medium text-2xl">
            Get in Touch
          </div>
          <div className="text-left text-black font-medium text-5xl my-3">
            Let's Chat, Reach Out to Us
          </div>
          <div className="text-left text-[#878787]  font-medium text-lg">
            Have questions or feedback? We're here to help. Send us a message,
            and we'll respond within 24 hours
          </div>
          <div className="line w-full h-0.5 bg-gray-200 my-4"></div>
          <form onSubmit={handleSubmit}>
            <div className="nameSection flex gap-4">
              <div className="flex flex-col text-left w-full gap-2 font-medium">
                <label htmlFor="firstName text-xl">First Name</label>
                <input
                  className="bg-[#fafafa] p-4 rounded-xl focus:outline-none"
                  type="text"
                  name=""
                  id="firstName"
                  placeholder="First Name"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    handleInputChange({
                      key: "firstName",
                      value: e.target.value,
                    });
                  }}
                />
              </div>
              <div className="flex flex-col text-left w-full gap-2 font-medium">
                <label htmlFor="lastName">Last Name</label>
                <input
                  className="bg-[#fafafa] p-4 rounded-xl focus:outline-none"
                  type="text"
                  name=""
                  id="lastName"
                  placeholder="Last Name"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    handleInputChange({
                      key: "lastName",
                      value: e.target.value,
                    });
                  }}
                />
              </div>
            </div>
            <div className="flex flex-col text-left w-full gap-2 font-medium">
              <label htmlFor="emailAdress text-xl">Email Adress</label>
              <input
                className="bg-[#fafafa] p-4 rounded-xl focus:outline-none"
                type="text"
                name=""
                id="emailAdress"
                placeholder="Email Adress"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  handleInputChange({
                    key: "mail",
                    value: e.target.value,
                  });
                }}
              />
            </div>
            <div className="flex flex-col text-left w-full gap-2 font-medium">
              <label htmlFor="message text-xl">Message</label>
              <textarea
                className="bg-[#fafafa] p-4 rounded-xl focus:outline-none max-h-64"
                name=""
                id="message"
                placeholder="Message"
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                  handleInputChange({
                    key: "message",
                    value: e.target.value,
                  });
                }}
              />
            </div>
            <button
              className={`flex flex-col w-full gap-2 font-medium bg-orange-400 my-3 p-3 rounded-xl items-center `}
              disabled={readOnlyBtn}
            >
              Send
            </button>
          </form>
        </div>
        <div className="contact-info-menu  my-4 w-full ">
          <img src="img.png" className="rounded-3xl" alt="" />
        </div>
      </div>
    </div>
  );
}

export default App;
