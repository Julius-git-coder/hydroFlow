// import AboutItemsC from "./AboutItemsC";

const AboutItems = () => {
  return (
    <div className="border border-gray-200 h-full p-1 overflow-auto bg-[url('/water.jpeg')] bg-cover bg-center text-wite ">
      {/* <AboutItemsC/> */}
      <section className="text-white body-font ">
        <div className="container px-5 py-24 mx-auto  ">
          <div className="xl:w-1/2 lg:w-3/4 w-full mx-auto text-center">
            <section className="text-gray-600 body-font md:mx-[-30rem]">
              <div className="container px-5 py-24 mx-auto flex flex-wrap">
                {/* <!-- Step 1 --> */}
                <div className="flex text-white relative pt-10 pb-20 sm:items-center md:w-2/3 mx-auto">
                  <div className="h-full w-6 absolute inset-0 flex items-center justify-center">
                    <div className="h-full w-1 bg-blue-200 pointer-events-none"></div>
                  </div>
                  <div className="flex-shrink-0 w-6 h-6 rounded-full mt-10 sm:mt-0 inline-flex items-center justify-center bg-blue-500 text-white relative z-10 title-font font-medium text-sm">
                    1
                  </div>
                  <div className="flex-grow md:pl-8 pl-6 flex sm:items-center items-start flex-col sm:flex-row">
                    <div className="flex-shrink-0 w-15 h-15 ml-18 bg-blue-100 text-blue-500 rounded-full inline-flex items-center justify-center">
                      {/* <!-- Water drop icon --> */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-12"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 2.25c3.75 6 6.75 9.75 6.75 13.5a6.75 6.75 0 11-13.5 0c0-3.75 3-7.5 6.75-13.5z"
                        />
                      </svg>
                    </div>
                    <div className="flex-grow sm:pl-6 mt-6 sm:mt-0 text-white">
                      <h2 className="font-medium title-font text-white mb-1 text-xl">
                        Stay Hydrated
                      </h2>
                      <p className="leading-relaxed ">
                        Your body needs water daily. HydroFlow makes it simple
                        to track your hydration and reminds you to drink at the
                        right time.
                      </p>
                    </div>
                  </div>
                </div>

                {/* <!-- Step 2 --> */}
                <div className="flex relative pb-20 sm:items-center md:w-2/3 mx-auto">
                  <div className="h-full w-6 absolute inset-0 flex items-center justify-center">
                    <div className="h-full w-1 bg-blue-200 pointer-events-none"></div>
                  </div>
                  <div className="flex-shrink-0 w-6 h-6 rounded-full mt-10 sm:mt-0 inline-flex items-center justify-center bg-blue-500 text-white relative z-10 title-font font-medium text-sm">
                    2
                  </div>
                  <div className="flex-grow md:pl-8 pl-6 flex sm:items-center items-start flex-col sm:flex-row">
                    <div className="flex-shrink-0 w-15 h-15 ml-15 bg-blue-100 text-blue-500 rounded-full inline-flex items-center justify-center">
                      {/* <!-- Bottle Icon --> */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-12 h-12"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M9 2h6v6H9V2zM9 8h6l-1 12H10L9 8z" />
                      </svg>
                    </div>
                    <div className="flex-grow sm:pl-6 mt-6 sm:mt-0 text-white">
                      <h2 className="font-medium title-font text-white mb-1 text-xl">
                        Track Your Intake
                      </h2>
                      <p className="leading-relaxed">
                        Log every glass with one tap. See how much water you’ve
                        consumed today and stay consistent with your hydration
                        goals.
                      </p>
                    </div>
                  </div>
                </div>

                {/* <!-- Step 3 --> */}
                <div className="flex relative pb-20 sm:items-center md:w-2/3 mx-auto">
                  <div className="h-full w-6 absolute inset-0 flex items-center justify-center">
                    <div className="h-full w-1 bg-blue-200 pointer-events-none"></div>
                  </div>
                  <div className="flex-shrink-0 w-6 h-6 rounded-full mt-10 sm:mt-0 inline-flex items-center justify-center bg-blue-500 text-white relative z-10 title-font font-medium text-sm">
                    3
                  </div>
                  <div className="flex-grow md:pl-8 pl-6 flex sm:items-center items-start flex-col sm:flex-row">
                    <div className="flex-shrink-0 w-15 ml-17 h-15 bg-blue-100 text-blue-500 rounded-full inline-flex items-center justify-center">
                      {/* <!-- Chart Icon --> */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-12 h-12"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M3 3v18h18M7 13h2v5H7zm4-8h2v13h-2zm4 4h2v9h-2z" />
                      </svg>
                    </div>
                    <div className="flex-grow sm:pl-6 mt-6 sm:mt-0 text-white">
                      <h2 className="font-medium title-font text-white mb-1 text-xl">
                        Reach Your Goals
                      </h2>
                      <p className="leading-relaxed">
                        Set personalized water goals and track progress with
                        charts and reminders that keep you motivated.
                      </p>
                    </div>
                  </div>
                </div>

                {/* <!-- Step 4 --> */}
                <div className="flex relative pb-10 sm:items-center text-white md:w-2/3 mx-auto">
                  <div className="h-full w-6 absolute inset-0 flex items-center justify-center">
                    <div className="h-full w-1 bg-blue-200 pointer-events-none"></div>
                  </div>
                  <div className="flex-shrink-0 w-6 h-6  rounded-full mt-10 sm:mt-0 inline-flex items-center justify-center bg-blue-500 text-white relative z-10 title-font font-medium text-sm">
                    4
                  </div>
                  <div className="flex-grow md:pl-8 pl-6 flex sm:items-center items-start flex-col sm:flex-row">
                    <div className="flex-shrink-0 w-15 ml-16 h-15 bg-blue-100 text-blue-500 rounded-full inline-flex items-center justify-center">
                      {/* <!-- Trophy Icon --> */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-12 h-12"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M8 21h8M12 17v4m-6-12V5h12v4a6 6 0 11-12 0z" />
                      </svg>
                    </div>
                    <div className="flex-grow sm:pl-6 mt-6 sm:mt-0 ">
                      <h2 className="font-medium title-font text-white mb-1 text-xl">
                        Live Healthier
                      </h2>
                      <p className="leading-relaxed">
                        Consistent hydration boosts energy, improves focus, and
                        helps you live your healthiest life.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              className="inline-block w-8 h-8 text-white mb-8"
              viewBox="0 0 975.036 975.036"
            >
              <path d="M925.036 57.197h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.399 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l36 76c11.6 24.399 40.3 35.1 65.1 24.399 66.2-28.6 122.101-64.8 167.7-108.8 55.601-53.7 93.7-114.3 114.3-181.9 20.601-67.6 30.9-159.8 30.9-276.8v-239c0-27.599-22.401-50-50-50zM106.036 913.497c65.4-28.5 121-64.699 166.9-108.6 56.1-53.7 94.4-114.1 115-181.2 20.6-67.1 30.899-159.6 30.899-277.5v-239c0-27.6-22.399-50-50-50h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.4 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l35.9 75.8c11.601 24.399 40.501 35.2 65.301 24.399z"></path>
            </svg>
            <p className="leading-relaxed text-lg">
              I am currently building a responsive Water Tracker App designed to
              help users stay hydrated throughout the day. The app features
              real-time hydration tracking, personalized daily goals, reminders,
              and insightful progress analytics. With a clean and intuitive
              interface, it combines modern design with functionality to promote
              healthier habits and improve overall well-being.
            </p>
            <img
              src="/Mee.jpg"
              alt="Profile"
              className="w-20 h-20 rounded-full mx-auto mt-5 object-cover"
            />

            <span className="inline-block h-1 w-10 rounded bg-indigo-600 mt-8 mb-6"></span>
            <h2 className="text-white font-medium title-font tracking-wider text-sm">
              Dagana Julius
            </h2>
            <p className="text-white">Senior Developer</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutItems;
