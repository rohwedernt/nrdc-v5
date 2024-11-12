"use client";

import React from 'react';
import { Flex, Logo } from '@/components/generic';
import { Descriptors } from '@/components/custom/Descriptors';
import { HelloButton } from '@/components/custom/HelloButton';
import { Toolbar } from '@/components/custom/Toolbar';
import { Modules } from '@/components/custom/Modules';


export default function Home() {
	return (
		<Flex
			fillWidth paddingX="l"
			direction="column" alignItems="center" flex={1}>
			<Toolbar />
			<Flex
				position="relative"
				as="section" overflow="hidden"
				fillWidth minHeight="0" maxWidth={68}
				direction="column" alignItems="center" flex={1}>
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
					<HelloButton />
					<Modules />
				</Flex>
			</Flex>
		</Flex>
	);
}
