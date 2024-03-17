import React, { useState } from "react";
import { Box, Button, Textarea, Radio, RadioGroup, Stack, Heading, Flex, useToast, Text } from "@chakra-ui/react";
import { FaCheck, FaTimes } from "react-icons/fa";

const Index = () => {
  const [jsonInput, setJsonInput] = useState("");
  const [editMode, setEditMode] = useState("both");
  const [hoveredElement, setHoveredElement] = useState(null);
  const toast = useToast();

  const getTokenType = (token) => {
    if (token.startsWith('"') && token.endsWith('"')) {
      return "key";
    } else if (token.startsWith('"') || !isNaN(token) || token === "true" || token === "false" || token === "null") {
      return "value";
    }
    return null;
  };

  const handleInputChange = (e) => {
    setJsonInput(e.target.value);
  };

  const handleEditModeChange = (value) => {
    setEditMode(value);
  };

  const formatJson = () => {
    try {
      const parsed = JSON.parse(jsonInput);
      setJsonInput(JSON.stringify(parsed, null, 2));
      toast({
        title: "JSON formatted successfully",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Invalid JSON",
        description: "Please enter a valid JSON object",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const validateJson = () => {
    try {
      JSON.parse(jsonInput);
      toast({
        title: "Valid JSON",
        status: "success",
        duration: 2000,
        isClosable: true,
        icon: <FaCheck />,
      });
    } catch (error) {
      toast({
        title: "Invalid JSON",
        description: "Please enter a valid JSON object",
        status: "error",
        duration: 2000,
        isClosable: true,
        icon: <FaTimes />,
      });
    }
  };

  const renderText = (text) => {
    return text.split(/(\s+)/).map((token, index) => {
      const tokenType = getTokenType(token);
      const hovered = hoveredElement && ((tokenType === "key" && hoveredElement.type === "key") || (tokenType === "value" && hoveredElement.type === "value") || (hoveredElement.type === tokenType && hoveredElement.value === token.replace(/"/g, "")));

      let color = "inherit";
      if (hovered) {
        color = tokenType === "key" ? "blue.500" : "green.500";
        if (hoveredElement.value === token.replace(/"/g, "")) {
          color = "orange.500";
        }
      }

      return (
        <Text as="span" key={index} color={color} onMouseEnter={() => setHoveredElement({ type: tokenType, value: token.replace(/"/g, "") })} onMouseLeave={() => setHoveredElement(null)}>
          {token}
        </Text>
      );
    });
  };

  return (
    <Box maxWidth="800px" margin="auto" padding={4}>
      <Heading as="h1" size="xl" marginBottom={4}>
        JSON Schema Object Editor
      </Heading>
      <Textarea
        value={jsonInput}
        onChange={handleInputChange}
        placeholder="Enter JSON object"
        height="200px"
        marginBottom={4}
        whiteSpace="pre"
        overflow="auto"
        sx={{
          "& .chakra-text": {
            display: "inline",
          },
        }}
      >
        {renderText(jsonInput)}
      </Textarea>
      <RadioGroup value={editMode} onChange={handleEditModeChange} marginBottom={4}>
        <Stack direction="row">
          <Radio value="both">Edit Keys and Values</Radio>
          <Radio value="keys">Edit Keys Only</Radio>
          <Radio value="values">Edit Values Only</Radio>
        </Stack>
      </RadioGroup>
      <Flex>
        <Button onClick={formatJson} colorScheme="blue" marginRight={2}>
          Format JSON
        </Button>
        <Button onClick={validateJson} colorScheme="green">
          Validate JSON
        </Button>
      </Flex>
    </Box>
  );
};

export default Index;
