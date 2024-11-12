'use client';

import React, { ChangeEventHandler, forwardRef, KeyboardEventHandler, useState } from 'react';
import classNames from 'classnames';
import { Input } from './Input';
import { Flex } from './Flex';
import { Select } from './Select';
import { Text } from './Text';
import { IconButton } from './IconButton';
import styles from './ChatBot.module.scss';


type ChatBotProps = {

};

const selectOptions = [
  {
    description: 'Small model for fast, lightweight tasks',
    label: 'GPT 4o mini',
    value: 'GPT 4o mini'
  },
  {
    description: 'For complex, multi-step tasks',
    label: 'GPT 4o',
    value: 'GPT 4o'
  }
]

const ChatBot = forwardRef<HTMLDivElement, ChatBotProps>(({

}, ref) => {
  const [messages, setMessages] = useState<string[]>([]);
  const [selectValue, setSelectValue] = useState(selectOptions[0].value);
  const [inputValue, setInputValue] = useState<string>("");

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        if (inputValue.trim()) {
          handleAddMessage(inputValue.trim());
            setInputValue('');
        }
    }
};

  const handleAddMessage = (newMsg: string) => {
    setMessages(prevItems => [...prevItems, newMsg]);
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
        {messages.map((msg) => (
          <Flex
            paddingX="16"
            paddingY="12"
            background="brand-strong"
            className={styles.msgsent}>
            <span>{msg}</span>
          </Flex>
        ))}
      </Flex>
      <Flex paddingTop="s" paddingX="s">
        <Input
          id="chatbotinput"
          label="Send a message..."
          value={inputValue}
          onKeyDown={handleKeyDown}
          hasSuffix={
            <IconButton
              onClick={() => handleAddMessage(inputValue)}
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