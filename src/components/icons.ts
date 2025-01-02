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
	HiGlobeAmericas,
	HiOutlineSun,
	HiOutlineMoon,
	HiPencil,
	HiClipboardDocumentList
} from "react-icons/hi2";

import { HiCog } from "react-icons/hi";


import {
	FaDiscord,
	FaGithub,
	FaLinkedin,
	FaGoogle,
	FaApple,
	FaClipboardList
} from "react-icons/fa6";

import { GrDocumentDownload } from "react-icons/gr";

import { MdOutlineEmail } from "react-icons/md";

import { BiCodeCurly, BiSend } from "react-icons/bi";

import { IoLaptopOutline, IoReload } from "react-icons/io5";

import { AiOutlineOpenAI, AiFillBug } from "react-icons/ai";

import { GiJumpingRope } from "react-icons/gi";


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
	google: FaGoogle,
	apple: FaApple,
	linkedin: FaLinkedin,
	arrowUpRight: HiArrowUpRight,
	minus: HiMiniMinus,
	plus: HiMiniPlus,
	resume: GrDocumentDownload,
	email: MdOutlineEmail,
	code: BiCodeCurly,
	music: HiOutlineMusicalNote,
	travel: HiGlobeAmericas,
	cog: HiCog,
	sun: HiOutlineSun,
	moon: HiOutlineMoon,
	laptop: IoLaptopOutline,
	send: BiSend,
	openAI: AiOutlineOpenAI,
	pencil: HiPencil,
	load: IoReload,
	log: HiClipboardDocumentList,
	exercise: GiJumpingRope,
	bug: AiFillBug
};