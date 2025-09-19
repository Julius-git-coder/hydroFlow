
import { useState } from 'react';

const Age = () => {
    const [userType, setUserType] = useState('');
    const [childAge, setChildAge] = useState('');
    const [adultAge, setAdultAge] = useState('');
    const [work, setWork] = useState('');

    const handleUserTypeChange = (e) => {
        setUserType(e.target.value);
        setChildAge('');
        setAdultAge('');
        setWork('');
    };

    const handleSubmit = () => {
        if (!userType) {
            alert('Please select whether you are a child or an adult.');
            return;
        }

        if (userType === 'child' && !childAge) {
            alert('Please select an age range.');
            return;
        }

        if (userType === 'adult' && !adultAge) {
            alert('Please select an age range.');
            return;
        }

        if (!work) {
            alert('Please select a work or activity option.');
            return;
        }

        alert(`Submitted: User Type: ${userType}, Age Range: ${userType === 'child' ? childAge : adultAge}, Work/Activity: ${work}`);
    };

    const childWorkOptions = [
        { value: 'play', label: 'Play-based activities' },
        { value: 'study', label: 'Study/Homework' },
        { value: 'hobbies', label: 'Hobbies (e.g., sports, arts)' },
    ];

    const adultWorkOptions = [
        { value: 'full-time', label: 'Full-time Job' },
        { value: 'part-time', label: 'Part-time Job' },
        { value: 'freelance', label: 'Freelance Work' },
        { value: 'retired', label: 'Retired' },
        { value: 'student', label: 'Student' },
    ];

    return (
      <div className="bg-gray-100 flex items-center justify-center min-h-screen">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full md:max-w-[35rem] max-w-[20rem]">
          <h1 className="md:block hidden font-bold text-center text-gray-800 mb-6">User Type Selection</h1>
          <h6  className="text-2xl md:hidden block font-bold text-center text-gray-800 mb-6">User Type Selection</h6>

          <div className="mb-4">
            <label
              htmlFor="userType"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Are you a child or an adult?
            </label>
            <select
              id="userType"
              value={userType}
              onChange={handleUserTypeChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="">Select...</option>
              <option value="child">Child</option>
              <option value="adult">Adult</option>
            </select>
          </div>

          {userType === "child" && (
            <div className="mb-4">
              <label
                htmlFor="childAge"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Age Range (Child)
              </label>
              <select
                id="childAge"
                value={childAge}
                onChange={(e) => setChildAge(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="">Select age range...</option>
                <option value="0-5">0-5 years</option>
                <option value="6-12">6-12 years</option>
                <option value="13-17">13-17 years</option>
              </select>
            </div>
          )}

          {userType === "adult" && (
            <div className="mb-4">
              <label
                htmlFor="adultAge"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Age Range (Adult)
              </label>
              <select
                id="adultAge"
                value={adultAge}
                onChange={(e) => setAdultAge(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="">Select age range...</option>
                <option value="18-30">18-30 years</option>
                <option value="31-50">31-50 years</option>
                <option value="51+">51+ years</option>
              </select>
            </div>
          )}

          {userType && (
            <div className="mb-4">
              <label
                htmlFor="work"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Work/Activity Options
              </label>
              <select
                id="work"
                value={work}
                onChange={(e) => setWork(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="">Select an option...</option>
                {(userType === "child"
                  ? childWorkOptions
                  : adultWorkOptions
                ).map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          )}

          <button
            onClick={handleSubmit}
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
          >
            Submit
          </button>
        </div>
      </div>
    );
};

export default Age;
