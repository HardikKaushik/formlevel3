import React, { useState, useEffect } from "react";
import axios from "axios";


const SurveyForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    surveyTopic: "",
    favoriteProgrammingLanguage: "",
    yearsOfExperience: "",
    exerciseFrequency: "",
    dietPreference: "",
    highestQualification: "",
    fieldOfStudy: "",
    feedback: "",
  });

  const [errors, setErrors] = useState({});
  const [additionalQuestions, setAdditionalQuestions] = useState([]);
  const [render, setrender] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);

  useEffect(() => {
    if (render) {
      fetchAdditionalQuestions();
    }
  }, [render]);

  const fetchAdditionalQuestions = async () => {
    try {
      const response = await axios.get(
        `https://quizapi.io/api/v1/questions?apiKey=W3cHddw0FvecB2yQ5di8oOEw8YJFxU7slpaLwSD5&limit=5`
      );
      setAdditionalQuestions(response.data);
    } catch (error) {
      console.error("Error fetching additional questions:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validate = () => {
    const errors = {};
    if (!formData.fullName) errors.fullName = "Full Name is required";
    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid";
    }
    if (!formData.surveyTopic) errors.surveyTopic = "Survey Topic is required";
    if (formData.surveyTopic === "Technology") {
      if (!formData.favoriteProgrammingLanguage)
        errors.favoriteProgrammingLanguage =
          "Favorite Programming Language is required";
      if (!formData.yearsOfExperience)
        errors.yearsOfExperience = "Years of Experience is required";
    }
    if (formData.surveyTopic === "Health") {
      if (!formData.exerciseFrequency)
        errors.exerciseFrequency = "Exercise Frequency is required";
      if (!formData.dietPreference)
        errors.dietPreference = "Diet Preference is required";
    }
    if (formData.surveyTopic === "Education") {
      if (!formData.highestQualification)
        errors.highestQualification = "Highest Qualification is required";
      if (!formData.fieldOfStudy)
        errors.fieldOfStudy = "Field of Study is required";
    }
    if (!formData.feedback) {
      errors.feedback = "Feedback is required";
    } else if (formData.feedback.length < 50) {
      errors.feedback = "Feedback must be at least 50 characters";
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validate()) {
      // Additional API call can be made here if needed
      setrender(true);
      console.log("Form data:", formData);
      console.log("Additional questions:", additionalQuestions);
      // Display summary or further actions
      setSubmittedData({ ...formData, additionalQuestions });
    }
  };

  return (
    <div className="p-8 w-full ">
      {!submittedData ? (
        
        <form onSubmit={handleSubmit} className="space-y-6 w-1/2 mx-auto">
        
          <div>
          <h1 className='text-2xl font-bold text-gray-600  text-center '>Survey Form</h1>
            <label
              for="username"
              class="block text-lg text-gray-800 "
            >
              Username
            </label>

            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className={errors.fullName? "block  mt-2 w-full placeholder-gray-400/70  rounded-lg border border-red-500 bg-white px-5 py-2.5 text-gray-700 focus:border-red-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 ": "block  mt-2 w-full placeholder-gray-400/70  rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-800 focus:outline-none focus:ring focus:ring-blue-800 focus:ring-opacity-40 "
                  
              }
              placeholder="John Doe"
            />
            {errors.fullName && (
              <p className="text-red-500 text-sm font-bold">{errors.fullName}</p>
            )}
          </div>

          <div>
            <label for="email" class="block text-lg  text-gray-900 ">
              Email Address
            </label>

            <div class="relative flex  items-center mt-2">
              <span class="absolute">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6 mx-2  text-gray-400 "
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                  />
                </svg>
              </span>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={errors.email? "block w-full py-2.5 text-gray-700 placeholder-gray-400/70 bg-white border border-red-500 rounded-lg pl-11 pr-5 rtl:pr-11 rtl:pl-5 focus:border-red-400  focus:ring-red-300 focus:outline-none focus:ring focus:ring-opacity-40": "block w-full py-2.5 text-gray-700 placeholder-gray-400/70 bg-white border border-gray-200 rounded-lg pl-11 pr-5 rtl:pr-11 rtl:pl-5 focus:border-blue-800  focus:ring-blue-800 focus:outline-none focus:ring focus:ring-opacity-40"
                  
                 }
                placeholder="john@example.com"
              />
                </div>
              {errors.email && (
                <p className="text-red-500 text-sm mb-4 font-bold">{errors.email}</p>
              )}
          </div>

          <div>
          <label  class="block text-lg  text-gray-900 ">
              Survey Topic
            </label>
            <select
              name="surveyTopic"
              value={formData.surveyTopic}
              onChange={handleChange}
              className={errors.surveyTopic? "block w-full mt-2  py-2.5 text-gray-700 placeholder-gray-400/70 bg-white border border-red-400 rounded-lg pl-11 pr-5 rtl:pr-11 rtl:pl-5  focus:border-red-400 focus:ring-red-300 focus:outline-none focus:ring focus:ring-opacity-40": "block w-full mt-2 py-2.5 text-gray-700 placeholder-gray-400/70 bg-white border border-gray-200 rounded-lg pl-11 pr-5 rtl:pr-11 rtl:pl-5  focus:border-blue-800 focus:ring-blue-800 focus:outline-none focus:ring focus:ring-opacity-40"}
            >
              <option  value="">Select a topic</option>
              <option value="Technology">Technology</option>
              <option value="Health">Health</option>
              <option value="Education">Education</option>
            </select>
            {errors.surveyTopic && (
              <p className="text-red-500 text-sm font-bold">{errors.surveyTopic}</p>
            )}
          </div>

          {formData.surveyTopic === "Technology" && (
            <div className="space-y-6">
              <div>
                <label className="block text-lg  text-gray-900 ">
                  Favorite Programming Language
                </label>
                <select
                  name="favoriteProgrammingLanguage"
                  value={formData.favoriteProgrammingLanguage}
                  onChange={handleChange}
                  className={errors.favoriteProgrammingLanguage? "block w-full mt-2  py-2.5 text-gray-700 placeholder-gray-400/70 bg-white border border-red-400 rounded-lg pl-11 pr-5 rtl:pr-11 rtl:pl-5  focus:border-red-400 focus:ring-red-300 focus:outline-none focus:ring focus:ring-opacity-40": "block w-full mt-2 py-2.5 text-gray-700 placeholder-gray-400/70 bg-white border border-gray-200 rounded-lg pl-11 pr-5 rtl:pr-11 rtl:pl-5  focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"}
                >
                  <option value="">Select a language</option>
                  <option value="JavaScript">JavaScript</option>
                  <option value="Python">Python</option>
                  <option value="Java">Java</option>
                  <option value="C#">C#</option>
                </select>
                {errors.favoriteProgrammingLanguage && (
                  <p className="text-red-500 text-sm font-bold">
                    {errors.favoriteProgrammingLanguage}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-lg  text-gray-900 ">
                  Years of Experience
                </label>
                <input
                  type="number"
                  name="yearsOfExperience"
                  value={formData.yearsOfExperience}
                  onChange={handleChange}
                  className={errors.yearsOfExperience? "block w-full mt-2  py-2.5 text-gray-700 placeholder-gray-400/70 bg-white border border-red-400 rounded-lg pl-11 pr-5 rtl:pr-11 rtl:pl-5  focus:border-red-400 focus:ring-red-300 focus:outline-none focus:ring focus:ring-opacity-40": "block w-full mt-2 py-2.5 text-gray-700 placeholder-gray-400/70 bg-white border border-gray-200 rounded-lg pl-11 pr-5 rtl:pr-11 rtl:pl-5  focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"}
                />
                {errors.yearsOfExperience && (
                  <p className="text-red-500 text-sm font-bold">
                    {errors.yearsOfExperience}
                  </p>
                )}
              </div>
            </div>
          )}

          {formData.surveyTopic === "Health" && (
            <div className="space-y-6">
              <div>
                <label className="block text-lg  text-gray-900 ">
                  Exercise Frequency
                </label>
                <select
                  name="exerciseFrequency"
                  value={formData.exerciseFrequency}
                  onChange={handleChange}
                  className={errors.exerciseFrequency? "block w-full mt-2  py-2.5 text-gray-700 placeholder-gray-400/70 bg-white border border-red-400 rounded-lg pl-11 pr-5 rtl:pr-11 rtl:pl-5  focus:border-red-400 focus:ring-red-300 focus:outline-none focus:ring focus:ring-opacity-40": "block w-full mt-2 py-2.5 text-gray-700 placeholder-gray-400/70 bg-white border border-gray-200 rounded-lg pl-11 pr-5 rtl:pr-11 rtl:pl-5  focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"}
                >
                  <option value="">Select frequency</option>
                  <option value="Daily">Daily</option>
                  <option value="Weekly">Weekly</option>
                  <option value="Monthly">Monthly</option>
                  <option value="Rarely">Rarely</option>
                </select>
                {errors.exerciseFrequency && (
                  <p className="text-red-500 text-sm font-bold">
                    {errors.exerciseFrequency}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-lg  text-gray-900 ">
                  Diet Preference
                </label>
                <select
                  name="dietPreference"
                  value={formData.dietPreference}
                  onChange={handleChange}
                  className={errors.dietPreference? "block w-full mt-2  py-2.5 text-gray-700 placeholder-gray-400/70 bg-white border border-red-400 rounded-lg pl-11 pr-5 rtl:pr-11 rtl:pl-5  focus:border-red-400 focus:ring-red-300 focus:outline-none focus:ring focus:ring-opacity-40": "block w-full mt-2 py-2.5 text-gray-700 placeholder-gray-400/70 bg-white border border-gray-200 rounded-lg pl-11 pr-5 rtl:pr-11 rtl:pl-5  focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"}
                >
                  <option value="">Select a preference</option>
                  <option value="Vegetarian">Vegetarian</option>
                  <option value="Vegan">Vegan</option>
                  <option value="Non-Vegetarian">Non-Vegetarian</option>
                </select>
                {errors.dietPreference && (
                  <p className="text-red-500 text-sm font-bold">
                    {errors.dietPreference}
                  </p>
                )}
              </div>
            </div>
          )}

          {formData.surveyTopic === "Education" && (
            <div className="space-y-6">
              <div>
                <label className="block text-lg  text-gray-900 ">
                  Highest Qualification
                </label>
                <select
                  name="highestQualification"
                  value={formData.highestQualification}
                  onChange={handleChange}
                  className={errors.highestQualification? "block w-full mt-2  py-2.5 text-gray-700 placeholder-gray-400/70 bg-white border border-red-400 rounded-lg pl-11 pr-5 rtl:pr-11 rtl:pl-5  focus:border-red-400 focus:ring-red-300 focus:outline-none focus:ring focus:ring-opacity-40": "block w-full mt-2 py-2.5 text-gray-700 placeholder-gray-400/70 bg-white border border-gray-200 rounded-lg pl-11 pr-5 rtl:pr-11 rtl:pl-5  focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"}
                >
                  <option value="">Select qualification</option>
                  <option value="High School">High School</option>
                  <option value="Bachelor's">Bachelor's</option>
                  <option value="Master's">Master's</option>
                  <option value="PhD">PhD</option>
                </select>
                {errors.highestQualification && (
                  <p className="text-red-500 text-sm font-bold">
                    {errors.highestQualification}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-lg  text-gray-900 ">
                  Field of Study
                </label>
                <input
                  type="text"
                  name="fieldOfStudy"
                  value={formData.fieldOfStudy}
                  onChange={handleChange}
                  className={errors.fieldOfStudy? "block w-full mt-2  py-2.5 text-gray-700 placeholder-gray-400/70 bg-white border border-red-400 rounded-lg pl-11 pr-5 rtl:pr-11 rtl:pl-5  focus:border-red-400 focus:ring-red-300 focus:outline-none focus:ring focus:ring-opacity-40": "block w-full mt-2 py-2.5 text-gray-700 placeholder-gray-400/70 bg-white border border-gray-200 rounded-lg pl-11 pr-5 rtl:pr-11 rtl:pl-5  focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"}
                />
                {errors.fieldOfStudy && (
                  <p className="text-red-500 text-sm  font-bold">{errors.fieldOfStudy}</p>
                )}
              </div>
            </div>
          )}

        
          <div>
    <label for="Description" class="block text-lg text-gray-800 ">Description</label>

    <textarea placeholder="Share your feedback with us..." name="feedback"
              value={formData.feedback}
              onChange={handleChange}
              className={errors.feedback?"block  mt-2 w-full placeholder-gray-400/70  rounded-lg border border-red-500 bg-white px-4 h-32 py-2.5 text-gray-700 focus:border-red-400 focus:outline-none focus:ring focus:ring-red-300 focus:ring-opacity-40":"block  mt-2 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-4 h-32 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"} ></textarea>
    
    {errors.feedback && (
              <p className="text-red-500 text-sm font-bold">{errors.feedback}</p>
            )}
</div>

          <button
            type="submit"
            className="bg-gray-500 text-white font-bold px-4 py-2 rounded"
          >
            Submit
          </button>
        </form>
      ) : (
        <div >
          <div className="border-2 container h-full p-4 space-y-5 shadow-lg   bg-slate-50 w-full">
          <h1 class="text-2xl font-semibold text-gray-800 lg:text-3xl ">Sumbission Summary.</h1>
          <p>
            <strong>Full Name:</strong> {submittedData.fullName}
          </p>
          <p>
            <strong>Email:</strong> {submittedData.email}
          </p>
          <p>
            <strong>Survey Topic:</strong> {submittedData.surveyTopic}
          </p>
          {submittedData.surveyTopic === "Technology" && (
            <div>
              <p>
                <strong>Favorite Programming Language:</strong>{" "}
                {submittedData.favoriteProgrammingLanguage}
              </p>
              <p>
                <strong>Years of Experience:</strong>{" "}
                {submittedData.yearsOfExperience}
              </p>
            </div>
          )}
          {submittedData.surveyTopic === "Health" && (
            <div>
              <p>
                <strong>Exercise Frequency:</strong>{" "}
                {submittedData.exerciseFrequency}
              </p>
              <p>
                <strong>Diet Preference:</strong> {submittedData.dietPreference}
              </p>
            </div>
          )}
          {submittedData.surveyTopic === "Education" && (
            <div>
              <p>
                <strong>Highest Qualification:</strong>{" "}
                {submittedData.highestQualification}
              </p>
              <p>
                <strong > Field of Study:</strong> 
                
                {submittedData.fieldOfStudy}
              </p>
            </div>
          )}
          <div className="flex justify-center   mt-2 mb-4 ">
          
          <strong> Feedback:</strong>
          <p class="mx-2 leading-relaxed">
           {submittedData.feedback}
        
          </p>
          
          </div>
          </div>

          {additionalQuestions.length > 0 && (
            <div className="mt-6">
              
              <section class="bg-white ">

             
                <div  class="container px-6 py-12 mx-auto">
                <h1 class="text-2xl font-semibold text-gray-800 lg:text-3xl ">Frequently asked questions.</h1>
        
                <div class="grid grid-cols-1 gap-8 mt-8 lg:mt-16 md:grid-cols-2 xl:grid-cols-3">
                {additionalQuestions.map((question, index) => (
                    <div key={index}>
                        <div class="inline-block p-3 text-white bg-blue-600 rounded-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
        
                        <div>
                            <h1 class="text-xl font-semibold text-gray-700 ">{question.question}</h1>
        
                            <p class="mt-2 text-sm text-gray-500 ">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident placeat, consequatur eveniet veritatistiis illum doloremque magni ex corrupti tempora quis.
                            </p>
                        </div>
                    </div>
           ))}
                    
                </div>
            </div>
           
              </section>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SurveyForm;


