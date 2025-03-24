'use client';

import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { Flex, Logo, NavIcon, SmartLink, ToggleButton, Dropdown } from '@/components/generic';


interface HeaderProps {}

const Header: React.FC<HeaderProps> = ({}) => {
    const session = useSession();
    const pathname = usePathname() ?? '';
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleMobileMenuToggle = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const handleOptionSelect = (option: any) => {
        setIsMobileMenuOpen(false);
        // The navigation will be handled by the href in the option
    };

    const mobileNavOptions = [
        {
            label: 'Home',
            value: 'home',
            link: '/home'
        },
        {
            label: 'Travel',
            value: 'travel',
            link: '/travel'
        },
        {
            label: 'Health',
            value: 'health',
            link: '/health'
        }
    ];

    return (
        <Flex
            as="header"
            fillWidth paddingX="m" height="56"
            alignItems="center"
        >
            <Flex
                hide="s">
                <Logo icon={false} href={'/home'} />
            </Flex>
            <Flex
                show="s"
                gap="4"
                alignItems="center"
                position="relative">
                <NavIcon onClick={handleMobileMenuToggle} />
                {isMobileMenuOpen && (
                    <Flex
                        style={{
                            position: 'absolute',
                            top: '100%',
                            left: 0,
                            zIndex: 100
                        }}>
                        <Dropdown
                            options={mobileNavOptions}
                            onOptionSelect={handleOptionSelect}
                        />
                    </Flex>
                )}
            </Flex>
            {session.status === "authenticated" ? (
                <Flex
                    fillWidth
                    alignItems="center" justifyContent="space-between">
                    <Flex
                        fillWidth>
                        <Flex
                            hide="s"
                            fillWidth gap="4" paddingX="l"
                            alignItems="center">
                            <ToggleButton
                                selected={pathname === '/home'}
                                href="/home"
                                label="Home"
                            />
                            <ToggleButton
                                selected={pathname === '/travel'}
                                href="/travel"
                                label="Travel"
                            />
                            <ToggleButton
                                selected={pathname === '/health'}
                                href="/health"
                                label="Health"
                            />
                        </Flex>
                    </Flex>
                    {/* <Flex as="nav">
                        <Flex
                            hide="s">
                            <UserMenu
                                name={name}
                                subline={subline}
                                avatarProps={{
                                    empty: !avatar,
                                    src: avatar
                                }}
                                loading={isLoading}
                                dropdownOptions={[
                                    {
                                        label: 'Profile',
                                        value: 'profile'
                                    },
                                    {
                                        dividerAfter: true,
                                        label: 'Settings',
                                        value: 'settings'
                                    },
                                    {
                                        label: 'Log out',
                                        value: 'logout'
                                    }
                                ]}
                                dropdownProps={{ onOptionSelect: () => signOut({ callbackUrl: "/home" }) }}
                            />
                        </Flex>
                        <Flex
                            show="s">
                            <UserMenu
                                avatarProps={{
                                    empty: !avatar,
                                    src: avatar
                                }}
                                dropdownOptions={[
                                    {
                                        label: 'Profile',
                                        value: 'profile'
                                    },
                                    {
                                        label: 'Settings',
                                        value: 'settings'
                                    },
                                    {
                                        label: 'Log out',
                                        value: 'logout'
                                    }
                                ]}
                            />
                        </Flex>
                    </Flex> */}
                </Flex>
            ) : (
                <>
                    <Flex
                        fillWidth
                        alignItems="center" justifyContent="flex-end">
                        <Flex
                            hide="s"
                            textVariant="label-default-s"
                            fillWidth gap="4" paddingX="l"
                            alignItems="center">
                            <SmartLink
                                href="/home">
                                Home
                            </SmartLink>
                            <SmartLink
                                href="travel">
                                Travel
                            </SmartLink>
                        </Flex>
                    </Flex>

                </>
            )}
        </Flex>
    );
};

Header.displayName = 'Header';
export { Header };