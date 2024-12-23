'use client';
import { useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { Button } from '../ui/button';
import { IoMdClose } from 'react-icons/io';
import Link from 'next/link';
import { Select, SelectItem, Input, Dropdown, DropdownMenu, DropdownTrigger, DropdownItem, Avatar } from '@nextui-org/react';
import { IoSearchOutline } from 'react-icons/io5';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const path: string = usePathname();
  const [hide, setHide] = useState<boolean>(path === '/sign-up' || path === '/sign-in' || path === '/forgot-password' || path === '/reset-password' || path.startsWith('/creator') ? true : false);

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };
  const closeNavbar = () => {
    setIsOpen(false);
  };

  const city = [
    { key: 'Jakarta', label: 'Jakarta' },
    { key: 'Surabaya', label: 'Surabaya' },
    { key: 'Bandung', label: 'Bandung' },
    { key: 'Yogyakarta', label: 'Yogyakarta' },
  ];

  return (
    <>
      <div className={`${hide ? 'hidden' : 'block'} sticky top-0 z-20 bg-white bg-opacity-70 shadow-sm backdrop-blur-xl backdrop-filter`}>
        <nav className="flex w-full flex-col justify-between py-3 shadow-sm px-10 md:px-32 lg:px-48 lg:py-6">
          {/**Div dibawah adalah pemisah antara content utama dengan phone menu Modelnya flex-col supaya phone menu bisa turun kebawah
           * Div content mewakili konten navbar
           * Div phone menu mewakili menu handphone
           */}

          <div className="content flex items-center justify-between">
            <div className="flex gap-2">
              <div className="hamburger-wrapper flex flex-collg:hidden">
                <div className="hamburger inline-flex lg:hidden">
                  <Button onClick={toggleNavbar} aria-label="Menu" className="py-0 px-1 bg-transparent">
                    {!isOpen ? <GiHamburgerMenu color="black" /> : <IoMdClose color="black" />}
                  </Button>
                </div>
              </div>
              <div className="logo flex cursor-pointer items-center justify-between gap-10">
                <h1 className="logo-text text-xl font-bold">
                  <Link href="/" onClick={closeNavbar}>
                    Event dot com
                  </Link>
                </h1>
                <div className="hidden lg:inline border-none">
                  <Input placeholder="Search event here.." startContent={<IoSearchOutline />} type="text" className="border-none" />
                </div>
                <div className="hidden lg:inline">
                  <Select className="w-full h-full z-10" items={city} aria-label="City">
                    {(city) => (
                      <SelectItem key={city.key} className="w-full">
                        {city.label}
                      </SelectItem>
                    )}
                  </Select>
                </div>
              </div>
            </div>
            <div className="menu hidden md:gap-3 lg:flex">
              <ul className="flex gap-10">
                <li className="cursor-pointer hover:font-semibold">
                  <Link href="/#service">Service</Link>
                </li>
                <li className="cursor-pointer hover:font-semibold">
                  <Link href="/#pricing">Pricing</Link>
                </li>
                <li className="cursor-pointer hover:font-semibold">
                  <Link href="/page/resource/">Resource</Link>
                </li>
                <li className="cursor-pointer hover:font-semibold">
                  <Link href="/page/about-us/">About</Link>
                </li>
                <li className="cursor-pointer hover:font-semibold">
                  <Link href="/page/team/">Team</Link>
                </li>
                <li className="cursor-pointer hover:font-semibold">
                  <Link href="/#contact">Contact</Link>
                </li>
              </ul>
            </div>
            <div className="hidden lg:inline">
              <Dropdown placement="bottom-end">
                <DropdownTrigger>
                  <Avatar isBordered as="button" className="transition-transform" color="secondary" name="Jason Hughes" size="sm" src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
                </DropdownTrigger>
                <DropdownMenu aria-label="Profile Actions" variant="flat" className="bg-white rounded-lg">
                  <DropdownItem key="profile" className="h-14 gap-2">
                    <p className="font-semibold">Signed in as</p>
                    <p className="font-semibold">zoey@example.com</p>
                  </DropdownItem>
                  <DropdownItem key="settings">My Settings</DropdownItem>
                  <DropdownItem key="team_settings">Team Settings</DropdownItem>
                  <DropdownItem key="analytics">Analytics</DropdownItem>
                  <DropdownItem key="system">System</DropdownItem>
                  <DropdownItem key="configurations">Configurations</DropdownItem>
                  <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
                  <DropdownItem key="logout" color="danger">
                    Log Out
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
            <div className="cta hidden">
              <Link href={`https://cal.com/satrio-langlang-vlenyy/introductorycall`}>
                <Button>Login</Button>
              </Link>
              <Link href={`https://cal.com/satrio-langlang-vlenyy/introductorycall`}>
                <Button>Sign Up</Button>
              </Link>
            </div>
          </div>
          {/**Div dibawah adalah menu untuk handphone */}
          <div className={`phone-menu transition-all duration-300 ease-in-out ese ${isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
            {isOpen && (
              <div className="menuphone my-3 flex flex-col py-2 lg:hidden h-screen">
                <div className="flex gap-4 items-center py-2">
                  <Avatar isBordered as="button" className="transition-transform h-10 w-10" color="secondary" name="Jason Hughes" size="sm" src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
                  <div className="flex flex-col">
                    <h1 className="text-sm font-bold">Hello user.name!</h1>
                    <h1 className="text-xs">user@email.com</h1>
                  </div>
                </div>

                <li className="my-2 list-none">
                  <Link href="/#service" onClick={closeNavbar} className="font-semibold">
                    Dashboard
                  </Link>
                </li>
                <li className="my-2 list-none">
                  <Link href="/page/about-us/" onClick={closeNavbar} className="font-semibold">
                    Explore
                  </Link>
                </li>
                <li className="my-2 list-none">
                  <Link href="/#pricing-phone" onClick={closeNavbar} className="font-semibold">
                    Setting
                  </Link>
                </li>
                <li className="my-2 list-none">
                  <Link href="/page/resource/" onClick={closeNavbar} className="font-semibold">
                    Log Out
                  </Link>
                </li>
              </div>
            )}
          </div>
        </nav>
      </div>
    </>
  );
}
