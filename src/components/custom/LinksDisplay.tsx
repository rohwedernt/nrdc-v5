'use client';

import React, { forwardRef } from 'react';
import { Flex } from '../generic/Flex';
import { Grid, Text, Icon } from '../generic';
import Link from 'next/link';


type LinksDisplayProps = {};

const LinksDisplay = forwardRef<HTMLDivElement, LinksDisplayProps>(({ }, ref) => {
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
    <Grid
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
    </Grid>
  );
});

LinksDisplay.displayName = 'LinksDisplay';

export { LinksDisplay };
