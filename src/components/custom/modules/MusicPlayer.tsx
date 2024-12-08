'use client';

import React, { useState, forwardRef } from 'react';
import { Spotify } from 'react-spotify-embed';
import { DropdownOptions, Flex, Select } from '../../generic';
import styles from './MusicPlayer.module.scss';


type MusicPlayerProps = {};

const selectOptions: DropdownOptions[] = [
  {
    label: 'Jazz-Funk',
    value: 'Jazz-Funk',
    link: 'https://open.spotify.com/playlist/37i9dQZF1DWUb0uBnlJuTi?si=108a04994ed54cff'
  },
  {
    label: 'The New Retro',
    value: 'The New Retro',
    link: 'https://open.spotify.com/playlist/37i9dQZF1DWV5vqkTng2MA?si=75f495541ef04de4'
  },
  {
    label: `Feelin' Good`,
    value: `Feelin' Good`,
    link: 'https://open.spotify.com/playlist/37i9dQZF1DX9XIFQuFvzM4?si=9146f2638dd64d98'
  },
  {
    label: `Kitchen Swagger`,
    value: `Kitchen Swagger`,
    link: 'https://open.spotify.com/playlist/37i9dQZF1DX2FsCLsHeMrM?si=58f2d097090d4485'
  },
  {
    label: 'State of Jazz',
    value: 'State of Jazz',
    link: 'https://open.spotify.com/playlist/37i9dQZF1DX7YCknf2jT6s?si=0ff90f2fb5c449e3'
  }
]

const MusicPlayer = forwardRef<HTMLDivElement, MusicPlayerProps>(({ }, ref) => {
  const [selection, setSelection] = useState<DropdownOptions>(selectOptions[0]);

  return (
    <Flex
      position="relative"
      radius="l"
      direction="column"
      fillWidth
      fillHeight
      background="neutral-weak"
      borderStyle="solid-1"
      border="neutral-weak"
    >
      <Flex className={styles.select}>
      <Select
        id="spotifyselect"
        height="s"
        style={{ maxWidth:"170px", color:"var(--static-white)" }}
        options={selectOptions}
        value={selection.value}
        onSelect={(option) => setSelection(option)}
      />
      </Flex>
      <Spotify style={{ width: "100%" }} link={selection.link ?? ""} />
    </Flex>
  );
});

MusicPlayer.displayName = 'MusicPlayer';

export { MusicPlayer };

{/* <iframe style="border-radius:12px" src="https://open.spotify.com/embed/playlist/37i9dQZF1DWUb0uBnlJuTi?utm_source=generator" width="100%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe> */}