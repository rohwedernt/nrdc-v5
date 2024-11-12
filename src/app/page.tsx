"use client";

import React, { useState } from 'react';

import { Heading, Text, Flex, Button, Grid, Icon, Logo, Arrow, Dialog, IconButton, SegmentedControl, SmartImage, Avatar } from '@/once-ui/components';
import Link from 'next/link';
import { LetterFxMultiWord } from '@/once-ui/components/LetterFxMultiWord';
import ProfileSVG from '../../public/images/profile.svg';
import Image from 'next/image';
import { ChatBot } from '@/once-ui/components/ChatBot';
import { social } from "@/once-ui/resources/config"



export default function Home() {
	const [isHelloDialogOpen, setIsHelloDialogOpen] = useState(false);

	interface linkType {
		href: string;
		title: string;
		description: string;
	}

	const links: linkType[] = [
		{
			href: "https://once-ui.com/docs/theming",
			title: "Dev Goodies",
			description: "Engineering resources covering a range of topics",
		},
		{
			href: "https://once-ui.com/docs/flexComponent",
			title: "Music",
			description: "Playlist of worthwhile listens",
		},
		{
			href: "https://once-ui.com/docs/typography",
			title: "Travel",
			description: "Blog of trips from over the years",
		},
		{
			href: "https://once-ui.com/docs/typography",
			title: "Chat Bot",
			description: "A full-featured, hacked Next.js AI chatbot",
		},
		{
			href: "https://once-ui.com/docs/typography",
			title: "Rohco",
			description: "My ongoing music projects",
		},
		{
			href: "https://once-ui.com/docs/typography",
			title: "Projects",
			description: "Other projects of all sorts",
		},
	];

	const getLinkIcon = (link: linkType) => {
		switch (true) {
			case (link.title == "Dev Goodies"):
				return <Icon size="s" name="code" />;
			case (link.title == "Music"):
				return <Icon size="s" name="music" />;
			case (link.title == "Travel"):
				return <Icon size="s" name="travel" />;
			default:
				return <Icon size="s" name="arrowUpRight" />;
		}
	};

	return (
		<Flex
			fillWidth paddingX="l"
			direction="column" alignItems="center" flex={1}>
			<Flex
				as="header"
				position="relative"
				fillWidth paddingTop="s"
				justifyContent="space-between">
				<Flex gap="l">
					<IconButton
						onClick={() => { }}
						icon="linkedin"
						size="l"
						tooltip="LinkedIn"
						tooltipPosition="bottom"
						variant="ghost"
						href={social.linkedin}
					/>
					<IconButton
						onClick={() => { }}
						icon="github"
						size="l"
						tooltip="GitHub"
						tooltipPosition="bottom"
						variant="ghost"
						href={social.github}
					/>
					<IconButton
						onClick={() => { }}
						icon="email"
						size="l"
						tooltip="Email Me"
						tooltipPosition="bottom"
						variant="ghost"
						href={social.email}
					/>
				</Flex>
				<Flex gap="l">
					<SegmentedControl
						buttons={[
							{
								label: '',
								prefixIcon: 'sun',
								suffixIcon: '',
								value: 'Light'
							},
							{
								label: '',
								prefixIcon: 'moon',
								suffixIcon: '',
								value: 'Dark'
							},
							{
								label: '',
								prefixIcon: 'laptop',
								suffixIcon: '',
								value: 'System'
							}
						]}
						onToggle={() => { }}
						defaultSelected="Dark"
					/>
					<IconButton
						onClick={() => { }}
						icon="cog"
						size="xl"
						tooltip="Settings"
						tooltipPosition="bottom"
						variant="ghost"
					/>
				</Flex>
			</Flex>
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
						<Flex
							position="relative"
							flex={4}
							direction="column">
							<Heading
								wrap="balance"
								variant="display-strong-xs" paddingBottom='24'>
								<span className="font-code" style={{ display: "block", opacity: 0.9 }}>
									<LetterFxMultiWord
										speed="slow" wordSet={["Eng Leader", "Collaborator", "Engineer"]}>
									</LetterFxMultiWord>
								</span>
								<span className="font-code" style={{ display: "block", opacity: 0.9 }}>
									<LetterFxMultiWord
										speed="medium" wordSet={["Hobbyist", "Musician", "Creator"]}>
									</LetterFxMultiWord>
								</span>
								<span className="font-code" style={{ display: "block", opacity: 0.9 }}>
									<LetterFxMultiWord
										speed="fast" wordSet={["Mentor", "Learner", "Mentee"]}>
									</LetterFxMultiWord>
								</span>
							</Heading>
						</Flex>
					</Flex>
					<Flex fillWidth justifyContent='center' paddingBottom='l'>
						<Button
							id="helloBtn"
							variant="accent"
							size="l"
							onClick={() => setIsHelloDialogOpen(true)}
						>
							<Flex alignItems="center">
								Hello 👋
								<Arrow trigger="#helloBtn" />
							</Flex>
						</Button>
					</Flex>

					{/* Card Dialog */}
					<Dialog
						onClose={() => setIsHelloDialogOpen(false)}
						isOpen={isHelloDialogOpen}
						title="Nate Rohweder"
						data-border="conservative"
					>
						<Grid
							columns="repeat(1, 1fr)"
							tabletColumns="1col"
							mobileColumns="1col"
							fillWidth
							gap="s">
							<Flex gap="s" direction="row" alignItems="center" fillWidth>
								<Flex direction="column" justifyContent='center' fillWidth>
									<Heading
										as="h3"
										variant="heading-default-l"
										paddingBottom='12'
									>
										Engineering Manager
									</Heading>
									<Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Text>
								</Flex>
								<Avatar size="xl" src="/images/profile.jpg" />
							</Flex>
							<Flex direction="row" justifyContent="space-evenly" paddingTop='32' fillWidth>
								<IconButton
									onClick={() => { }}
									icon="linkedin"
									size="l"
									tooltip="LinkedIn"
									tooltipPosition="top"
									variant="ghost"
								/>
								<IconButton
									onClick={() => { }}
									icon="github"
									size="l"
									tooltip="GitHub"
									tooltipPosition="top"
									variant="ghost"
								/>
								<IconButton
									onClick={() => { }}
									icon="resume"
									size="l"
									tooltip="Resume"
									tooltipPosition="top"
									variant="ghost"
								/>
							</Flex>
						</Grid>
					</Dialog>




					<Grid
						columns="repeat(1, 1fr)"
						tabletColumns="1col"
						mobileColumns="1col"
						fillWidth
						gap="s"
						paddingBottom="24">
						<Flex gap="s" direction="row" fillWidth>
							<Flex gap="s" direction="column" alignItems="stretch" fillWidth>
								<Flex
									radius="l"
									padding="m"
									direction="column"
									fillWidth
									fillHeight
									background="neutral-weak"
									borderStyle="solid-1"
									border="neutral-weak"
								>
									1
								</Flex>
								<Flex
									radius="l"
									shadow="l"
									padding="m"
									direction="column"
									fillWidth
									fillHeight
									style={{ background: "linear-gradient(45deg, var(--brand-background-strong), var(--accent-background-strong))" }}
								>
									2
								</Flex>
							</Flex>
							<Flex
								radius="l"
								borderStyle="solid-1"
								border="neutral-weak"
								direction="column"
								fillWidth
								fillHeight
								background="neutral-weak"
							>
								<ChatBot />
							</Flex>
						</Flex>
						<Flex
							radius="l"
							shadow="s"
							padding="m"
							direction="column"
							fillWidth
							background="info-medium"
						>
							4
						</Flex>
					</Grid>






					{/* <Grid
						radius="l"
						border="neutral-medium"
						borderStyle="solid-1"
						columns="repeat(3, 1fr)"
						tabletColumns="1col"
						mobileColumns="1col"
						fillWidth
						gap="0">
						{links.map((link) => (
							<Link
								target="_blank"
								style={{ padding: 'var(--responsive-space-l)' }}
								key={link.href}
								href={link.href}
								className="hoverLink">
								<Flex
									fillWidth paddingY="4" gap="4"
									direction="column">
									<Flex
										fillWidth gap="12"
										alignItems="center" justifyContent='center'>
										{getLinkIcon(link)}
										<Text
											variant="heading-strong-s" onBackground="neutral-medium" >
											{link.title}
										</Text>
									</Flex>
									<Text
										variant="body-default-s" onBackground="neutral-weak">
										{link.description}
									</Text>
								</Flex>
							</Link>
						))}
					</Grid> */}
				</Flex>


			</Flex>
			{/* <Flex
				as="footer"
				position="relative"
				fillWidth paddingY="l"
				justifyContent="end">
				<Flex>

				</Flex>
			</Flex> */}

		</Flex>
	);
}
