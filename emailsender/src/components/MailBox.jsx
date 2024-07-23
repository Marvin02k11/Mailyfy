import React, { useState, useEffect } from "react";
import axios from "axios";

const MailBox = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [sendLoader, setSendLoader] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
    // Clear error message for the field being modified
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const validateForm = () => {
    let isValid = true;
    const errors = {};

    if (!formData.name.trim()) {
      errors.name = "Name is required";
      isValid = false;
    }

    if (!formData.email.trim()) {
      errors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email address is invalid";
      isValid = false;
    }

    if (!formData.subject.trim()) {
      errors.subject = "Subject is required";
      isValid = false;
    }

    console.log("Errors:", errors); // Debug: Log errors object
    setErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    console.log("Form Data:", formData); // Debug: Log form data
    console.log("Validation Result:", validateForm()); // Debug: Log validation result
    if (validateForm()) {
      const { name, email, subject, message } = formData;
      setSendLoader(true);
      try {
        const result = await axios.post(
          "http://localhost:3000/api/mailsend",
          { name, email, subject, message }
        );
        setShowConfirmation(true);
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: ""
        });
      } catch (error) {
        console.error("Error sending email:", error);
        alert("Some network error occurred. Please try again.");
      }
      setSendLoader(false);
    }
  };

  return (
    <>
      <section className="background-chat bg-gray-100">
        {/* Form Section */}
        <div className="max-w-full mx-auto relative bg-white/40 py-6 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] overflow-hidden flex flex-col md:flex-row items-center justify-center">
          {/* Left Side - Image */}
          <div className="text-center p-6 tablet:p-10 flex flex-col items-center justify-center mb-6 md:mb-0">
            <img
              src='https://www.pngkey.com/png/detail/84-841083_email-marketing-icon-png.png'
              alt=""
              className="mt-4 shrink-0 w-[400px] border-0 border-red-900 h-[500px]"
            />
          </div>
          {/* Right Side - Form */}
          <form className="p-6 tablet:p-10 desktop:w-4/6 laptop:w-3/4 mx-auto bg-white rounded-lg" onSubmit={handleSubmit}>
            {/* Email Compose Header */}
            <div className="flex items-center justify-between pb-4 border-b border-gray-300"></div>
              <input
                name="name"
                type="text"
                className="bg-transparent w-full text-sm outline-none px-4 py-2 border border-gray-300 rounded-md"
                placeholder="Name:"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <br /> <br />
              <div className="flex items-center justify-between pb-4 border-b border-gray-300">
              <input
                name="email"
                type="email"
                className="bg-transparent w-full text-sm outline-none px-4 py-2 border border-gray-300 rounded-md"
                placeholder="To:"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
    
            {/* Subject Input */}
            <input
              name="subject"
              type="text"
              className="bg-gray-100 w-full text-sm px-4 py-2 mt-4 focus:bg-transparent outline-orange-300 transition-all border border-gray-300 rounded-md"
              placeholder="Subject"
              value={formData.subject}
              onChange={handleChange}
              required
            />
            {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject}</p>}
    
            {/* Message Textarea */}
            <textarea
              name="message"
              className="bg-gray-100 w-full text-sm px-4 py-4 mt-4 focus:bg-transparent outline-orange-300 transition-all h-48 border border-gray-300 rounded-md"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              required
            />
    
            {/* Submit Button */}
            <div className="mt-8">
            <button
                  type="button"
                  className="w-full py-4 px-4 text-sm font-semibold flex justify-center gap-3 text-white bg-orange-400 hover:bg-orange-500 focus:outline-none"
                  onClick={handleSubmit}
                >
                  <span>Request a Call Back</span>

                  {sendLoader && <svg aria-hidden="true" class="w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                  </svg>}

                  
                </button>
            </div>
          </form>
        </div>
      </section>
    
      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 px-4 flex flex-wrap justify-center items-center w-full h-full z-[1000] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] overflow-auto font-[sans-serif]">
          <div className="w-full max-w-md bg-white shadow-lg rounded-md px-5 py-10 relative mx-auto text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-24 h-24 fill-green-300 absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2" viewBox="0 0 60 60">
              <circle cx="30" cy="30" r="29" data-original="#5edd60" />
              <path fill="#fff" d="m24.262 42.07-6.8-6.642a1.534 1.534 0 0 1 0-2.2l2.255-2.2a1.621 1.621 0 0 1 2.256 0l4.048 3.957 11.353-17.26a1.617 1.617 0 0 1 2.2-.468l2.684 1.686a1.537 1.537 0 0 1 .479 2.154L29.294 41.541a3.3 3.3 0 0 1-5.032.529z" data-original="#ffffff" />
            </svg>
            <div className="mt-8">
              <h3 className="text-2xl font-semibold flex-1">Message Sent!</h3>
              <p className="text-sm text-gray-500 mt-2">Message Send Succesfully.</p>
              <button type="button"
                className="px-6 py-2.5 mt-8 w-full rounded text-white text-sm font-semibold border-none outline-none bg-green-300 hover:bg-green-400"
                onClick={() => setShowConfirmation(false)}
              >
                Got it
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MailBox;
