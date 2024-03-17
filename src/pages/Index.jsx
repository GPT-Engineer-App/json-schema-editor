import React, { useState } from "react";
import { Box, Button, Textarea, Radio, RadioGroup, Stack, Heading, Flex, useToast } from "@chakra-ui/react";
import { FaCheck, FaTimes } from "react-icons/fa";

const Index = () => {
  const [jsonInput, setJsonInput] = useState("");
  const [editMode, setEditMode] = useState("both");
  const toast = useToast();

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

  return (
    <Box maxWidth="800px" margin="auto" padding={4}>
      <Heading as="h1" size="xl" marginBottom={4}>
        JSON Schema Object Editor
      </Heading>
      <Textarea value={jsonInput} onChange={handleInputChange} placeholder="Enter JSON object" height="200px" marginBottom={4} />
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
