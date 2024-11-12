'use client';

import React, { ChangeEventHandler, forwardRef, KeyboardEventHandler, useState } from 'react';
import { useChat } from 'ai/react';
import classNames from 'classnames';
import { Input } from './Input';
import { Flex } from './Flex';
import { Select } from './Select';
import { Text } from './Text';
import { IconButton } from './IconButton';
import styles from './ChatBot.module.scss';
import { Spinner } from './Spinner';


type ChatBotProps = {

};

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
    <Flex direction="column" fillWidth>
      <Flex
        padding="s"
        justifyContent="space-between"
        alignItems='center'
        style={{ borderBottom: "solid #303030" }}
      >
        <Text
          variant="heading-default-m" onBackground="neutral-medium">
          ChatBot
        </Text>
        <Flex maxWidth={9}>
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
        minHeight={20}
        fillHeight>
        {messages.map((message) => (
          <Flex
            paddingX="16"
            paddingY="12"
            background="brand-strong"
            className={message.role === 'user' ? styles.msgsent : styles.msgreceived}>
            <span>{message.content}</span>
          </Flex>
        ))}
        {isLoading && <Spinner size="l" />}
      </Flex>
      <Flex paddingTop="s" paddingX="s">
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
  );
});

ChatBot.displayName = 'ChatBot';

export { ChatBot };