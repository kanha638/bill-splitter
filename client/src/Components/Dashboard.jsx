import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { EventList } from "./EventList";
import { Navbar } from "./Navbar";
import logo from "../Images/Bill.png";
import { Footer } from "./Footer";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <>
      <div className="min-h-full">
        <Navbar />
        {/* <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Dashboard
            </h1>
          </div>
        </header> */}
        <main>
          <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
            {/* Replace with your content */}

            {/* <div className="px-4 py-6 sm:px-0">
              <div className="h-96 rounded-lg border-4 border-dashed border-gray-200" />
            </div> */}
            <EventList />
            {/* /End replace */}
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Dashboard;
