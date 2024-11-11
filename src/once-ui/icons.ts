import { IconType } from 'react-icons';

import {
	HiChevronUp,
	HiChevronDown,
	HiChevronRight,
	HiChevronLeft,
	HiOutlineArrowPath,
	HiCheck,
	HiMiniQuestionMarkCircle,
	HiMiniMinus,
	HiMiniPlus,
	HiMiniUser,
	HiMiniXMark,
	HiEyeDropper,
	HiOutlineLink,
	HiExclamationTriangle,
	HiArrowUpRight,
	HiInformationCircle,
	HiExclamationCircle,
	HiCheckCircle,
	HiOutlineMusicalNote,
	HiGlobeAmericas
} from "react-icons/hi2";

import { HiCog } from "react-icons/hi";


import {
	FaDiscord,
	FaGithub,
	FaLinkedin
} from "react-icons/fa6";

import { GrDocumentDownload } from "react-icons/gr";

import { MdOutlineEmail } from "react-icons/md";

import { BiCodeCurly } from "react-icons/bi";


export const iconLibrary: Record<string, IconType> = {
	chevronUp: HiChevronUp,
  chevronDown: HiChevronDown,
	chevronRight: HiChevronRight,
	chevronLeft: HiChevronLeft,
	refresh: HiOutlineArrowPath,
	check: HiCheck,
	helpCircle: HiMiniQuestionMarkCircle,
	infoCircle: HiInformationCircle,
	warningTriangle: HiExclamationTriangle,
	errorCircle: HiExclamationCircle,
	checkCircle: HiCheckCircle,
	eyeDropper: HiEyeDropper,
	person: HiMiniUser,
	close: HiMiniXMark,
	openLink: HiOutlineLink,
	discord: FaDiscord,
	github: FaGithub,
	linkedin: FaLinkedin,
	arrowUpRight: HiArrowUpRight,
	minus: HiMiniMinus,
	plus: HiMiniPlus,
	resume: GrDocumentDownload,
	email: MdOutlineEmail,
	code: BiCodeCurly,
	music: HiOutlineMusicalNote,
	travel: HiGlobeAmericas,
	cog: HiCog
};