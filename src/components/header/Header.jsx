import Link from "next/link";
import {FaBars} from "react-icons/fa"


export default function Header()  {
  return (
    <header className="navbar sticky top-0 z-10 h-20 bg-white justify-end lg:px-8">
      <div className="flex-1">
          <label htmlFor="my-drawer-2" className="drawer-button btn btn-primary bg-secondary text-white  lg:hidden">
            <FaBars className="h-5 inline-block w-5 "/>
            Menu
          </label>
          {/* <h1 className="text-2xl font-semibold ml-2">{pageTitle}</h1> */}
      </div>
      <div className="flex-none">
        <div className="dropdown dropdown-end ml-4">
          <div tabIndex={0} role="button" className="flex gap-4 avatar">
            <span className="text-right lg:block">
              <span className="block text-sm font-medium text-black">
                Andre Taulany
              </span>
              <span className="block text-xs text-black">Admin</span>
            </span>

            
          </div>
          <ul tabIndex={0} className="mt-3 z-[9] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
            <li>
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li><a>Settings</a></li>
            <li><a>Logout</a></li>
          </ul>
        </div>
      </div>
    </header>
  );
};

