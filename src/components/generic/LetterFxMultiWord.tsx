'use client';

import React, { useState, useRef, useEffect, forwardRef } from 'react';
import classNames from 'classnames';

const defaultAllowedCharacters = ['X', '$', '@', 'a', 'H', 'z', 'o', '0', 'y', '#', '?', '*', '0', '1', '+'];

function getRandomCharacter(charset: string[]): string {
	const randomIndex = Math.floor(Math.random() * charset.length);
	return charset[randomIndex];
}

function createEventHandler(
	originalText: string,
	setText: React.Dispatch<React.SetStateAction<string>>,
	inProgress: boolean,
	setInProgress: React.Dispatch<React.SetStateAction<boolean>>,
	speed: 'fast' | 'medium' | 'slow',
	charset: string[],
	setHasAnimated?: React.Dispatch<React.SetStateAction<boolean>>
) {
	const speedSettings = {
		fast: { BASE_DELAY: 10, REVEAL_DELAY: 10, INITIAL_RANDOM_DURATION: 100 },
		medium: { BASE_DELAY: 30, REVEAL_DELAY: 60, INITIAL_RANDOM_DURATION: 300 },
		slow: { BASE_DELAY: 60, REVEAL_DELAY: 90, INITIAL_RANDOM_DURATION: 600 }
	};

	const { BASE_DELAY, REVEAL_DELAY, INITIAL_RANDOM_DURATION } = speedSettings[speed];

	const generateRandomText = () =>
		originalText
			.split('')
			.map((char) => (char === ' ' ? ' ' : getRandomCharacter(charset)))
			.join('');

	return async () => {
		if (inProgress) return;

		setInProgress(true);

		let randomizedText = generateRandomText();
		const endTime = Date.now() + INITIAL_RANDOM_DURATION;

		while (Date.now() < endTime) {
			setText(randomizedText);
			await new Promise((resolve) => setTimeout(resolve, BASE_DELAY));
			randomizedText = generateRandomText();
		}

		for (let i = 0; i < originalText.length; i++) {
			await new Promise((resolve) => setTimeout(resolve, REVEAL_DELAY));
			setText(
				`${originalText.substring(0, i + 1)}${randomizedText.substring(i + 1)}`
			);
		}

		setInProgress(false);
		if (setHasAnimated) {
			setHasAnimated(true);
		}
	};
}

type LetterFxMultiWordProps = {
	wordSet: string[];
	speed?: 'fast' | 'medium' | 'slow';
	charset?: string[];
	className?: string;
	style?: React.CSSProperties;
};

const LetterFxMultiWord = forwardRef<HTMLSpanElement, LetterFxMultiWordProps>(({
	wordSet,
	speed = 'slow',
	charset = defaultAllowedCharacters,
	className,
	style,
}, ref) => {
	const [currentIndex, setCurrentIndex] = useState<number>(0);
	const [text, setText] = useState<string>(wordSet[0]);
	const [inProgress, setInProgress] = useState<boolean>(false);
	const originalText = useRef<string>(wordSet[0]);

	useEffect(() => {
		// Update the current word to scramble
		originalText.current = wordSet[currentIndex];
		setText(wordSet[currentIndex]); // Set initial text

		// Define event handler inline to ensure it uses the latest originalText
		const eventHandler = createEventHandler(
			originalText.current,
			setText,
			inProgress,
			setInProgress,
			speed,
			charset
		);

		// Trigger the scrambling animation
		eventHandler();

		// Set a timeout to change to the next word only after the animation completes
		const changeWordTimeout = setTimeout(() => {
			setCurrentIndex((prevIndex) => (prevIndex + 1) % wordSet.length);
		}, 5000 + (speed === 'fast' ? 100 : speed === 'medium' ? 300 : 600));

		// Cleanup timeout
		return () => clearTimeout(changeWordTimeout);
	}, [currentIndex, wordSet, speed, charset]);

	return (
		<span
			ref={ref}
			className={classNames(className)}
			style={style}
		>
			{text}
		</span>
	);
});

LetterFxMultiWord.displayName = 'LetterFxMultiWord';

export { LetterFxMultiWord };
