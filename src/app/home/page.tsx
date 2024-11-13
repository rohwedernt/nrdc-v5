"use client";

import React from 'react';
import { Flex, Logo } from '@/components/generic';
import { Descriptors } from '@/components/custom/Descriptors';
import { Hello } from '@/components/custom/Hello';
import { Modules } from '@/components/custom/Modules';


export default function Home() {
	return (
			<Flex
				position="relative"
				as="section" overflow="hidden"
				fillWidth minHeight="0" maxWidth={68}
				direction="column" alignItems="center" flex={1}
				paddingBottom="80">
				<Flex
					as="main"
					direction="column" justifyContent="center"
					fillWidth fillHeight gap="l">
					<Flex
						mobileDirection="column"
						fillWidth gap="24" paddingY='xl'>
						<Flex
							position="relative"
							flex={2} paddingTop="40" paddingX="xxl">
							<Logo size="xxl" icon={false} style={{ zIndex: '1' }} />
						</Flex>
						<Descriptors />
					</Flex>
					<Hello />
					<Modules />
				</Flex>
			</Flex>
	);
}
