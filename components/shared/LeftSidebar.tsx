'use client';
import {sidebarLinks} from '@/constants/index';
import Link from 'next/link';
import Image from 'next/image';
import {useRouter, usePathname} from 'next/navigation';
import {SignOutButton, SignedIn, useAuth} from '@clerk/nextjs';

const LeftSidebar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const {userId} = useAuth();
  //domain 后面的东西
  return (
    <section className='custom-scrollbar leftsidebar'>
      <div className='flex w-full flex-1 flex-col gap-6 px-6'>
        {sidebarLinks.map((link) => {
          // TODO: 为什么这样xie
          const isActive =
            // 非主页上
            (pathname.includes(link.route) && link.route.length > 1) ||
            // true or false
            pathname === link.route;

          if (link.route === '/profile') link.route = `${link.route}/${userId}`;

          return (
            <Link href={link.route} key={link.label} className={`leftsidebar_link ${isActive && 'bg-primary-500 '}`}>
              <Image src={link.imgURL} alt={link.label} width={24} height={24} />
              <p className='text-light-1 max-lg:hidden'>{link.label}</p>
            </Link>
          );
        })}
      </div>
      <div className='mt-10 px-6'>
        <SignedIn>
          <SignOutButton signOutCallback={() => router.push('/sign-in')}>
            <div className='flex cursor-pointer gap-4 p-4'>
              <Image src='/assets/logout.svg' alt='logout' width={24} height={24} />

              <p className='text-light-2 max-lg:hidden'>Logout</p>
            </div>
          </SignOutButton>
        </SignedIn>
      </div>
    </section>
  );
};

export default LeftSidebar;
