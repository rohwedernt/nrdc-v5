'use client';

import React from 'react';
import { signOut } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { Flex, Logo, NavIcon, SmartLink, ToggleButton, UserMenu } from '@/components/generic';


interface HeaderProps {
    authenticated: boolean;
}

const Header: React.FC<HeaderProps> = ({
    authenticated
}) => {
    const pathname = usePathname() ?? '';

    return (
        <Flex
            as="header"
            fillWidth paddingX="m" height="56"
            alignItems="center"
        >
            <Flex
                hide="s">
                <Logo icon={false} />
            </Flex>
            <Flex
                show="s"
                gap="4"
                alignItems="center">
                <NavIcon />
                <Logo wordmark={false} />
            </Flex>
            {authenticated ? (
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