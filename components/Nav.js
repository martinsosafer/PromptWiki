"use client"

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { signIn, signOut, useSession, getProviders } from 'next-auth/react'

const Nav = () => {
  const { data: session } = useSession()
 
  const [providers, setProviders] = useState(null)
  const [toggleDropdown, setToggleDropdown] = useState(false)

   useEffect(() => {
    (async () => {
      const res = await getProviders();
      setProviders(res);
    })();
  }, []);

  return (
    <nav className='flex-between w-full mb-16 pt-3'>
      <Link href="/" className='flex gap-2 flex-center'>
        <Image
          src="/assets/images/logo.svg"
          alt="Prompt Logo"
          width={40}
          height={40}
          className='object-contain'
        />
        <p className='logo_text'>PromptWiki</p>
      </Link>

      {/* Desktop Navigation */}
      <div className='sm:flex hidden'>
        {session?.user ? (
          <div className='flex gap-3 md:gap-5'>
            <Link href="/create-prompt" className='black_btn'>
              Crear Prompts
            </Link>
            <button type='button' onClick={signOut} className='outline_btn'>
              Salir
            </button>
            
            <Link href="/profile">
              <Image
                src={session?.user.image}
                width={40}
                height={40}
                className='rounded-full'
                alt='Profile picture'
              />
            </Link>
          </div>
        ) : (
          // Render the sign-in button
          <>
            { providers &&
              Object.values(providers).map((provider) => (
                <button
                  type='button'
                  key={provider.name}
                  onClick={() => {
                    signIn(provider.id);
                  }}
                  className='black_btn'
                >
                  Sign in
                </button>
              ))}
          </>
        )}
      </div>

      {/* Mobile navigation */}
      <div className='sm:hidden flex relative'>
        {session?.user ? (
          <div className='flex'>
            <Image
              src={session?.user.image}
              width={37}
              height={37}
              className='rounded-full'
              alt='Profile'
              onClick={() => setToggleDropdown(!toggleDropdown)}
            />
            {toggleDropdown && (
              <div className='dropdown'>
                <Link
                  href="/profile"
                  className='dropdown_link'
                  onClick={() => setToggleDropdown(false)}
                >
                  Mi Perfil
                </Link>
                <Link
                  href="/create-prompt"
                  className='dropdown_link'
                  onClick={() => setToggleDropdown(false)}
                >
                  Crear Prompt
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setToggleDropdown(false);
                    signOut();
                  }}
                  className='mt-5 w-full black_btn'
                >
                  Salir
                </button>
              </div>
            )}
          </div>
        ) : (
          // Render the sign-in button
       <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type='button'
                  key={provider.name}
                  onClick={() => {
                    signIn(provider.id);
                  }}
                  className='black_btn'
                >
                  Sign in
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  )
}

export default Nav
