import "@/components/styles/index.scss";
import "@/components/tokens/index.scss";

import classNames from 'classnames';
import { headers } from "next/headers";
import { Metadata } from "next";

import { SessionProvider } from "next-auth/react";

import { auth } from "@/app/auth"

import { baseURL, style, meta, og, schema, social } from "@/components/resources/config"
import { Background, Flex } from '@/components/generic'
import { LoadingProvider } from '@/components/generic/LoadingProvider';

import { Roboto_Mono, Montserrat, Reddit_Mono } from 'next/font/google';
import { getUserSettings } from "@/db/queries/select";
import { Theme } from "@/components/types";
import { AppContextProvider, useAppContext } from "./context/AppContext";
import { DynamicThemeWrapper } from "./context/DynamicThemeWrapper";
import { MaskType } from "@/components/generic/Background";

//import { Inter } from 'next/font/google'
//import { Manrope } from 'next/font/google';

// const primary = Inter({
// 	variable: '--font-primary',
// 	subsets: ['latin'],
// 	display: 'swap',
// })

const primary = Montserrat({
	variable: '--font-primary',
	subsets: ['latin'],
	display: 'swap'
});

const code = Roboto_Mono({
	variable: '--font-code',
	subsets: ['latin'],
	display: 'swap',
});

type FontConfig = {
	variable: string;
};

/*
	Replace with code for secondary and tertiary fonts
	from https://once-ui.com/customize
*/
const secondary = Montserrat({
	variable: '--font-secondary',
	subsets: ['latin'],
	display: 'swap'
});

const tertiary = Reddit_Mono({
	variable: '--font-tertiary',
	subsets: ['latin'],
	weight: '400'
});

export async function generateMetadata(): Promise<Metadata> {
	const host = (await headers()).get("host");
	const metadataBase = host ? new URL(`https://${host}`) : undefined;

	return {
		title: meta.title,
		description: meta.description,
		openGraph: {
			title: og.title,
			description: og.description,
			url: 'https://' + baseURL,
			type: og.type as
				| "website"
				| "article"
				| "book"
				| "profile"
				| "music.song"
				| "music.album"
				| "music.playlist"
				| "music.radio_station"
				| "video.movie"
				| "video.episode"
				| "video.tv_show"
				| "video.other",
		},
		metadataBase,
	};
}

const schemaData = {
	"@context": "https://schema.org",
	"@type": schema.type,
	"url": "https://" + baseURL,
	"logo": schema.logo,
	"name": schema.name,
	"description": schema.description,
	"email": schema.email,
	"sameAs": Object.values(social).filter(Boolean)
};

export type UserSettings = {
	theme: Theme;
	backgroundMask: MaskType;
};

export async function fetchUserSettings(): Promise<UserSettings> {
	const session = await auth();

	const defaultSessionObj: UserSettings = {
		theme: "dark",
		backgroundMask: "topLeft"
	}

	// Check if the user is authenticated
	if (!session?.user?.id) {
		console.error("No user ID found in the session.");
		return defaultSessionObj; // Or handle this case appropriately
	}

	try {
		const settings = await getUserSettings(session.user.id);

		// Ensure the settings include all required fields
		return {
			theme: (settings?.theme || "dark") as Theme,
			backgroundMask: (settings?.backgroundMask || "topLeft") as MaskType
		};
	} catch (error) {
		console.error("Error fetching user settings:", error);
		return defaultSessionObj;
	}
}

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const userSettings = await fetchUserSettings();

	if (userSettings) {
		console.log("User settings:", userSettings);
	} else {
		console.log("No user settings available.");
	}

	return (
		<AppContextProvider initialSettings={userSettings}>
			<Flex
				as="html" lang="en"
				fillHeight background="page"
				data-neutral={style.neutral} data-brand={style.brand} data-accent={style.accent}
				data-border={style.border}
				data-theme={userSettings.theme}
				data-solid={style.solid} data-solid-style={style.solidStyle}
				data-surface={style.surface} data-transition={style.transition}
				data-scaling={style.scaling}
				className={classNames(
					primary.variable, code.variable,
					secondary.variable, tertiary.variable
				)}>
				<head>
					<script
						type="application/ld+json"
						dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
					/>
				</head>
				<Flex
					as="body"
					style={{ scrollbarGutter: "stable" }}
					fillWidth fillHeight margin="0" padding="0">
					<Background
						style={{ zIndex: '-1' }}
						mask={userSettings.backgroundMask}
						gradient={{
							display: true,
							opacity: 1,
						}} />
					<Flex
						flex={1} direction="column">
						<SessionProvider>
							<DynamicThemeWrapper>
								<LoadingProvider>
									{children}
								</LoadingProvider>
							</DynamicThemeWrapper>
						</SessionProvider>
					</Flex>
				</Flex>
			</Flex>
		</AppContextProvider>
	);
}