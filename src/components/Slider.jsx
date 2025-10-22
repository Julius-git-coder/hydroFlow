import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext"; // Adjust the import path as needed
import useAuthStore from "../../Store/useAuthStore"; // Adjust the import path as needed

const Slider = () => {
  const [step, setStep] = useState(1);
  const [selections, setSelections] = useState({
    category: "",
    activity: "",
    age: "",
  });
  const [currentIndex, setCurrentIndex] = useState(0);
  const { setBaseGoal } = useAppContext();
  const { user, isAuthenticated } = useAuthStore(); // Get user and auth state
  const navigate = useNavigate();

  // Track if user has ever logged in using localStorage
  const [isOldUser, setIsOldUser] = useState(() => {
    return localStorage.getItem("hasLoggedIn") === "true";
  });

  // Update localStorage when user logs in
  useEffect(() => {
    if (isAuthenticated && user) {
      localStorage.setItem("hasLoggedIn", "true");
      setIsOldUser(true);
    }
  }, [isAuthenticated, user]);

  const categories = [
    {
      label: "Adult Man",
      image: "/Man.png",
      svg: (
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path
            fill="#BAE6FF"
            d="M29.9,-51.6C39.3,-46.4,47.7,-39.4,50.6,-30.5C53.4,-21.6,50.7,-10.8,47.6,-1.7C44.6,7.3,41.3,14.6,40.3,26.7C39.3,38.8,40.5,55.6,34.2,67C27.9,78.5,13.9,84.6,3.1,79.2C-7.7,73.9,-15.5,57,-28.8,49.6C-42.2,42.2,-61.2,44.3,-71.6,37.6C-82,30.9,-83.8,15.4,-79.6,2.4C-75.4,-10.6,-65.2,-21.1,-58.6,-34.4C-52,-47.7,-49,-63.7,-39.8,-69C-30.7,-74.3,-15.3,-68.9,-2.5,-64.5C10.3,-60.2,20.6,-56.8,29.9,-51.6Z"
            transform="translate(100 100)"
          />
        </svg>
      ),
    },
    {
      label: "Adult Woman",
      image: "/Woman.png",
      svg: (
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path
            fill="#BAE6FF"
            d="M22.3,-46.6C28.9,-34.8,34.4,-28.9,38.1,-22.1C41.8,-15.3,43.8,-7.7,48.1,2.5C52.4,12.6,58.9,25.2,59.1,38.7C59.3,52.2,53,66.7,42.1,71.4C31.2,76.2,15.6,71.4,-0.3,71.8C-16.2,72.3,-32.3,78.1,-46.4,75.2C-60.4,72.2,-72.3,60.4,-74.5,46.4C-76.7,32.4,-69.2,16.2,-66.3,1.7C-63.5,-12.9,-65.2,-25.8,-58.1,-31.3C-51,-36.7,-35,-34.8,-23.8,-44C-12.7,-53.2,-6.3,-73.6,0.7,-74.9C7.8,-76.2,15.6,-58.4,22.3,-46.6Z"
            transform="translate(100 100)"
          />
        </svg>
      ),
    },
    {
      label: "Child Boy",
      image: "/Boy.png",
      svg: (
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path
            fill="#BAE6FF"
            d="M27.7,-45.9C41.6,-39.9,62.7,-44.1,75.9,-38.2C89.1,-32.2,94.5,-16.1,93,-0.9C91.6,14.4,83.2,28.8,73.6,41.1C64.1,53.5,53.4,63.8,41,73.2C28.5,82.6,14.3,91.1,-1,92.8C-16.3,94.6,-32.6,89.6,-38,76.2C-43.5,62.7,-38.1,40.8,-41,26.7C-43.9,12.6,-55.1,6.3,-63.6,-4.9C-72.1,-16.1,-77.9,-32.2,-70.8,-39.2C-63.8,-46.2,-44,-44.1,-30.1,-50.1C-16.2,-56.1,-8.1,-70.1,-0.6,-69.1C6.9,-68,13.7,-51.8,27.7,-45.9Z"
            transform="translate(100 100)"
          />
        </svg>
      ),
    },
    {
      label: "Child Girl",
      image: "/Girl.png",
      svg: (
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path
            fill="#BAE6FF"
            d="M40.9,-73.9C50.3,-65.5,53.2,-49,53.4,-35.3C53.5,-21.6,50.9,-10.8,51.5,0.3C52,11.4,55.7,22.9,54.1,34.1C52.5,45.2,45.6,56.2,35.7,58.3C25.8,60.4,12.9,53.8,-0.3,54.2C-13.4,54.7,-26.9,62.2,-36.3,59.8C-45.8,57.5,-51.4,45.2,-56.3,33.6C-61.3,21.9,-65.6,11,-65.3,0.1C-65.1,-10.7,-60.4,-21.5,-53.8,-30.1C-47.1,-38.7,-38.5,-45.2,-29.2,-53.6C-19.9,-62,-9.9,-72.4,2.9,-77.4C15.8,-82.5,31.6,-82.3,40.9,-73.9Z"
            transform="translate(100 100)"
          />
        </svg>
      ),
    },
  ];
  const activitiesByCategory = {
    "Adult Man": [
      {
        label: "Strength Training",
        image: "/ManS.png",
      },
      {
        label: "Cardio",
        image: "/ManC.png",
      },
      {
        label: "Flexibility",
        image: "/ManF.png",
      },
      {
        label: "Normal Day",
        image: "/Normal.png",
      },
    ],
    "Adult Woman": [
      {
        label: "Yoga",
        image: "/WomaY.png",
      },
      {
        label: "Pilates",
        image: "/WomaP.png",
      },
      {
        label: "Aerobic Dance",
        image: "/WomaA.png",
      },
      {
        label: "Normal",
        image: "/WomN.png",
      },
    ],
    "Child Boy": [
      {
        label: "Outdoor Play",
        image: "BoyO.png",
      },
      {
        label: "Sports",
        image: "BoyS.png",
      },
      {
        label: "Light Exercise",
        image: "BoyL.png",
      },
    ],
    "Child Girl": [
      {
        label: "Dance",
        image: "/Girl1.png",
      },
      {
        label: "Gymnastics",
        image: "/Girl2.png",
      },
      {
        label: "Fun Fitness",
        image: "/GirlF.png",
      },
    ],
  };
  const adultAges = [
    {
      label: "19-30",
      image: "/ManA.png",
    },
    {
      label: "31-50",
      image: "/ManA1.png",
    },
    {
      label: "51-Above",
      image: "/ManA2.png",
    },
  ];
  const adultWomanAges = [
    {
      label: "19-30",
      image: "/Woman1.png",
    },
    {
      label: "31-50",
      image: "/WomanA.png",
    },
    {
      label: "51-Above",
      image: "/Woman2.png",
    },
  ];
  const childBoyAges = [
    {
      label: "4-8",
      image: "/BoyA.png",
    },
    {
      label: "9-13",
      image: "/BoyA1.png",
    },
    {
      label: "14-18",
      image: "/Boy3.png",
    },
  ];
  const childGirlAges = [
    {
      label: "4-8",
      image: "/GirlAA.png",
    },
    {
      label: "9-13",
      image: "/GirlA1.png",
    },
    {
      label: "14-18",
      image: "/GirlA2.png",
    },
  ];
  const continueSlide = [
    {
      label: "Continue",
      image:
        "https://via.placeholder.com/800x400/00FFFF/FFFFFF?text=Ready+to+Continue",
    },
  ];
  const ageArrays = {
    "Adult Man": adultAges,
    "Adult Woman": adultWomanAges,
    "Child Boy": childBoyAges,
    "Child Girl": childGirlAges,
  };
  const activities = activitiesByCategory[selections.category] || [];
  const ages = ageArrays[selections.category] || adultAges; // Default to adultAges if category is not selected
  let items = [];
  let title = "";
  let subtitle = "";
  let handleSelect = () => {};
  let isGridView = false;
  const activityLevels = {
    "Adult Man": {
      "Strength Training": "intense",
      Cardio: "moderate",
      Flexibility: "light",
      "Normal Day": "sedentary",
    },
    "Adult Woman": {
      Yoga: "light",
      Pilates: "light",
      "Aerobic Dance": "moderate",
      Normal: "sedentary",
    },
    "Child Boy": {
      "Outdoor Play": "moderate",
      Sports: "intense",
      "Light Exercise": "light",
    },
    "Child Girl": {
      Dance: "moderate",
      Gymnastics: "intense",
      "Fun Fitness": "light",
    },
  };
  const calculateBaseGoal = (category, activity, age) => {
    let base = 0;
    // Base recommendations (in ml, based on standard guidelines from Mayo Clinic, IOM, etc.)
    // Adults: Men 3700ml, Women 2700ml (total fluids, approximated for water)
    // Children: Vary by age/gender
    // Slight adjustment for older adults (51+): -300ml
    if (category === "Adult Man") {
      base = 3700;
      if (age === "51-Above") base -= 300;
    } else if (category === "Adult Woman") {
      base = 2700;
      if (age === "51-Above") base -= 300;
    } else if (category === "Child Boy") {
      if (age === "4-8") base = 1700;
      else if (age === "9-13") base = 2400;
      else base = 3300; // 14-18
    } else if (category === "Child Girl") {
      if (age === "4-8") base = 1700;
      else if (age === "9-13") base = 2100;
      else base = 2300; // 14-18
    }
    // Activity adjustment (add ml based on level)
    const level = activityLevels[category]?.[activity] || "sedentary";
    let adjustment = 0;
    switch (level) {
      case "sedentary":
        adjustment = 0;
        break;
      case "light":
        adjustment = 300;
        break;
      case "moderate":
        adjustment = 700;
        break;
      case "intense":
        adjustment = 1200;
        break;
      default:
        adjustment = 0;
    }
    // For children, scale adjustments down (50% for younger)
    if (category.includes("Child")) {
      adjustment = Math.round(
        adjustment * (category.includes("14-18") ? 0.8 : 0.5)
      );
    }
    return Math.round(base + adjustment);
  };
  // Removed unused goBack to satisfy linter
  const resetToGenderSelection = () => {
    setStep(1);
    setCurrentIndex(0);
    setSelections({ category: "", activity: "", age: "" });
  };
  switch (step) {
    case 1:
      items = categories;
      title = "Please select your gender and type";
      subtitle =
        "It is necessary to calculate an individual rate of water consumption.";
      isGridView = true;
      handleSelect = (label) => {
        setSelections({
          ...selections,
          category: label,
          activity: "",
          age: "",
        });
        setCurrentIndex(0);
        setStep(2);
      };
      break;
    case 2:
      items = activities;
      title = `Please select your activity level for ${selections.category}`;
      subtitle = "Choose the intensity of your workout.";
      handleSelect = () => {
        setSelections({ ...selections, activity: items[currentIndex].label });
        setCurrentIndex(0);
        setStep(3);
      };
      break;
    case 3:
      items = ages;
      title = `Please select your age range for ${selections.category}`;
      subtitle = "This helps in determining your water needs.";
      handleSelect = () => {
        setSelections({ ...selections, age: items[currentIndex].label });
        setCurrentIndex(0);
        setStep(4);
      };
      break;
    case 4:
      items = continueSlide;
      title = "All set!";
      subtitle = "Click continue to proceed with your water tracking.";
      handleSelect = () => {
        if (selections.category && selections.activity && selections.age) {
          const calculatedGoal = calculateBaseGoal(
            selections.category,
            selections.activity,
            selections.age
          );
          setBaseGoal(calculatedGoal.toString());
          console.log(
            "Selections:",
            selections,
            "Calculated Goal:",
            calculatedGoal + "ml"
          );
          // Optionally, close slider, navigate, or show success
          navigate("/signup");
        } else {
          alert("Please complete all selections.");
        }
      };
      break;
    default:
      break;
  }
  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  };
  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
  };
  const goToSlide = (index) => {
    setCurrentIndex(index);
  };
  // Find images for selections
  const categoryItem = categories.find(
    (item) => item.label === selections.category
  );
  const activityItem = activities.find(
    (item) => item.label === selections.activity
  );
  const ageItem = ages.find((item) => item.label === selections.age);
  return (
    <div className="w-full">
      {/* Old User button */}
      <div className="text-center mt-4">
        <button
          onClick={() => navigate("/login")}
          className={`px-6 py-2 rounded-lg transition-all duration-1000 scale-100 focus:outline-none ${
            isOldUser
              ? "bg-blue-400 text-white hover:bg-blue-600"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
          disabled={!isOldUser}
        >
          Old User
        </button>
      </div>
      {/* text display */}
      <div className="max-w-[90rem] mx-auto">
        <h2 className="text-center text-3xl my-5 md:text-4xl text-blue-950">
          {title}
        </h2>
        <h3 className="text-center md:max-w-[20rem] max-w-[18rem] mx-auto">
          {subtitle}
        </h3>
      </div>
      {/* image switching */}
      <div className="relative w-full max-w-4xl mx-auto mt-10">
        {step > 1 && (
          <button
            onClick={resetToGenderSelection}
            className="bg-blue-400 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-all duration-1000 scale-100 focus:outline-none"
          >
            Reset
          </button>
        )}
        {isGridView ? (
          <div className="grid grid-cols-2 gap-x-4 gap-y-8 lg:gap-x-8 lg:gap-y-12 mx-auto max-w-3xl lg:max-w-5xl">
            {items.map((item, index) => (
              <div
                key={index}
                className={`h-72 lg:h-96 flex flex-col justify-center items-center group hover:scale-105 transition-transform duration-300 cursor-pointer relative ${
                  index >= 2 ? "mt-8 lg:mt-12" : ""
                }`}
                onClick={() => handleSelect(item.label)}
              >
                <div className="absolute inset-0 w-full h-full group-hover:rotate-[60deg] transition-transform duration-1000 z-0">
                  {item.svg}
                </div>
                <img
                  src={item.image}
                  alt={item.label}
                  className={`w-full h-full object-contain rounded-lg transition-transform duration-1000 z-10 ${
                    item.label === "Child Girl" ? "scale-75" : ""
                  }`}
                />
                <p className="text-center mt-2 text-xl font-bold z-10">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="overflow-hidden rounded-lg px-4 lg:px-8">
            {step === 4 ? (
              <div className="w-full h-96 lg:h-[32rem] flex flex-col justify-center items-center p-4 lg:p-6">
                <h3 className="text-2xl font-bold text-blue-950 mb-4 sm:mb-6 lg:mb-8">
                  Your Selections
                </h3>
                <div className="flex flex-col items-center space-y-2 sm:space-y-4 lg:space-y-6 w-full">
                  <div className="text-center">
                    <p className="text-base sm:text-lg lg:text-xl">
                      <span className="font-semibold">Category:</span>{" "}
                      {selections.category || "Not selected"}
                    </p>
                    {categoryItem && (
                      <img
                        src={categoryItem.image}
                        alt={selections.category}
                        className="w-full max-h-24 sm:max-h-28 md:max-h-32 lg:max-h-36 object-contain rounded-lg transition-transform duration-1000 mt-1 sm:mt-2"
                      />
                    )}
                  </div>
                  <div className="text-center">
                    <p className="text-base sm:text-lg lg:text-xl">
                      <span className="font-semibold">Activity:</span>{" "}
                      {selections.activity || "Not selected"}
                    </p>
                    {activityItem && (
                      <img
                        src={activityItem.image}
                        alt={selections.activity}
                        className="w-full max-h-24 sm:max-h-28 md:max-h-32 lg:max-h-36 object-contain rounded-lg transition-transform duration-1000 mt-1 sm:mt-2"
                      />
                    )}
                  </div>
                  <div className="text-center">
                    <p className="text-base sm:text-lg lg:text-xl">
                      <span className="font-semibold">Age:</span>{" "}
                      {selections.age || "Not selected"}
                    </p>
                    {ageItem && (
                      <img
                        src={ageItem.image}
                        alt={selections.age}
                        className="w-full max-h-24 sm:max-h-28 md:max-h-32 lg:max-h-36 object-contain rounded-lg transition-transform duration-1000 mt-1 sm:mt-2"
                      />
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div
                className="flex transition-transform duration-1000"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {items.map((item, index) => (
                  <div
                    key={index}
                    className="w-full h-96 lg:h-[32rem] flex-shrink-0 flex flex-col justify-center items-center p-4 lg:p-6"
                  >
                    <img
                      src={item.image}
                      alt={item.label}
                      className="w-full max-h-[calc(100%-2rem)] lg:max-h-[calc(100%-3rem)] object-contain transition-transform duration-1000"
                    />
                    <p className="text-center mt-4 lg:mt-6 text-xl lg:text-2xl font-bold">
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        {items.length > 1 && !isGridView && (
          <>
            <button
              onClick={prevSlide}
              className={`absolute top-1/2 left-4 transform -translate-y-1/2 bg-blue-400 text-white p-2 lg:p-3 rounded-full hover:bg-blue-600 focus:outline-none ${
                currentIndex === 0 ? "hidden" : ""
              }`}
            >
              &#10094;
            </button>
            <button
              onClick={nextSlide}
              className={`absolute top-1/2 right-4 transform -translate-y-1/2 bg-blue-400 text-white p-2 lg:p-3 rounded-full hover:bg-blue-600 focus:outline-none ${
                currentIndex === items.length - 1 ? "hidden" : ""
              }`}
            >
              &#10095;
            </button>
            <div className="flex justify-center mt-4 lg:mt-6 space-x-2">
              {items.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-1 h-1 lg:w-4 lg:h-4 rounded-full ${
                    currentIndex === index ? "bg-blue-400" : "bg-gray-200"
                  } focus:outline-none`}
                ></button>
              ))}
            </div>
          </>
        )}
        {!isGridView && (
          <div className="flex justify-center mt-6 lg:mt-8 space-x-4">
            <button
              onClick={handleSelect}
              className="bg-blue-400 text-white px-6 py-2 rounded-lg hover:bg-blue-600 focus:outline-none"
            >
              {step == 4 ? "Continue" : "Select"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Slider;
