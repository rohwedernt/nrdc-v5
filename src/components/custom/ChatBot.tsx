'use client';

import React, { forwardRef, KeyboardEventHandler, useState } from 'react';
import { useChat } from 'ai/react';
import { Input } from '../generic/Input';
import { Flex } from '../generic/Flex';
import { Select } from '../generic/Select';
import { Text } from '../generic/Text';
import { IconButton } from '../generic/IconButton';
import { Spinner } from '../generic/Spinner';
import { Icon } from '../generic/Icon';
import styles from './ChatBot.module.scss';


type ChatBotProps = {};

const selectOptions = [
  {
    description: 'Small model for fast, lightweight tasks',
    label: 'GPT-4o mini',
    value: 'GPT-4o mini'
  },
  {
    description: 'For complex, multi-step tasks',
    label: 'GPT-4o',
    value: 'GPT-4o'
  }
]

const ChatBot = forwardRef<HTMLDivElement, ChatBotProps>(({ }, ref) => {
  const [selectValue, setSelectValue] = useState(selectOptions[0].value);
  const { messages, input, handleSubmit, handleInputChange, isLoading } =
    useChat();

  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (input.trim()) {
        handleSubmit();
      }
    }
  };

  return (
    <Flex
      radius="l"
      borderStyle="solid-1"
      border="neutral-weak"
      direction="column"
      fillWidth
      fillHeight
      className={styles.wrapper}
      // style={{ boxShadow: "inset 0 0 2000px rgba(255, 255, 255, .5);",
      //   filter: "blur(15px);" }}
    >
      <Flex direction="column" fillWidth className={styles.container}>
        <Flex
          padding="s"
          justifyContent="space-between"
          alignItems='center'
          style={{ borderBottom: "solid #303030" }}
        >
          <Flex gap="s">
            <Icon name="openAI" size="l" style={{ paddingBottom: "2px" }} />
            <Text
              variant="heading-default-m"
              onBackground="neutral-medium"
              style={{ lineHeight: "30px" }}
            >
              ChatBot
            </Text>
          </Flex>
          <Flex maxWidth={11}>
            <Select
              id="gptselect"
              height="s"
              options={selectOptions}
              value={selectValue}
              onSelect={(option) => setSelectValue(option.value)}
            />
          </Flex>
        </Flex>
        <Flex
          paddingTop="s"
          paddingX="s"
          gap="xs"
          direction="column"
          justifyContent="flex-end"
          minHeight={26}
          fillHeight>
          {messages.map((message) => (
            <Flex
              paddingX="16"
              paddingY="12"
              className={message.role === 'user' ? styles.msgsent : styles.msgreceived}>
              <span>{message.content}</span>
            </Flex>
          ))}
          {isLoading && <Spinner size="l" />}
        </Flex>
        <Flex paddingTop="s" paddingX="s" paddingBottom="8">
          <Input
            id="chatbotinput"
            label="Send a message..."
            value={input}
            onKeyDown={handleKeyDown}
            hasSuffix={
              <IconButton
                onClick={handleSubmit}
                size="s"
                icon="send"
                variant="ghost"
              />
            }
            onChange={handleInputChange}
          />
        </Flex>
      </Flex>
    </Flex>
  );
});

ChatBot.displayName = 'ChatBot';

export { ChatBot };