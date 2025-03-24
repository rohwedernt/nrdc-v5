import React from 'react';
import { Flex, Logo } from '@/components/generic';
import { Descriptors } from '@/components/custom/Descriptors';
import { Hello } from '@/components/custom/Hello';
import { Modules } from '@/components/custom/modules/Modules';
import styles from './page.module.scss';


export default function Home() {
	return (
		<Flex
			position="relative"
			as="section"
			overflow="hidden"
			fillWidth
			minHeight="0"
			direction="column"
			alignItems="center"
			flex={1}
			paddingBottom="80"
			style={{ maxWidth: "100vw", overflowX: "hidden" }}
		>
			<Flex
				as="main"
				direction="column"
				justifyContent="center"
				fillWidth
				fillHeight
				gap="l"
				style={{ maxWidth: "100%" }}
			>
				<Flex
					className={styles.container}
					fillWidth
					gap="24"
					paddingY='xl'
					style={{ maxWidth: "100%" }}
				>
					<Flex
						position="relative"
						flex={2}
						paddingTop="40"
						className={styles.logo}
						style={{ maxWidth: "100%" }}
					>
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
